import { CATEGORY_OPTIONS_LIST } from "@/constants";
import { XCircle } from "lucide-react";
import { toast } from "sonner";
import { useEditorContext } from "../Context";
import { Button } from "@/components/ui/button";
import ErrorSpan from "../Question/QuestionForms/QuestionFormsElements/ErrorSpan";

export default function CategoriesSelector() {
  const {
    form: {
      getValues,
      setValue,
      formState: { errors },
      trigger,
    },
  } = useEditorContext();

  const categories = getValues("categories");
  const gg = (value: string) => categories.includes(value);
  return (
    <div className="flex flex-col gap-1">
      <p className="font-semibold text-sm">Categories</p>
      <div className="flex gap-2 flex-wrap">
        {CATEGORY_OPTIONS_LIST.map(({ label, value, id }) => (
          <Button
            key={id}
            size="sm"
            type="button"
            variant={gg(value) ? "default" : "outline"}
            onClick={async () => {
              // if(categories.length >= 5 && !categories.includes(value))  return toast('Maximum 5 categories')
              gg(value)
                ? setValue(
                    "categories",
                    categories.filter((e) => e !== value)
                  )
                : setValue("categories", [...categories, value]);
              if (errors.categories) {
                await trigger();
              }
            }}
            className="gap-1"
          >
            {label}
            {gg(value) && <XCircle className="w-4 h-4" />}
          </Button>
        ))}
      </div>
      {errors && <ErrorSpan error={errors.categories} />}
    </div>
  );
}
