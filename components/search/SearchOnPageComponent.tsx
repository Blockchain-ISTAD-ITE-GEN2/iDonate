"use client"
import {SearchBar} from "@/components/search/SearchBar";
import { CalendarInput } from "./CalendarInput";
import { CommonEventCard } from "../events/organization-event/CommonEventCad";
import { Button } from "react-day-picker";
import { EventTypeParam } from "@/difinitions/types/media/organization";
import { ArrowRight ,AlignLeft} from "lucide-react";
import {GetMostDonationCardComponent} from "@/components/search/GetMostDonationCardComponent";
import {FitterType} from "@/components/search/FitterType";
import {FitterOrganization} from "@/components/search/FitterOrganization";


export  default  function SearchOnPageComponent(){

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

    // Correct the type to EventTypeParam[]
    const mostDonation: EventTypeParam[] = [
        {
            "image": "https://media.istockphoto.com/id/547404780/photo/local-students-in-cambodia.jpg?s=612x612&w=0&k=20&c=e5bAh7pAa87T2eKj1XJ9PgaMztkImfSVS4UAwb8zF-o=",
            "title": "គ្រោងស្នូល ដើម្បីជួយកុមារកំព្រានៅក្នុងសហគមន៍",
            "description": "ជួយសិស្សដែលមានការខ្វះខាតសម្ភារសិក្សា និងអាហារូបករណ៍។ គម្រោងនេះផ្តោតទៅលើការផ្តល់ឱកាសសិក្សាទូលំទូលាយដល់កុមារក្រីក្រ។ វាមិនត្រឹមតែជាសម្ភារៈសិក្សា ប៉ុន្តែការបណ្តុះបណ្តាលគំនិតអវិជ្ជមាន និងជម្រុញការពង្រឹងជីវភាពសង្គម។",
            "total_donor": 120,
            "total_amount": 5000
        },
        {
            "image": "https://borgenproject.org/wp-content/uploads/Education-for-Children-in-Cambodia.jpg",
            "title": "ជួយសិស្សក្រីក្រដែលមានអនាគតភ្លឺស្រងាត់",
            "description": "ផ្តល់សម្ភារសិក្សា និងការបណ្តុះបណ្តាលសម្រាប់កុមារក្នុងតំបន់ជ្រុំជ្រៅ។ គម្រោងនេះសម្របសម្រួលការជំរុញការសិក្សាក្នុងសហគមន៍ដោយសហការជាមួយសាលារៀន និងស្ថាប័ន។ វាមានគោលបំណងលើកស្ទួយអនាគតកុមារតាមរយៈការផ្តល់អាហារូបករណ៍ និងដំណោះស្រាយបញ្ហាប្រចាំថ្ងៃ។",
            "total_donor": 95,
            "total_amount": 3000
        },
        {
            "image": "https://onechild.org/wp-content/uploads/2021/02/Breaking-the-Cycle-smiling-girl.jpg",
            "title": "គម្រោងអប់រំកុមារក្នុងសហគមន៍ឃ្លាំងឃ្លាត",
            "description": "ជួយបង្កើតផ្ទះសិក្សា និងផ្តល់ការគាំទ្រជីវភាពរបស់កុមារក្រីក្រ។ គម្រោងនេះមិនត្រឹមតែផ្តោតលើការអប់រំប៉ុណ្ណោះទេ ប៉ុន្តែមានការចូលរួមរបស់សហគមន៍។ វាជាកន្លែងបង្រៀនបច្ចេកទេស និងសមត្ថភាពថ្មីៗសម្រាប់កុមារដែលអាចក្លាយជាកម្លាំងសំខាន់សម្រាប់សហគមន៍។",
            "total_donor": 150,
            "total_amount": 7000
        },
        {
            "image": "https://www.worldvision.org.sg/sites/default/files/blog/w055-0274-031_medium_res.jpg",
            "title": "ស្នូលសហគមន៍ដើម្បីកុមារមានកំលាំងចិត្ត",
            "description": "ផ្តោតលើការរៀបចំវគ្គបណ្តុះបណ្តាល និងការពង្រឹងសុខភាពផ្លូវចិត្ត។ គម្រោងនេះនឹងបង្កើនភាពជឿជាក់ និងសុខុមាលភាពផ្លូវចិត្តរបស់កុមារ។ វាមានការផ្តោតលើការផ្ដល់ជំនួយផ្នែកវិជ្ជាជីវៈជាសមាហរណៈ និងកាត់បន្ថយបញ្ហាដែលបណ្តាលមកពីភាពក្រីក្រ។",
            "total_donor": 110,
            "total_amount": 4500
        },
        {
            "image": "https://www.asiadreamtours.com/wp-content/uploads/2019/08/cambodia-children.jpg",
            "title": "ការងាររួមចំណែកដើម្បីលើកស្ទួយអនាគតកុមារ",
            "description": "អភិវឌ្ឍសេដ្ឋកិច្ចសហគមន៍ និងការគាំទ្រការបណ្តុះបណ្តាលបឋម។ គម្រោងនេះផ្ដោតលើការផ្លាស់ប្តូរជីវភាពកុមារក្រីក្រ និងជម្រុញការរីកចម្រើនសហគមន៍។ វាជាឱកាសល្អក្នុងការចូលរួមជួយសង្គ្រោះកុមារនិងបង្កើតបរិយាកាសថ្មីសម្រាប់ការរស់នៅ។",
            "total_donor": 140,
            "total_amount": 6000
        }
    ];

    return (
        <section className="">
            {/* Start search section title and descirpotin  */}
            <section className="my-[36px]">
                <div className="flex items-center justify-center">
                    <h2 lang={"km"} className="text-iDonate-navy-primary text-heading-two-khmer">
                        ស្វែករក កម្មវិធីបរិច្ចាគដែលអ្នកពេញចិត្ត
                    </h2>
                </div>
                <div className="flex items-center justify-center">
                    <p lang={"km"} className="text-iDonate-navy-primary text-medium-khmer">
                        ស្វែករកម្មបវិធី វៃអង្គាសដោយ ឈ្មោះនៃអង្កការភាព​ ប្រភេទ និង កាលបរិច្ឆេទ្នាំនៃកម្មវិធី
                    </p>
                </div>
            </section>
            {/*End search section title and description  */}

            {/*Start  search bar select data type and organization */}
            <section className="mb-[36px]">
                <div className="flex flex-cols">
                    <SearchBar/>
                    <CalendarInput/>
                    <FitterType/>
                    <FitterOrganization/>
                </div>
            </section>
            {/*End search bar select data type and organization */}

            {/*Start Most Donate */}
            <section className="mx-[100px]">
                <div className="">
                    <h2
                        lang={"km"}
                        className="text-iDonate-navy-primary text-heading-two-khmer mb-[16px]"
                    >កម្មវិធី កំពង់ទទួលបានការបរិច្ចាគច្រើន</h2>
                </div>

                <div>
                    <GetMostDonationCardComponent
                        events={mostDonation}
                    />
                </div>
            </section>

            {/*End Most Donate */}

            {/* Start close to goal  */}
            <section className="mt-[36px]">
                <h3 lang={"eng"} className="ml-[106px] text-heading-two-eng text-iDonate-navy-primary">
                    Close to Goal
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
                        className="flex items-center justify-center gap-[8px] w-[170px] h-[50px] rounded-[15px] text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-primary hover:text-iDonate-green-secondary hover:bg-iDonate-navy-primary">
                        Show More
                        <ArrowRight className="w-[12px] h-[12px]" />
                    </Button>
                </div>

            </section>
            {/* End Cloast to goal  */}
        </section>
    )
}
