import categories  from "@/data/category.json";
import CategoryCardComponent from "@/components/events/categories/CategoryCardComponent";
import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import TestimonialCardComponent from "@/components/testimonials/TestimonailCardComponent";
import { TestimonialType } from "@/difinitions/types/components-type/testimonial";
import  testimonials from "@/data/testimonials.json"

export default function Homepage() {

  const typedCategory: CategoryType[] = categories
  const typedTestimonial: TestimonialType[] = testimonials
  

  return (
    <section  className="flex flex-col gap-4 items-center">
        <h1 className="flex item-center jutify-center">Testing Git Actions </h1>
      <p>This is Homepage</p>

      <section lang="km" className="flex items-center gap-9">
        <CategoryCardComponent categories={typedCategory} />
        
      </section>

      {/* <TestimonialCardComponent testimonials={typedTestimonial}/> */}

    
    </section>
  );
}
