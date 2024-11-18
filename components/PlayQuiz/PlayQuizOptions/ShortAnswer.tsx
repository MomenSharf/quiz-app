import { quizSchemaType } from "@/lib/validations/quizSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ShortAnswer() {
  const gg = z.object({ userInput: z.string() });
  type ggg = z.infer<typeof gg>;
  const shorAnswerform = useForm<ggg>({
    resolver: zodResolver(z.string()),
    defaultValues: {userInput: ''},
  });
  return <div>ShortAnswer</div>;
}
