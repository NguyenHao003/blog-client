import { useQuery } from "@tanstack/react-query";
import { userApis } from "../apis/user-api";
import { USER_QUERY_KEYS } from "../constants/user-query-keys";

export const useUsers = () => {
  const { data, ...rest } = useQuery({
    queryKey: USER_QUERY_KEYS.LIST,
    queryFn: () => userApis.getUsers(),
  });

  return { users: data?.data, ...rest };
};
