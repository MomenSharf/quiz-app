"use client";

import useScreenDimensions from "@/hooks/useScreenDimensions";
import { useEditorContext } from "./EditorContext";
import FormContainer from "./QuestionForms/FormContainer";
import PointsSelector from "./QuestionForms/QuestionFormsElements/PointsSelector";
import TimelimitSelector from "./QuestionForms/QuestionFormsElements/TimelimitSelector";
import TypeSelector from "./QuestionForms/QuestionFormsElements/TypeSelector";
import QuestionTypeSelector from "./QuestionTypeSelector";
type QuestionFormProps = {
  questionIndex: number;
};

export default function QuestionForm({ questionIndex }: QuestionFormProps) {
  const dimensions = useScreenDimensions();

  const {
    dispatch,
    sidebarRef,
    headerRef,
    form: { getValues, watch },
    state: { currentQuestionTab },
  } = useEditorContext();

  const question = getValues(`questions.${questionIndex}`);
  if (!question) return;

  if (question.type === "UNSELECTED")
    return <QuestionTypeSelector questionIndex={questionIndex} />;
  return (
    <div
      defaultValue="content"
      className="w-full  overflow-auto flex flex-col py-3"
      style={{
        height: `calc(100vh - ${headerRef.current?.offsetHeight || 50}px
        - ${
          dimensions.width < 640 ? sidebarRef.current?.offsetHeight || 50 : 0
        }px )`,
      }}
    >
      <div>
        <div className="container flex justify-center">
          <div className="max-w-3xl w-full flex flex-col gap-3 sm:flex-row justify-between items-center">
            <div className="w-full">
              <TypeSelector questionIndex={questionIndex} />
            </div>
            <div className="flex gap-3 w-full">
              <TimelimitSelector questionIndex={questionIndex} />
              <PointsSelector questionIndex={questionIndex} />
            </div>
          </div>
        </div>
      </div>
      <div className="container flex justify-center">
        <FormContainer questionIndex={questionIndex} />
      </div>
    </div>
  );
}
