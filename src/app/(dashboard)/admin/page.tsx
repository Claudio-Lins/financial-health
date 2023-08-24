import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div>
        <h1>Ben-vido {session?.user.username} </h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Please, login to see the admin page</h1>
    </div>
  );
}
