"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { ArrowBigRightDash, RotateCcw, Save } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import { useEditorContext } from "./EditorContext";
import CategoriesSelector from "./CategoriesSelector";

export default function Settings() {
  const {
    form: { control, getFieldState },
  } = useEditorContext();

  return (
    <div className="container max-w-3xl py-3 flex flex-col gap-3">
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem className="space-y-1 flex w-full flex-col">
            <FormLabel>Descrption</FormLabel>
            <FormControl>
              <Textarea
                placeholder="type descrption for your quiz..."
                className="h-full max-h-72 w-full resize-none transition-all"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs font-extralight mt-0" />
          </FormItem>
        )}
      />
      
      <CategoriesSelector />
    </div>
  );

  return (
    <div className="mt-1 flex flex-col  justify-start gap-3 transition-all">
      <div className="flex gap-3">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-1 flex w-full flex-col flex-1">
              <FormControl>
                <Input
                  placeholder="Title..."
                  className={cn("transition-all", {
                    "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                      getFieldState("title").error,
                  })}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-extralight mt-0" />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-1 flex w-full flex-col">
              <FormControl>
                <Textarea
                  placeholder="Descrption..."
                  className={cn(
                    "h-full max-h-72 w-full resize-none transition-all",
                    {
                      "border-destructive bg-[hsl(var(--destructive)_/_10%)] focus-visible:ring-destructive":
                        getFieldState("description").error,
                    }
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-extralight mt-0" />
            </FormItem>
          )}
        />
      </div>
      {/*      
      <FormField
        control={form.control}
        name="categories"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Categories</FormLabel>
            <FormControl>
              <CategoriesCombobox
                categories={field.value}
                onFieldChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
    </div>
  );
}
