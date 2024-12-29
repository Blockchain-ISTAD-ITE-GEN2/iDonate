"use client";
import OrganizationDetailHeroSection from "@/components/herosection/OrganizationDetailHeroSection";
import CategoryIconComponent from "@/components/events/categories/CategoryIconComponent";
import { CategoryIcon } from "@/difinitions/types/components-type/CategoryType";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/ui/SearchInput";
import { DropDownButtonComponent } from "@/components/dropdown-button/DropDownButtonComponent";
import { EventTypeParam } from "@/difinitions/types/media/organization";
import { CommonEventCard } from "@/components/events/organization-event/CommonEventCard";
import { Button } from "@/components/ui/button";

export default function CategoryOnPageComponent() {
    const router = useRouter();
    const handleOnClick = (id: number) => {
        console.log(id);
        router.push(`/categories/${id}`);
    };

    const categories = [
        {
            title: "អាហារ សុខភាព",
            media: "https://charius-next.netlify.app/_next/static/media/3.0714cc33.svg",
        },
        {
            title: "វិស័យ​អប់រំ",
            media: "https://charius-next.netlify.app/_next/static/media/1.f81fd7b6.svg",
        },
        {
            title: "ប្រព័ន្ធទឹកស្អាត",
            media: "https://charius-next.netlify.app/_next/static/media/2.15763a18.svg",
        },
        {
            title: "ការថែទាំ សុខភាព",
            media: "https://charius-next.netlify.app/_next/static/media/4.41949be1.svg",
        },
    ];

    const eventData: EventTypeParam[] = [
        {
            image: "https://media.istockphoto.com/id/547404780/photo/local-students-in-cambodia.jpg?s=612x612&w=0&k=20&c=e5bAh7pAa87T2eKj1XJ9PgaMztkImfSVS4UAwb8zF-o=",
            title: "កម្មវិធីជំនួយសិស្សនៅខេត្តកំពង់ធំ",
            description: "ជួយសិស្សដែលមានការខ្វះខាតសម្ភារសិក្សា និងអាហារូបករណ៍",
            total_donor: 120,
            total_amount: 5000,
        },
        {
            image: "https://www.unicef.org/cambodia/sites/unicef.org.cambodia/files/styles/hero_extended/public/EGR%20Grade%202_Ratanakiri_December2023_Cristyn%20Lloyd_26.jpg.webp?itok=X3j0lSpb",
            title: "បរិច្ចាគជំនួយសង្គ្រោះគ្រោះទឹកជំនន់",
            description: "ផ្ដល់ជំនួយចាំបាច់ដល់ជនរងគ្រោះទឹកជំនន់",
            total_donor: 85,
            total_amount: 3200,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-nhNl60H50EO2WVCeu_0m_FRHDAFBxoYoGg&s",
            title: "ការជួបប្រជុំសំខាន់ជាមួយអង្គការសប្បុរសធម៌",
            description: "អង្គការសប្បុរសធម៌ជួបប្រជុំដើម្បីបង្កើតការផ្លាស់ប្តូរជាពិសេស",
            total_donor: 200,
            total_amount: 10000,
        },
        
    ];

    return (
        <>
            {/* Hero Section Start */}
            <section className="flex flex-col">
                <OrganizationDetailHeroSection />
            </section>
            {/* Hero Section End */}

            {/* Start Card Categories */}
            <section className="mb-[24px] mx-16 md:mx-[100px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px] md:gap-[20px] lg:gap-[100px]">
                    {categories.map((category: CategoryIcon, index: number) => (
                        <div
                            key={index}
                            onClick={() => handleOnClick(index)}
                            className="cursor-pointer"
                        >
                            <CategoryIconComponent
                                media={category.media}
                                title={category.title}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* List Card Events */}
            {["Clean Water", "Education", "Healthy Food", "Medical Care"].map(
                (categoryName, sectionIndex) => (
                    <section key={sectionIndex} className="mt-[36px] mx-14 lg:mx-[100px]">
                        <h2
                            className="text-heading-two-eng text-iDonate-navy-primary md:flex md:items-center md:justify-center lg:flex lg:tems-center lg:justify-start"
                        >
                            {categoryName}
                        </h2>

                        {/* Event Cards */}
                        <section className="my-[44px]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[44px]">
                                {eventData.map((event, eventIndex:number) => (
                                    <CommonEventCard key={eventIndex} event={event} />
                                ))}
                            </div>
                            <div
                                
                                className="flex flex-wrap justify-end my-[24px]"
                            >
                                <Button
                                    className="w-[147px] h-[50px] rounded-[15px] text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-primary hover:text-iDonate-green-secondary hover:bg-iDonate-navy-primary"
                                >
                                    Show More
                                </Button>
                            </div>
                        </section>
                    </section>
                )
            )}
        </>
    );
}
