"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignLeft } from "lucide-react";

export function FitterOrganization() {
  const [position, setPosition] = React.useState("bottom");

  return (
    <div lang={"km"} className="text-iDonate-navy-primary ml-[16px]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="text-iDonate-navy-secondary text-description-khmer"
          >
            <AlignLeft />
            អង្កការភាព
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filters Organization</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">
              Water Pure
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">
              Education
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">
              Healthy Food
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
