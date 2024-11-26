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
import { ReactNode, useState } from "react";
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

type NewQuizButtonProps = ButtonProps & {
  parentId?: string | null;
};

export default function NewFolderButton({
  parentId = null,
  className,
  ...props
}: NewQuizButtonProps) {
  const {
    dispatch,
    state: { isCreatingFolder, isNewFolderDialogOpen },
    createFolder,
  } = useDashboardContext();

  const form = useForm<folderSchemaType>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSumbit = async (values: folderSchemaType) => {
    createFolder({ pathname: "/dashboard", parentId, title: values.title });
  };

  return (
    <Dialog
      open={isNewFolderDialogOpen}
      onOpenChange={(open) =>
        dispatch({ type: "SET_IS_NEW_FOLDER_DIALOG_OPEN", payload: open })
      }
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("px-6 rounded-xl items-center gap-1 bg-white text-foreground", className)}
          {...props}
        >
          <Icons.folderPlus className="w-4 h-4 fill-primary stroke-transparent " />
          new Folder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
              <DialogClose>
                <Button variant="secondary" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="flex gap-2">
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
