"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { folderSchema, folderSchemaType } from "@/lib/validations/quizSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLProps, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import Loader from "@/components/Layout/Loader";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useLibraryContext } from "../Context";
import { renameQuiz } from "@/lib/actions/library";
import { toast } from "@/components/ui/use-toast";
import { MAX_QUIZ_TITLE_LENGTH } from "@/constants";

type NewQuizButtonProps = HTMLProps<HTMLDivElement> & {
  quizId: string;
};

export default function RenameQuiz({
  quizId,
  title,
  open,
  setOpen,
}: {
  quizId: string;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const form = useForm<folderSchemaType>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      title,
    },
  });

  const onSumbit = async ({ title }: folderSchemaType) => {
    setOpen(true);

    const { success, message } = await renameQuiz({
      quizId,
      title,
      pathname: "/library",
    });

    if (success) {
      toast({ description: "Quiz renamed successfully" });
    } else {
      toast({
        description: message,
        title: "error",
        variant: "destructive",
      });
    }
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename Quiz</DialogTitle>
          <DialogDescription>Enter a new name for the quiz</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col  justify-start gap-3 transition-all"
            onSubmit={form.handleSubmit(onSumbit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="relative space-y-1 flex w-full flex-col flex-1">
                  <FormControl>
                    <Input
                      placeholder="title..."
                      className={cn("transition-all pr-6", {
                        "border-destructive bg-destructive/10 focus-visible:ring-destructive":
                          form.getFieldState("title").error,
                      })}
                      maxLength={MAX_QUIZ_TITLE_LENGTH}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-extralight mt-0" />
                  <div className="absolute right-2.5 top-2 text-xs text-muted-foreground">{MAX_QUIZ_TITLE_LENGTH - form.getValues('title').length }</div>
                </FormItem>
              )}
            />
            <div className="flex gap-3 justify-end">
              <DialogClose
                className={cn(buttonVariants({ variant: "secondary" }))}
              >
                Cancel
              </DialogClose>
              <Button
                type="submit"
                className="flex gap-2"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && <Loader />}
                Rename
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
