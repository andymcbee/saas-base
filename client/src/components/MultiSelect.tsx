import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
export interface ISelectProps {
  values: {
    key: string;
    value: string;
  }[];
  onSelectionChange: (selectedItems: string[]) => void; // Add this prop
}

const MultiSelect = ({ values, onSelectionChange }: ISelectProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectChange = (value: string) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems((prev) => {
        const newSelection = [...prev, value];
        onSelectionChange(newSelection); // Call the function passed by the parent
        return newSelection;
      });
    } else {
      setSelectedItems((prev) => {
        const newSelection = prev.filter((item) => item !== value);
        onSelectionChange(newSelection); // Call the function passed by the parent
        return newSelection;
      });
    }
  };

  const isOptionSelected = (value: string): boolean => {
    return selectedItems.includes(value) ? true : false;
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex gap-2 font-bold">
            <span>Select Values</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {values.map((value: ISelectProps["values"][0], index: number) => {
            return (
              <DropdownMenuCheckboxItem
                onSelect={(e) => e.preventDefault()}
                key={index}
                checked={isOptionSelected(value.key)}
                onCheckedChange={() => handleSelectChange(value.key)}
              >
                {value.value}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MultiSelect;
