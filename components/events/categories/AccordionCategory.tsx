import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetCategoryByUuidQuery } from "@/redux/services/category-service";

type CategoryDetailProps = {
  uuid: string;
};

export function AccordionCategory({ uuid }: CategoryDetailProps) {
  // Fetch category details
  const {
    data: category = null,
    isLoading: isLoadingByUuid,
  } = useGetCategoryByUuidQuery(uuid, { skip: !uuid });

  // Handle loading state
  if (isLoadingByUuid) {
    return <p>Loading...</p>;
  }

  // Handle case when no category data is found
  if (!category) {
    return <p>No category data found.</p>;
  }

  return (
    <section lang="km">
      <Accordion lang="km" type="single" collapsible className="w-full">
        {category.benefits && category.benefits.length > 0 ? (
          category.benefits.map((benefit:any, index:number) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger lang="km" className="text-iDonate-navy-secondary text-medium-khmer">
                {benefit.question}
              </AccordionTrigger>
              <AccordionContent lang="km" className="text-iDonate-navy-secondary text-medium-khmer my-[36px]">
                {benefit.answer}
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <p className="text-center text-gray-500">No benefits available for this category.</p>
        )}
      </Accordion>
    </section>
  );
}
