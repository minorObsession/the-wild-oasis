import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingID, breakfast }) =>
      updateBooking(bookingID, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    // ! the data in success fn is whatever is returned from the mutation fn
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in!`);
      // ! invalidate all the currently active queries
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("There was an error during check-in"),
  });

  return { checkin, isCheckingIn };
}
