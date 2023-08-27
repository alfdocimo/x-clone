import AppLayout from "@/components/AppLayout";
import { api } from "@/utils/api";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

export default function Profile() {
  //   const router = useRouter();

  //   const userId = router.query.slug;

  //   const { data } = api.profile.getUserById.useQuery({ userId });

  //   console.log({ data });

  return (
    <AppLayout>
      <h1>Todo</h1>
    </AppLayout>
  );
}
