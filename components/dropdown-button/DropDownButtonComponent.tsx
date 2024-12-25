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

export function DropDownButtonComponent() {
  const [position, setPosition] = React.useState("bottom");

  return (
    <div className="ml-[15px] text-iDonate-navy-primary">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Filters</Button>
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
