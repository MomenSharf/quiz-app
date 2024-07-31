'use client'

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useLocalStorage } from "@uidotdev/usehooks";
import QuizForm from "./QuizTab/QuizForm";
import { Button } from "../ui/button";
import QuizForm2 from "./QuizTab/QuizForm2";

export default function CreateQuizTabs() {
  const [tab, setTab] = useLocalStorage<
    "QUIZ" | "THEME" | "RESULTS" | "SETTINGS" | "SAVE"
  >("form-tab", "QUIZ");

  return (
    <Tabs defaultValue='QUIZ' className="w-full mt-3 max-w-3xl">
      <TabsList className="w-full justify-stretch">
        <TabsTrigger
          value="QUIZ"
          className="basis-1/5 transition-all"
          onClick={() => setTab("QUIZ")}
        >
          Quiz
        </TabsTrigger>
        <TabsTrigger
          value="THEME"
          className="basis-1/5 transition-all"
          onClick={() => setTab("THEME")}
        >
          Theme
        </TabsTrigger>
        <TabsTrigger
          value="RESULTS"
          className="basis-1/5 transition-all"
          onClick={() => setTab("RESULTS")}
        >
          Results
        </TabsTrigger>
        <TabsTrigger
          value="SETTINGS"
          className="basis-1/5 transition-all"
          onClick={() => setTab("SETTINGS")}
        >
          Settings
        </TabsTrigger>
        <TabsTrigger
          value="SAVE"
          className="basis-1/5 transition-all"
          onClick={() => setTab("SAVE")}
        >
          Save
        </TabsTrigger>
      </TabsList>
      <TabsContent value="QUIZ">
        <QuizForm2 type='CREATE' userId={'userId'} />
      </TabsContent>
      <TabsContent value="THEME">THEME</TabsContent>
      <TabsContent value="RESULTS">RESULTS</TabsContent>
      <TabsContent value="SETTINGS">SETTINGS</TabsContent>
      <TabsContent value="SAVE">SAVE</TabsContent>
    </Tabs>
  );
}
