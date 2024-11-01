import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { RESULTS_PER_PAGE } from "../../utils/constants";

export function useBookings() {
  //  ! the params have to be retrieved here
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // * FILTER
  const filterBy = searchParams.get("status");
  const filterOptions =
    !filterBy || filterBy === "all"
      ? null
      : { field: "status", value: filterBy };
  // { field: "totalPrice", value: 5000, method: "gte" };
  // * SORT

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // * PAGINATION
  const page = !searchParams.get("page") ? 1 : +searchParams.get("page");

  // * QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    //  ! adding the filterOptions and sortBy objects to 'dependency array' of queryKey
    queryKey: ["bookings", filterOptions, sortBy, page],
    queryFn: () => getBookings({ filterOptions, sortBy, page }),
  });

  const numPages = Math.ceil(count / RESULTS_PER_PAGE);

  // check-out 'infinite query' feature of ReactQuery
  // * PREFETCHING
  if (page < numPages)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterOptions, sortBy, page + 1],
      queryFn: () => getBookings({ filterOptions, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterOptions, sortBy, page - 1],
      queryFn: () => getBookings({ filterOptions, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
}
