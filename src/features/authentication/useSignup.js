import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup as signupAPI } from "../../services/apiAuth";

export function useSignup() {
  const {
    mutate: signup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: signupAPI,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! Please verify your new account from the user's email address"
      );
    },
  });

  return { signup, isLoading, error };
}
