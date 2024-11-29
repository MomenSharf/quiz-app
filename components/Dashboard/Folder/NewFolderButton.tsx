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
import { toast } from "@/components/ui/use-toast";
import { newFolder } from "@/lib/actions/quiz.actions";
import { cn } from "@/lib/utils";
import { folderSchema, folderSchemaType } from "@/lib/validations/quizSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { HTMLProps, LegacyRef, ReactNode, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/icons";
import { Button, ButtonProps } from "@/components/ui/button";
import { useDashboardContext } from "../Context";
import Loader from "@/components/Layout/Loader";

type NewFolderButtonProps = HTMLProps<HTMLDivElement> & {
  parentId?: string ;
};

export default function NewFolderButton({
  children,
  parentId ,
  ...props
}: NewFolderButtonProps) {
  const dialogCloseRef = useRef<HTMLButtonElement | null>(null);

  const {
    state: { isCreatingFolder },
    createFolder,
  } = useDashboardContext();

  const form = useForm<folderSchemaType>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSumbit = async (values: folderSchemaType) => {
    await createFolder({ pathname: "/dashboard", parentId, title: values.title });
    form.reset();
    if (dialogCloseRef) dialogCloseRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div {...props}>{children}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
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
              <Button type="submit" className="flex gap-2" disabled={isCreatingFolder}>
                {isCreatingFolder ? <Loader /> : <Plus className="w-4 h-4" />}
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
