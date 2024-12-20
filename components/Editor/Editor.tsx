import React from "react";
import Header from "./Header/Header";
import Content from "./Content";
import Sidebar from "@/components/Editor/Sidebar/Sidebar";
import { Form } from "../ui/form";
import { useEditorContext } from "./Context";
import { quizSchemaType } from "@/lib/validations/quizSchemas";
import ImageEditor from "./Question/QuestionImageManager/ImageEditor";

export default function Editor() {
  const { form } = useEditorContext();
  
  const onSubmit = ( values: quizSchemaType) => {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        className="h-screen flex flex-col bg-background"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="h-screen flex flex-col">
          <Header />
          <div className="flex flex-1 flex-col-reverse sm:flex-row overflow-hidden">
            <Sidebar />
            <Content />
          </div>
        </div>
        <ImageEditor />
      </form>
    </Form>
  );
}
