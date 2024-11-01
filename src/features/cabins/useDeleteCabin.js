import toast from "react-hot-toast";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    // ! same thing
    // mutationFn: (id) => deleteCabin(id),
    mutationFn: deleteCabinAPI,
    onSuccess: () => {
      toast.success("cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
