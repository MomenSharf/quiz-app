"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useScreenDimensions from "@/hooks/useScreenDimensions";
import { useEditorContext } from "./EditorContext";
import ImageEditor from "./QuestionImageManager/ImageEditor";
import ContentTab from "./Tabs/ContentTab";
import TypesTab from "./Tabs/TypesTab";
import { useState } from "react";
type QuestionTabsProps = {
  questionIndex: number;
};

export default function QuestionTabs({ questionIndex }: QuestionTabsProps) {
  const dimensions = useScreenDimensions();

  const {
    dispatch,
    sidebarRef,
    headerRef,
    form: { getValues },
    state: {currentQuestionTab}
  } = useEditorContext();

  const question = getValues(`questions.${questionIndex}`);

  const isSelected = question.type !== "UNSELECTED";
  

  return (
    <>
      <Tabs
        defaultValue="content"
        className="w-full  overflow-auto"
        style={{
          height: `calc(100vh - ${headerRef.current?.offsetHeight || 50}px
        - ${
          dimensions.width < 640 ? sidebarRef.current?.offsetHeight || 50 : 0
        }px )`,
        }}
        value={isSelected ? currentQuestionTab : 'type'}
        onValueChange={(e) => dispatch({type: 'SET_CURRENT_QUESTION_TAB', payload : e })}
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
        <TabsContent value="type" className="overflow-auto container">
          <TypesTab type={question.type} questionIndex={questionIndex} />
        </TabsContent>
        <TabsContent value="content" className="flex justify-center container">
          <ContentTab questionIndex={questionIndex} />
        </TabsContent >
        <TabsContent value="design">Design</TabsContent>
        <TabsContent value="audio">Audio</TabsContent>
        <TabsContent value="settings">SETTINGS</TabsContent>
      </Tabs>
      <ImageEditor />
    </>
  );
}
