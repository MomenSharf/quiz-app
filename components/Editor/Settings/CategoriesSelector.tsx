import { CATEGORY_OPTIONS_LIST } from "@/constants";
import { XCircle } from "lucide-react";
import { useEditorContext } from "../Context";
import { Button } from "@/components/ui/button";
import ErrorSpan from "../Question/QuestionForms/QuestionFormsElements/ErrorSpan";
import { toast } from "@/components/ui/use-toast";

export default function CategoriesSelector() {
  const {
    form: {
      getValues,
      setValue,
      formState: { errors },
    },
  } = useEditorContext();

  const categories = getValues("categories");

  const categoriesWithIsSelected = CATEGORY_OPTIONS_LIST.map((category) => {
    return {
      ...category,
      isSelected: categories.includes(category.value),
    };
  });
  

  return (
    <div className="flex flex-col gap-1">
      <p className="font-semibold text-sm">Categories</p>
      <div className="flex gap-2 flex-wrap">
        {categoriesWithIsSelected.map(({ label, value, id, isSelected }) => (
          <Button
            key={id}
            size="sm"
            type="button"
            variant={isSelected ? "default" : "outline"}
            onClick={() => {
              if (categories.length >= 5 && !isSelected)
                return toast({
                  variant: "destructive",
                  description: "Maximum 5 categories",
                });
              if (isSelected) {
                setValue(
                  "categories",
                  categories.filter((e) => e !== value)
                );
              } else {
                setValue("categories", [...categories, value]);
              }
            }}
            className="gap-1"
          >
            {label}
            {isSelected && <XCircle className="w-4 h-4" />}
          </Button>
        ))}
      </div>
      {errors && <ErrorSpan error={errors.categories} />}
    </div>
  );
}
