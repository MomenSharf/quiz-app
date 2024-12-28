import React from "react";
import { FieldError, Merge } from "react-hook-form";

export default function ErrorSpan({
  error,
}: {
  error:
    | FieldError
    | Merge<FieldError, (FieldError | undefined)[]>
    | undefined;
}) {
  return (
    error && (
      <span className="text-destructive text-xs font-semibold">
        {error.message}
      </span>
    )
  );
}
