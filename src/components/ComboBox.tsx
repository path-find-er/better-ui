import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "../utils";
import { Button } from "../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

export type ComboboxItem = {
  value: string;
  label: string;
};

type ComboboxProps<T extends ComboboxItem> = {
  label: string; // adding the new label prop
  items: T[];
  placeholder: string;
  noItemFoundText: string;
  selectedItem?: T;
  onItemSelect: (item: T | null) => void;
};

export function Combobox<T extends ComboboxItem>({
  label, // adding the new label prop
  items,
  placeholder,
  noItemFoundText,
  selectedItem,
  onItemSelect,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (itemValue: string) => {
    onItemSelect(
      itemValue === selectedItem?.value
        ? null
        : items.find((item) => item.value === itemValue) || null,
    );
    setOpen(false);
  };

  return (
    <div className="flex flex-col relative bg-gray-800 rounded-lg shadow-lg">
      <label
        htmlFor="combobox"
        className="absolute -top-6 left-2 text-sm text-gray-700"
      >
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="combobox"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedItem ? selectedItem.label : placeholder}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandEmpty>{noItemFoundText}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => handleSelect(item.value)}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedItem?.value === item.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Combobox;
