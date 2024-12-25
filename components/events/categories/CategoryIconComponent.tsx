import Image from "next/image";
import { CategoryIcon } from "@/difinitions/types/components-type/CategoryType";

export default function CategoryIconComponent({ media, title }: CategoryIcon) {
  return (
    <>
      <div className="w-[240px] h-[228px] flex flex-col items-center gap-6 px-7 py-12 rounded-[10px] shadow-custom">
        <div className="rounded-full bg-iDonate-navy-accent p-6 border border-iDonate-navy-primary flex items-center justify-center">
          <Image width={50} height={50} src={media} alt={title || "Media"} />
        </div>
        <h3 lang={"km"} className="text-medium-eng text-iDonate-navy-primary">
          {title}
        </h3>
      </div>
    </>
  );
}
