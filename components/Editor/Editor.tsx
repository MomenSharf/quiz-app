import React from "react";
import Header from "./Header/Header";
import Content from "./Content";
import Sidebar from "@/components/Editor/Sidebar/Sidebar";
import { Form } from "../ui/form";
import { useEditorContext } from "./Context";
import { quizSchemaType } from "@/lib/validations/quizSchemas";
import ImageEditor from "../ImageManeger/ImageEditor";

export default function Editor() {
  const {
    dispatch,
    form,
    state: { isImageEditorOpenWithFiles, isSettingsOpen },
  } = useEditorContext();

  const onSubmit = (values: quizSchemaType) => {};
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
        {"files" in isImageEditorOpenWithFiles && (
          <ImageEditor
            open={isImageEditorOpenWithFiles.isOpen}
            afterUpload={(uploadedImage) => {
              form.setValue(
                isImageEditorOpenWithFiles.field,
                uploadedImage[0].url
              );
              dispatch({
                type: "SET_IS_IMAGE_EDITOR_OPEN",
                payload: { isOpen: false },
              });
            }}
            aspectRatio={4 / 3}
            files={isImageEditorOpenWithFiles.files}
            onOpenChange={(e) =>
              dispatch({
                type: "SET_IS_IMAGE_EDITOR_OPEN",
                payload: { isOpen: e },
              })
            }
          />
        )}
      </form>
    </Form>
  );
}
