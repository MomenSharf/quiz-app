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
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

type NewQuizButtonProps = {
  className?: string;
  userId: string;
  folderId? : string
  pathname: string;
};

export default function NewFolderButton({
  className,
  userId,
  folderId,
  pathname,
}: NewQuizButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  

  const router = useRouter();

  const form = useForm<folderSchemaType>({
    resolver: zodResolver(folderSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSumbit = async (values: folderSchemaType) => {
    setIsLoading(true);

    try {
      const FolderId = await newFolder( pathname, values.title, folderId);

      if (FolderId) {
        setIsOpen(false)
        toast({
          title: "Success",
          description: "Folder created successfully",
        });
        // router.push(`/quizzes/folders/${quizId}`);
      } else {
        toast({
          title: "Error",
          description: "There was an error with creating new Folder",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error with creating new Folder",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant='white'
          disabled={isLoading}
          className={cn(
            "px-5 flex items-center gap-1 text-foreground",
            className
          )}
        >
          {" "}
          <Icons.folderPlus className="w-5 h-5 fill-primary stroke-transparent" />
          New Folder
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
                  {isLoading ? (
                    <Icons.Loader className="w-4 h-4 animate-spin stroke-primary-foreground" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  Create
                </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
