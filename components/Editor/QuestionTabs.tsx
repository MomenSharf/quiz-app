"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useScreenDimensions from "@/hooks/useScreenDimensions";
import {
  questionSchemaType
} from "@/lib/validations/quizSchemas";
import { useEditorContext } from "./EditorContext";
import QuestionTypes from "./QuestionTypes";
type QuestionTabsProps = {
  question: questionSchemaType;
  index: number;
};

export default function QuestionTabs({ question, index }: QuestionTabsProps) {
  const isSelected = question.type !== "UNSELECTED";
  const dimensions = useScreenDimensions();

  const { sidebarRef, headerRef } = useEditorContext();

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
        <QuestionTypes type={question.type} index={index} />
      </TabsContent>
      <TabsContent value="content">Conntent</TabsContent>
      <TabsContent value="design">Design</TabsContent>
      <TabsContent value="audio">Audio</TabsContent>
      <TabsContent value="settings">SETTINGS</TabsContent>
    </Tabs>
  );
}
