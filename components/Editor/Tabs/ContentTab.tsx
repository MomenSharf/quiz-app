import { useEditorContext } from "../EditorContext";
import FormContainer from "../QuestionForms/FormContainer";
import PickAnswer from "../QuestionForms/PickAnswer";

export default function ContentTab({
  questionIndex,
}: {
  questionIndex: number;
}) {
  return <FormContainer questionIndex={questionIndex} />;
}
