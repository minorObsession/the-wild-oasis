import toast from "react-hot-toast";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    // ! same thing as
    // mutationFn: (bookingID) => deleteBookingAPI(bookingID),
    // queryKey: ["bookings"],

    mutationFn: (id) => deleteBookingAPI(id),
    onSuccess: () => {
      toast.success("Booking was successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    deleteBooking,
    isDeleting,
  };
}
