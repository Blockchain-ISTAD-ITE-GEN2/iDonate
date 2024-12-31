import Image from "next/image";
import { CategoryIcon } from "@/difinitions/types/components-type/CategoryType";

export default function CategoryIconComponent({ media, title }: CategoryIcon) {
  return (
    <div>
      <div className="w-[300px] h-[300px] md:w-[240px] md:h-[240px] flex flex-col items-center gap-6 px-7 py-12 md:py-6 rounded-[10px] shadow-custom">
        <div className="rounded-full bg-iDonate-navy-accent p-6 border border-iDonate-navy-primary flex items-center justify-center">
          <Image
            width={1000}
            height={1000}
            src={media}
            alt={title || "Media"}
            className="object-cover w-32 h-32 md:w-24 md:h-24"
          />
        </div>
        <h3 className="text-medium-eng text-iDonate-navy-primary">{title}</h3>
      </div>
    </div>
  );
}
