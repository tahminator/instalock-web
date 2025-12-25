import { zodResolver } from "@hookform/resolvers/zod";
import { queryByRiotNameSchema } from "@instalock/api";
import { Autocomplete, Button, Center, Loader, rem } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

import { useFetchPossibleUsersByQuery } from "@/lib/api/queries/api/unauthenticated";

export default function SearchBar() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(queryByRiotNameSchema),
    defaultValues: {
      query: "",
    },
  });
  const query = form.watch("query");
  const { data, status } = useFetchPossibleUsersByQuery(query);

  const tags = data.map((user) => user.riotTag).filter((tag) => tag != null);

  const onSubmit = ({ query }: z.infer<typeof queryByRiotNameSchema>) => {
    const puuid = data
      .filter((user) => user.riotTag === query)
      .map((user) => user.puuid);

    if (!puuid || !puuid[0]) {
      return;
    }

    navigate(`/search/${puuid}`);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      style={{
        width: "100%",
      }}
    >
      <Controller
        name="query"
        control={form.control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            w={"100%"}
            p={"sm"}
            placeholder={"Search Riot user here"}
            value={query}
            onChange={(v) => {
              field.onChange(v);
              onSubmit({ query: v });
            }}
            data={tags}
            error={form.formState.errors.query?.message}
            rightSection={
              status === "pending" ? (
                <Loader size={16} />
              ) : (
                <Button
                  size="xs"
                  disabled={!!form.formState.errors.query}
                  variant={"transparent"}
                  c={form.formState.errors.query ? "red" : undefined}
                  type="submit"
                  rightSection={
                    <Center>
                      <IconSend2
                        style={{
                          width: rem(20),
                          height: rem(20),
                          marginRight: "14px",
                        }}
                        stroke={1.5}
                      />
                    </Center>
                  }
                />
              )
            }
          />
        )}
      />
    </form>
  );
}
