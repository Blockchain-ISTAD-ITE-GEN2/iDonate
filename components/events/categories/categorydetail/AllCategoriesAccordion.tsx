"use client";

import { Play } from "lucide-react"; // Importing Lucide icon
import { Button } from "@/components/ui/button";

export function AllCategoriesButton() {
  return (
    <div className="w-[412px] h-[401px] p-4 bg-white border rounded-[15px] shadow-sm">
      <h2
       
        className="text-center font-bold text-heading-two-eng mb-4"
      >
        All Categories
      </h2>
      <div className="flex item-center justify-center ">
        <div className="flex flex-col">
          <Button
            variant="outline"
            className="w-[320px] h-[50px] rounded-[15px] border-0.5 text-iDonate-navy-primary gap-2 justify-start item-center mb-[16px] hover:bg-iDonate-navy-accent"
          >
            <Play className="w-10 h-10" />
            <span>Kids Education</span>
          </Button>
          <Button
            variant="outline"
            className="w-[320px] h-[50px] rounded-[15px] border-0.5 text-iDonate-navy-primary gap-2 justify-start item-center mb-[16px] hover:bg-iDonate-navy-accent"
          >
            <Play className="w-10 h-10" />
            <span>Pure Water</span>
          </Button>
          <Button
            variant="outline"
            className="w-[320px] h-[50px] rounded-[15px] border-0.5 text-iDonate-navy-secondary gap-2 justify-start item-center mb-[16px] hover:bg-iDonate-navy-accent"
          >
            <Play className="w-10 h-10" />
            <span>Healthy Food</span>
          </Button>
          <Button
            variant="outline"
            className="w-[320px] h-[50px] rounded-[15px] border-0.5 text-iDonate-navy-primary gap-2 justify-start item-center mb-[16px] hover:bg-iDonate-navy-accent"
          >
            <Play className="w-10 h-10" />
            <span>Medical Care</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
