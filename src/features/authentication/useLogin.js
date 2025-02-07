import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login as loginAPI } from "../../services/apiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      // ! caching the user so it doesn't get re-fetched
      queryClient.setQueryData(["user"], user.data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.error("🛑 ERROR!!!", err);
      toast.error("Provided email and password are incorrect ");
    },
  });

  return { login, isLoggingIn };
}
