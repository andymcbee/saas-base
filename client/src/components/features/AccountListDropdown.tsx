"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { useUser } from "@/lib/auth/UserProvider";

export function AccountListDropdown() {
  const { accountData, setAccountData } = useUser();
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState(accountData?.currentAccountId);

  const accountIds = accountData?.accountIds;
  const currentAccountId = accountData?.currentAccountId;

  const handleSelect = (accountId: string) => {
    if (accountId !== currentAccountId) {
      setAccountData({ ...accountData, currentAccountId: accountId });
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {accountData?.currentAccountId
            ? accountData.currentAccountId
            : "Loading accounts..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No accounts found.</CommandEmpty>
            <CommandGroup>
              {accountIds?.map((account) => (
                <CommandItem
                  key={account}
                  value={account.toString()}
                  onSelect={() => handleSelect(account)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      accountData?.currentAccountId === account
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {account}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
