import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingID) =>
      updateBooking(bookingID, {
        status: "checked-out",
      }),
    // ! the data in success fn is whatever is returned from the mutation fn
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out!`);
      // ! invalidate all the currently active queries
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("There was an error during check-out"),
  });

  return { checkout, isCheckingOut };
}
