import { buttonVariants } from '@/components/ui/button';
import { QUESTION_TYPES_WITH_LABEL_AND_ICONS } from '@/constants';
import { cn } from '@/lib/utils';
import { quizSchemaType } from '@/lib/validations/quizSchemas';
import { Reorder, useMotionValue } from 'framer-motion';
import { Circle } from 'lucide-react';
import { useEditorContext } from '../Context';

export default function SidebarItem({question}: {question: quizSchemaType['questions'][number]}) {
  const {
    dispatch,
    state: { currentQuestionId, isSettingsOpen },
    form: { setValue, getValues },
  } = useEditorContext();

  const y = useMotionValue(0);
  const Icon = QUESTION_TYPES_WITH_LABEL_AND_ICONS.find(
    (e) => e.value === question.type
  )?.icon;
  return (
    <Reorder.Item
    value={question}
    id={question.id}
    style={{ y }}
    onDragEnd={(e) => {
      dispatch({ type: "SET_CURRENT_QUESTION", payload: question.id });
    }}
  >
    <div
      key={question.id}
      className={cn(
        buttonVariants({ size: "icon", variant: "outline" }),
        "w-16 h-16 sm:w-20 sm:h-20 relative hover:border-ring hover:bg-background cursor-pointer",
        {
          "border-ring bg-accent hover:bg-accent":
            currentQuestionId === question.id && !isSettingsOpen ,
        }
      )}
      onClick={() => {
        if (currentQuestionId !== question.id || isSettingsOpen) {
          dispatch({
            type: "SET_IS_SETTINGS_OPEN",
            payload: false,
          });
          dispatch({ type: "SET_CURRENT_QUESTION", payload: question.id });
        }
      }}
    >
      {Icon ? (
        <Icon
          className={cn(
            "w-5 h-5 sm:w-7 sm:h-7 text-muted-foreground fill-gray-medium",
            {
              "text-primary fill-primary": currentQuestionId === question.id && !isSettingsOpen,
            }
          )}
        />
      ) : (
        <Circle className="w-7 h-7 text-transparent" />
      )}
      <span className="absolute top-1 left-1 text-muted-foreground text-xs">
        {question.questionOrder + 1}
      </span>
      <div className="absolute top-1 right-1">
        {/* <EditorSidebarItemMenu
          trigger={
            <Button
              className="group px-1.5 py-0.5 h-auto rounded-full hover:bg-primary focus-visible:ring-1"
              size="sm"
              variant="ghost"
            >
              <Ellipsis className="w-3 h-3 text-muted-foreground group-hover:text-primary-foreground" />
            </Button>
          }
          contentPostionClasses="sm:left-20"
          question={question}
        /> */}
      </div>
    </div>
  </Reorder.Item>
  )
}
