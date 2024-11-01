import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    // ! in useQuery, we can DECIDE what the queryKey is gonna be (aka how the data will be called in cache)

    queryKey: ["stays"],
    queryFn: getStaysTodayActivity,
  });

  return { isLoading, activities };
}
