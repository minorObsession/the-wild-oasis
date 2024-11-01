import toast from "react-hot-toast";
import { createOrEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createOrEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: "[cabins]" });
      // reset(); // ! had to move this functionality to CreateCabinForm (where we call createCabin)
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
