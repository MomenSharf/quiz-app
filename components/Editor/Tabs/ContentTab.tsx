import {
  questionSchemaType,
  quizSchemaType,
} from "@/lib/validations/quizSchemas";
import React from "react";
import { useEditorContext } from "../EditorContext";
import SingleChoice from "./ContentForms/SingleChoice";



export default function ContentTab({questionIndex}: {questionIndex: number}) {
  const {
    form: { getValues },
  } = useEditorContext();

  const question = getValues(`questions.${questionIndex}`);

  switch (question.type) {
    case "SINGLE_CHOICE":
      return <SingleChoice questionIndex={questionIndex} />;
    default:
      return "no type";
      break;
  }
}
