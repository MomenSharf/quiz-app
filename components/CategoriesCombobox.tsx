"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Scroll } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
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
import { ScrollArea } from "./ui/scroll-area";

export function CategoriesCombobox({
  onFieldChange,
  category,
}: {
  onFieldChange: (category: string) => void;
  category: string | undefined;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(category);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {value
            ? categoriesWithLabel.find((category) => category.value === value)
                ?.label
            : "Category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                    setValue(currentValue === value ? "" : currentValue);
                    onFieldChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.label}
                </CommandItem>
              ))}
            </CommandList>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
