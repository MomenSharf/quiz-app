import stringSimilarity from "string-similarity";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PlayQuizQuestion } from "../Context";
import { Button } from "@/components/ui/button";
import { compareSentences } from "@/lib/gemini";

export default function ShortAnswer({
  question,
}: {
  question: PlayQuizQuestion;
}) {
  const userInputSchama = z.object({
    userInput: z.string().min(1, "At least one character"),
  });
  type userInputSchamaType = z.infer<typeof userInputSchama>;
  const shortAnswerForm = useForm<userInputSchamaType>({
    resolver: zodResolver(userInputSchama),
    defaultValues: { userInput: "" },
  });

  const { control, getFieldState, handleSubmit } = shortAnswerForm;

  const onSubmit = (data: userInputSchamaType) => {
    const isCorrect = compareSentences(
      data.userInput,
      question.correctAnswer || undefined
    );
  };
  return (
    <Form {...shortAnswerForm}>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name={"userInput"}
          render={({ field }) => (
            <FormItem className="space-y-1 flex w-full flex-col">
              <FormControl>
                <Textarea
                  className={cn(
                    "resize-none font-semibold focus:z-10 h-28 text-start bg-background",
                    {
                      "border-destructive focus-visible:ring-destructive":
                        getFieldState("userInput").error,
                    }
                  )}
                  placeholder="Type your answer..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <Button className="self-end" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
