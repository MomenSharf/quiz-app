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
import { HTMLProps, useRef } from "react";
import { useForm } from "react-hook-form";

import Loader from "@/components/Layout/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useDashboardContext } from "../Context";

type NewQuizButtonProps = HTMLProps<HTMLDivElement> & {
  quizId: string ;
};

export default function RenameQuiz({
  children,
  quizId ,
  ...props
}: NewQuizButtonProps) {

  const dialogCloseRef = useRef<HTMLButtonElement | null>(null);

  const {
    state: {  isRenamingQuiz },
    renameQuiz,
  } = useDashboardContext();

  const form = useForm<folderSchemaType>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSumbit = async (values: folderSchemaType) => {
    renameQuiz({ pathname: "/dashboard", quizId, newTitle: values.title });
    form.reset();
    if (dialogCloseRef) dialogCloseRef.current?.click();
  };

  return (
    <Dialog

    >
      <DialogTrigger asChild>
        <div {...props}>
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename Folder</DialogTitle>
          <DialogDescription></DialogDescription>
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
                <FormItem className="space-y-1 flex w-full flex-col flex-1">
                  <FormControl>
                    <Input
                      placeholder="title..."
                      className={cn("transition-all", {
                        "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                          form.getFieldState("title").error,
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-extralight mt-0" />
                </FormItem>
              )}
            />
            <div className="flex gap-3 justify-end">
              <DialogClose ref={dialogCloseRef}>
                <Button variant="secondary" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="flex gap-2" disabled={isRenamingQuiz}>
                {isRenamingQuiz && <Loader />}
                Rename
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
