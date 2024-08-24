"use client";

import React, { Dispatch, RefObject, SetStateAction, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Button } from "../ui/button";
import {
  questionSchemaType,
  quizSchemaType,
} from "@/lib/validations/quizSchemas";
import useScreenDimensions from "@/hooks/useScreenDimensions";
import QuestionTypes from "./QuestionTypes";
import { UseFormReturn } from "react-hook-form";
import { QuestionType } from "@/types";
type QuestionTabsProps = {
  question: questionSchemaType;
  headerRef: RefObject<HTMLDivElement>;
  sidebarRef: RefObject<HTMLDivElement>;
  form: UseFormReturn<quizSchemaType>;
  index: number;
};

export default function QuestionTabs({
  question,
  headerRef,
  sidebarRef,
  form,
  index,
}: QuestionTabsProps) {
  const isSelected = question.type !== "UNSELECTED";
  const dimensions = useScreenDimensions();

  const setQuestionType = (type: QuestionType) =>
    form.setValue(`questions.${index}.type`, type);
  return (
    <Tabs
      defaultValue="type"
      className="w-full  overflow-auto"
      style={{
        height: `calc(100vh - ${headerRef.current?.offsetHeight || 50}px
        - ${
          dimensions.width < 640 ? sidebarRef.current?.offsetHeight || 50 : 0
        }px )`,
      }}
    >
      <TabsList className="w-full justify-stretch rounded-none">
        <TabsTrigger value="type" className="basis-1/5 transition-all">
          Type
        </TabsTrigger>
        <TabsTrigger
          value="content"
          className="basis-1/5 transition-all"
          disabled={!isSelected}
        >
          Content
        </TabsTrigger>
        <TabsTrigger
          value="design"
          className="basis-1/5 transition-all"
          disabled={!isSelected}
        >
          Design
        </TabsTrigger>
        <TabsTrigger
          value="audio"
          className="basis-1/5 transition-all"
          disabled={!isSelected}
        >
          Audio
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="basis-1/5 transition-all"
          disabled={!isSelected}
        >
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="type" className="overflow-auto">
        {/* <QuestionTypes
          type={question.type}
          setQuestionType={setQuestionType}
        /> */}
        {question.id}
      </TabsContent>
      <TabsContent value="content">Conntent</TabsContent>
      <TabsContent value="design">Design</TabsContent>
      <TabsContent value="audio">Audio</TabsContent>
      <TabsContent value="settings">SETTINGS</TabsContent>
    </Tabs>
  );
}
