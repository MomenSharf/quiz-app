import { CATEGORY_OPTIONS_LIST } from "@/constants";
import { XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useEditorContext } from "./EditorContext";
import { toast } from "sonner";

export default function CategoriesSelector() {
  const {
    form: { getValues, setValue },
  } = useEditorContext();

  const categories = getValues("categories");
  return (
    <div className="flex flex-col gap-1">
      <p className="font-semibold text-sm">Categories</p>
      <div className="flex gap-2 flex-wrap">
        {CATEGORY_OPTIONS_LIST.map(({ label, value, id }) => (
          <Button
            key={id}
            size="sm"
            variant={categories.includes(value) ? "default" : "outline"}
            onClick={() => {
              if(categories.length >= 5 && !categories.includes(value))  return toast('Maximum 5 categories')
              categories.includes(value)
                ? setValue(
                    "categories",
                    categories.filter((e) => e !== value)
                  )
                : setValue("categories", [...categories, value]);
            }}
            className="gap-1"
          >
            {label}
            {categories.includes(value) && <XCircle className="w-4 h-4" />}
          </Button>
        ))}
      </div>
    </div>
  );
}
