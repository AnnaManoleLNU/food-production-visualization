"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

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

type Country = {
  key: string;
  doc_count: number;
};

type DropdownProps = {
  selectedCountry: string | null;
  onSelectedCountry: (country: string) => void;
  selectedFood: (food: string, quantity: number) => void;
};

export function CountryCombobox({
  selectedCountry,
  onSelectedCountry,
  selectedFood,
}: DropdownProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  
  const value = selectedCountry || "";
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://food-production-visualisation-api.vercel.app/elastic/countries"
        );
        if (!response.ok) throw new Error("Failed to fetch countries");
        const jsonData = await response.json();
        setCountries(jsonData.countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchData();
  }, []);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? value : currentValue;
    onSelectedCountry(newValue);
    setSearchTerm("");
    setOpen(false);
    if (newValue === "") {
      selectedFood("", 0);
    }
  };

  // const handleClear = () => {
  //   setSearchTerm("");
  //   onSelectedCountry("");
  //   selectedFood("", 0);
  // };

  const filteredCountries = countries.filter((country) =>
    country.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex justify-center items-center mb-20">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[300px] justify-between"
          >
            <span className="truncate">
            {value}
            </span>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput
              placeholder="Search country..."
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <CommandList>
              {filteredCountries.length === 0 && (
                <CommandEmpty>No country found.</CommandEmpty>
              )}
              <CommandGroup>
                {filteredCountries.map((country) => (
                  <CommandItem
                    key={country.key}
                    value={country.key}
                    onSelect={handleSelect}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === country.key ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {country.key}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
      
        {/* <Button
          variant="secondary"
          size="sm"
          aria-label="Clear selection"
          onClick={handleClear}
          className="ml-auto my-2"
        >
          Clear
        </Button> */}
     
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
