"use client";

import { CirclePlus, CircleX } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { categoriesWithLabel } from "@/constants";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CategoriesCombobox({
  onFieldChange,
  categories,
}: {
  onFieldChange: (categories: string[]) => void;
  categories: string[];
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex gap-2 items-center flex-wrap">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between text-sm"
          >
            Add
            <CirclePlus className="ml-1 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search category..." />
            <ScrollArea>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandList>
                {categoriesWithLabel.map((category) => (
                  <CommandItem
                    key={category.value}
                    value={category.value}
                    onSelect={(currentValue) => {
                      if (!categories.includes(currentValue)) {
                        if (categories.length !== 5) {
                          const newCategries = categories;
                          newCategries.push(currentValue);
                          onFieldChange(newCategries);
                        } else {
                          toast("Maximan 5 categoris");
                        }
                      } else {
                        toast("This category already exists");
                      }

                      setOpen(false);
                    }}
                  >
                    {category.label}
                  </CommandItem>
                ))}
              </CommandList>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
      {/* <div className="flex gap-2 flex-wrap"> */}
      {categories.map((category) => {
        return (
          <Button
            size="sm"
            type="button"
            variant="outline"
            key={category}
            onClick={() => {
              const newCategries = categories.filter((e) => e !== category);
              onFieldChange(newCategries);
            }}
          >
            {category} <CircleX className=" ml-1 w-3 h-3" />
          </Button>
        );
      })}
      {/* </div> */}
    </div>
  );
}
