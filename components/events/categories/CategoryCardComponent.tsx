import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import Image from 'next/image';

export default function CategoryCardComponent({categories}: {categories: CategoryType[]}) {
  return (
    <>
    {categories.map((item, index) => (
        <div key={index} className="w-[310px] h-[370px] flex flex-col items-center gap-6 px-7 py-12 rounded-[15px] shadow-custom">
            <div className="w-[100px] h-[100px] bg-iDonate-navy-accent rounded-full border border-iDonate-navy-primary flex items-center justify-center">
                {item.media && <Image width={60} height={60} src={item.media} alt={item.title || "Media"} />}
            </div>

            {item.title && <h3 className="text-title-khmer text-iDonate-navy-primary">{item.title}</h3>}
            {item.description && <p className="text-medium-khmer text-center text-iDonate-navy-primary">{item.description}</p>}
            {/* {item.benefits && <span className="text-sm">{item.benefits}</span>} */}
        </div>
      ))}
    </>
      
  );
}
