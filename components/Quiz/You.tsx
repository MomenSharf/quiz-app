"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function You({ userId }: { userId: string }) {
  const session = useSession();
  const isCurrentUser = session.data?.user.id === userId;
  return (
    <>{isCurrentUser && <span className="text-primary text-xs">(You)</span>}</>
  );
}
