import { searchUsers } from "@/actions/user";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

export const useSearch = (key: string, type: "USERS") => {
  const [query, setQuery] = useState("");
  const [debounce, setDebounce] = useState("");
  const [onUsers, setOnUsers] = useState<
    | {
        id: string;
        subscription: { plan: "PRO" | "FREE" } | null;
        firstname: string | null;
        lastname: string | null;
        image: string | null;
        email: string | null;
      }[]
    | undefined
  >(undefined);

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebounce(query);
    }, 1000);

    return () => clearTimeout(delayInputTimeoutId);
  }, [query]);

  const { refetch, isFetching } = useQuery({
    queryKey: [key, debounce],
    queryFn: async ({ queryKey }) => {
      if (type === "USERS") {
        const users = await searchUsers(queryKey[1] as string);
        if (users.status === 200) setOnUsers(users.data);
      }
    },
    enabled: false,
  });

  useEffect(() => {
    if (debounce) refetch();
    else setOnUsers(undefined);

    return () => {
      debounce;
    };
  }, [debounce]);

  return { onSearchQuery, query, isFetching, onUsers };
};
