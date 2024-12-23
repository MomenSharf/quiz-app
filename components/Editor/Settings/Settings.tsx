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
import CategoriesSelector from "./CategoriesSelector";
import { useEditorContext } from "../Context";

export default function Settings() {
  const {
    form: { control },
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
              
            {/* <QuestionImageManagerTabs trigger={<Button>add cover to Quiz</Button>}/> */}
            </FormControl>
            <FormMessage className="text-xs font-extralight mt-0" />
          </FormItem>
        )}
      />
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


}
