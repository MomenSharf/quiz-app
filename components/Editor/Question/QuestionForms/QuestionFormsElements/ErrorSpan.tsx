import React from "react";
import { FieldError } from "react-hook-form";

export default function ErrorSpan({ error }: { error: FieldError | undefined }) {
  return (
    error && (
      <span className="text-destructive text-xs font-semibold">{error.message}</span>
    )
  );
}
