'use client'
import OrganizationDetailHeroSection from "@/components/herosection/OrganizationDetailHeroSection";
import CategoryIconComponent from "@/components/events/categories/CategoryIconComponent";
import {CategoryIcon} from "@/difinitions/types/components-type/CategoryType";
import {useRouter} from "next/navigation";
import {SearchInput} from "@/components/ui/SearchInput";
import {DropDownButtonComponent} from "@/components/dropdown-button/DropDownButtonComponent";
import {EventTypeParam} from "@/difinitions/types/media/organization";
import {CommonEventCard} from "@/components/events/organization-event/CommonEventCad";
import {Button} from "@/components/ui/button";


export default function CategoryOnPageComponent() {
    const router = useRouter();
    const handleOnClick = (id: number) => {
        console.log(id);
        // make it move the differect page later
        // router.push(`/organizations/${id}`);
        router.push(`/categories/${id}`);
    }
    const  categories = [
        {
            "title": "អាហារ សុខភាព",
            "media": "https://charius-next.netlify.app/_next/static/media/3.0714cc33.svg"
        },
        {
            "title": "វិស័យ​អប់រំ",
            "media": "https://charius-next.netlify.app/_next/static/media/1.f81fd7b6.svg"
        },
        {
            "title": "ប្រព័ន្ធទឹកស្អាត",
            "media": "https://charius-next.netlify.app/_next/static/media/2.15763a18.svg"
        },
        {
            "title": "ការថែទាំ សុខភាព",
            "media": "https://charius-next.netlify.app/_next/static/media/4.41949be1.svg"
        }
    ];
    // json data for testing
    // Example Data
    // Correct the type to EventTypeParam[]
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
        {
            image: "https://media.istockphoto.com/id/547404780/photo/local-students-in-cambodia.jpg?s=612x612&w=0&k=20&c=e5bAh7pAa87T2eKj1XJ9PgaMztkImfSVS4UAwb8zF-o=",
            title: "ការជួបប្រជុំសំខាន់ជាមួយអង្គការសប្បុរសធម៌",
            description: "អង្គការសប្បុរសធម៌ជួបប្រជុំដើម្បីបង្កើតការផ្លាស់ប្តូរជាពិសេស",
            total_donor: 200,
            total_amount: 10000,
        }
    ];

    return (
        <>
            {/* Hero Section Start */}
            <section className="flex flex-col">
                <OrganizationDetailHeroSection />
            </section>
            {/* Hero Section End */}

            {/*Start Card Categories */}
            <section lang={"km"} className="flex items-center justify-center gap-[100px] mb-[24px]">
                {categories.map((category:CategoryIcon, index:number) => (
                    <div
                        key={index}
                        onClick={()=> handleOnClick(index)}
                    >
                        <CategoryIconComponent
                            media={category.media}
                            title={category.title}
                        />
                    </div>
                ))}
            </section>

            {/*End Card Categories */}
            <section>
                <div className="mb-[24px] flex">
                    <SearchInput/>
                    <DropDownButtonComponent/>
                </div>
            </section>

            {/*Start list card Event */}
            <section className="mt-[36px]">
                <h2 lang={"eng"} className="ml-[106px] text-heading-two-eng text-iDonate-navy-primary">Kid
                    Clean Water
                </h2>
                {/* List Organization Cards Start */}
                <section className="mx-[100px] my-[44px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[44px]">
                        <CommonEventCard events={eventData}/>
                    </div>
                </section>
                {/* List Organization Cards End */}
                <div lang={"eng"} className="flex flex-wrap justify-end my-[24px] mr-[100px]">
                    <Button
                        className="w-[147px] h-[50px] rounded-[15px] text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-primary hover:text-iDonate-green-secondary hover:bg-iDonate-navy-primary">
                        Show More
                    </Button>
                </div>
            </section>
            {/*End list card Event */}

            {/*Start list card Event */}
            <section className="mt-[36px]">
                <h3 lang={"eng"} className="ml-[106px] text-heading-two-eng text-iDonate-navy-primary">Kid
                    Education
                </h3>

                {/* List Organization Cards Start */}
                <section className="mx-[100px] my-[44px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[44px]">
                        <CommonEventCard events={eventData}/>
                    </div>
                </section>
                {/* List Organization Cards End */}
                <div lang={"eng"} className="flex flex-wrap justify-end my-[24px] mr-[100px]">
                    <Button
                        className="w-[147px] h-[50px] rounded-[15px] text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-primary hover:text-iDonate-green-secondary hover:bg-iDonate-navy-primary">
                        Show More
                    </Button>
                </div>
            </section>
            {/*End list card Event */}

            {/*Start list card Event */}
            <section className="mt-[36px]">
                <h3 lang={"eng"} className="ml-[106px] text-heading-two-eng text-iDonate-navy-primary">Kid
                    Healthy Food
                </h3>

                {/* List Organization Cards Start */}
                <section className="mx-[100px] my-[44px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[44px]">
                        <CommonEventCard events={eventData}/>
                    </div>
                </section>
                {/* List Organization Cards End */}
                <div lang={"eng"} className="flex flex-wrap justify-end my-[24px] mr-[100px]">
                    <Button
                        className="w-[147px] h-[50px] rounded-[15px] text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-primary hover:text-iDonate-green-secondary hover:bg-iDonate-navy-primary">
                        Show More
                    </Button>
                </div>
            </section>
            {/*End list card Event */}

            {/*Start list card Event */}
            <section className="mt-[36px]">
                <h3 lang={"eng"} className="ml-[106px] text-heading-two-eng text-iDonate-navy-primary">Kid
                    Medical Care
                </h3>

                {/* List Organization Cards Start */}
                <section className="mx-[100px] my-[44px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[44px]">
                        <CommonEventCard events={eventData}/>
                    </div>
                </section>
                {/* List Organization Cards End */}
                <div lang={"eng"} className="flex flex-wrap justify-end my-[24px] mr-[100px]">
                    <Button
                        className="w-[147px] h-[50px] rounded-[15px] text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-primary hover:text-iDonate-green-secondary hover:bg-iDonate-navy-primary">
                        Show More
                    </Button>
                </div>
            </section>
            {/*End list card Event */}
        </>
    );
}