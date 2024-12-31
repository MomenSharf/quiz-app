"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { folderSchema, folderSchemaType } from "@/lib/validations/quizSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Icons } from "@/components/icons";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { newFolder } from "@/lib/actions/library";

type NewFolderButtonProps = ButtonProps & {
  parentId?: string;
};

export default function NewFolderButton({
  children,
  parentId,
  ...props
}: NewFolderButtonProps) {
  const [open, setOpen] = useState(false);

  

  const form = useForm<folderSchemaType>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSumbit = async ({ title }: folderSchemaType) => {
    const { success, message } = await newFolder({
      title,
      parentId,
      pathname: "/library",
    });

    if (success) {
      toast({ description: "Folder created successfully" });
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
      <DialogTrigger asChild>
        <Button {...props}>{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-xl">
        <DialogHeader>
        <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            Enter a title for the new folder
          </DialogDescription>
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
            <DialogFooter className="flex gap-3 justify-end">
              <DialogClose
                className={cn(buttonVariants({ variant: "secondary" }))}
              >
                Cancel
              </DialogClose>
              <Button
                type="submit"
                className="flex gap-1"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Icons.Loader className="w-4 h-4 animate-spin stroke-primary-foreground" />
                )}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
