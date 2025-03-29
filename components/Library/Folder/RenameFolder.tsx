"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { folderSchema, folderSchemaType } from "@/lib/validations/quizSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { MAX_FOLDER_TITLE_LENGTH } from "@/constants";
import { renameFolder } from "@/lib/actions/library";
import Loader from "@/components/Layout/Loader";

export default function RenameFolder({
  folderId,
  afterRename,
  open,
  setOpen,
}: {
  folderId: string;
  open: boolean;
  setOpen: (e: boolean) => void;
  afterRename?: () => void;
}) {
  const form = useForm<folderSchemaType>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSumbit = async ({ title }: folderSchemaType) => {
    const { success, message } = await renameFolder({
      folderId,
      title,
      pathname: "/library",
    });
    if (success) {
      toast({ description: "Folder renamed successfully" });
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
      <DialogContent className="sm:max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Rename Folder</DialogTitle>
          <DialogDescription>Enter a new name for the folder</DialogDescription>
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
                <FormItem className=" relative space-y-1 flex w-full flex-col flex-1">
                  <FormControl>
                    <Input
                      placeholder="title..."
                      className={cn("transition-all pr-6", {
                        "border-destructive bg-destructive/10 focus-visible:ring-destructive":
                          form.getFieldState("title").error,
                      })}
                      maxLength={MAX_FOLDER_TITLE_LENGTH}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-extralight mt-0" />
                  <div className="absolute right-2.5 top-2 text-xs text-muted-foreground">
                    {MAX_FOLDER_TITLE_LENGTH - form.getValues("title").length}
                  </div>
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
                className="flex gap-2"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader />
                ) : (
                  <Edit2 className="w-4 h-4" />
                )}
                Rename
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
