"use client";

import { Play } from "lucide-react"; // Importing Lucide icon
import { Button } from "@/components/ui/button";
import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import categories from "@/data/category.json";
import { useGetCategoriesQuery } from "@/redux/services/category-service";

export function AllCategoriesButton() {
  const category = useGetCategoriesQuery({});

  const typeCategories: CategoryType[] = category?.currentData || [];
  return (
    <div
      lang="km"
      className="w-auto flex flex-col gap-6 p-9 bg-transparent border rounded-lg shadow-custom self-start"
    >
      <h2 className="text-center dark:text-iDonate-navy-accent font-bold text-title-eng text-iDonate-navy-secondary">
        ប្រភេទទាំងអស់
      </h2>

      <div className="flex flex-col items-start gap-4">
        {typeCategories.map((item, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full border-0 dark:text-iDonate-navy-accent text-iDonate-navy-primary gap-2 justify-start items-center hover:bg-iDonate-navy-accent text-lg"
          >
            <Play className="w-10 h-10" />
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
