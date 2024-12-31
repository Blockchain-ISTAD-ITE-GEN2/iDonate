// Page Detail
import HeroSectionCategoryComponent from "@/components/events/categories/categorydetail/HeroSectionCategoryComponent";
import CategoryDetailComponent from "@/components/events/categories/categorydetail/CategoryDetailComponent";

export default function Page() {
  return (
    <section className="flex flex-col gap-9 justify-center">
      {/*Start Hero Section*/}
      <HeroSectionCategoryComponent />

      <CategoryDetailComponent />
    </section>
  );
}
