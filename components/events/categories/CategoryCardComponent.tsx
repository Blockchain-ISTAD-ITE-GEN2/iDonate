"use client";
import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useGetCategoriesQuery } from "@/redux/services/category-service";

export default function CategoryCardComponent() {
  const router = useRouter();

  const category = useGetCategoriesQuery({});

  const typeCategories: CategoryType[] = category?.currentData || [];

  // console.log("typeCategory", typeCategories);

  return (
    <>
      {typeCategories.map((item, index) => (
        <motion.div
          onClick={() => router.push(`/categories/${item?.uuid}`)}
          lang="km"
          key={index}
          // className="lg:w-[300px] md:w-full h-[370px] flex flex-col items-center gap-6 px-10 py-12 rounded-[15px] shadow-light"
          className="w-full bg-iDonate-light-gray flex flex-col items-center p-4 sm:p-10 rounded-[15px] shadow-light border-0 cursor-pointer gap-1 dark:bg-iDonate-dark-mode"
          initial={{ opacity: 0, y: 50 }} // Start off with 0 opacity and slightly below
          animate={{ opacity: 1, y: 0 }} // Animate to full opacity and original position
          transition={{ duration: 0.2 }} // Delay each card's animation slightly
          whileHover={{ scale: 1.03 }} // Hover effect: scale and shadow
        >
          <div className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] bg-iDonate-navy-accent rounded-full border border-iDonate-light-gray flex items-center justify-center ">
            <Image
              width={60}
              height={60}
              src={
                item.media && item.media.trim() !== ""
                  ? item.media
                  : "https://charius-next.netlify.app/_next/static/media/1.f81fd7b6.svg"
              }
              alt={item.name || "Media"}
              className="w-10 h-10 sm:w-[60px] sm:h-[60px]"
            />
          </div>

          {item.name && (
            <h3 className="text-medium-khmer md:text-title-khmer font-medium text-iDonate-navy-primary dark:text-iDonate-navy-accent">
              {item.name}
            </h3>
          )}

          {item.description && (
            <p className="text-sub-description-khmer md:text-description-khmer text-center text-iDonate-navy-secondary dark:text-iDonate-navy-accent">
              {item.description}
            </p>
          )}
        </motion.div>
      ))}
    </>
  );
}
