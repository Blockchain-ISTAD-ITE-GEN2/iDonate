"use client";

import OrganizationDetailHeroSection from "@/components/herosection/OrganizationDetailHeroSection";
import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import CategoryCardComponent from "./CategoryCardComponent";
import { useGetCategoriesQuery } from "@/redux/services/category-service";
import CategoryWithEventComponent from "./CategoryWithEventComponent";

export default function CategoryOnPageComponent() {
  const {
    data: apiReponseCategory = { content: [] },
    isLoading: isLoadingCategory,
  } = useGetCategoriesQuery({});

  // Extract the array of categories from the response
  const categories: CategoryType[] = apiReponseCategory.content || [];

  // Debugging logs
  console.log(" =====> Categories Data : ", categories);

  return (
    <section className="flex flex-col gap-9 mb-5">
      {/* Hero Section Start */}
      <OrganizationDetailHeroSection />

      {/* Start Card Categories */}
      <div className="w-full px-6 md:px-12 lg:px-24 space-y-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <CategoryCardComponent />
        </div>
      </div>

      {/* List Card Events */}
      {isLoadingCategory ? (
        <p></p>
      ) : (
        apiReponseCategory.map((category: any) => (
          <CategoryWithEventComponent key={category.uuid} category={category} />
        ))
      )}
    </section>
  );
}
