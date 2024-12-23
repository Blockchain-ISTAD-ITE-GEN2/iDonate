import Image from "next/image";
import {CommonEventCard} from "@/components/events/organization-event/CommonEventCad";
import {Button} from "@/components/ui/button";
import {EventTypeParam} from "@/difinitions/types/media/organization";
import {AccordionCategory} from "@/components/events/categories/categorydetail/AccordionCategory";
import {AllCategoriesButton} from "@/components/events/categories/categorydetail/AllCategoriesAccordion";


export  default  function CategoryDetailComponent (){

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
        }];

    return (
        <>
            {/*content */}
            <section className="flex ">
                {/*section to the left */}
                <section className="w-[860px] ml-[100px]">
                    {/*image*/}
                    <div>
                        <Image
                            src="https://www.childfund.org.kh/c/uploads/2020/02/LY9A3560-1.jpg"
                            alt="image"
                            className="rounded-[15px] object-cover"
                            width={860}
                            height={500}
                        />
                    </div>

                    <div>
                        <h1
                            lang="km"
                            className="text-heading-two-khmer text-iDonate-navy-primary max-w-2xl tracking-tight leading-none my-[36px]"
                        >
                            ជួយកុមារសម្រេចអនាគតដ៏ភ្លឺស្វាង
                        </h1>

                        <p
                            lang="km"
                            className="text-iDonate-navy-primary text-description-khmer  leading-7  my-[36px] lg:mb-10 md:text-lg lg:text-xl dark:text-gray-400 line-champ-5 mb-[36px]"
                        >
                            ការបរិច្ចាគរបស់អ្នកគឺមិនមែនគ្រាន់តែជាការផ្តល់អាហារ ឬសម្ភារៈសិក្សាប៉ុណ្ណោះទេ។ វាជាការផ្តល់ឱកាសក្នុងការរីកចម្រើន បង្កើតជីវិតថ្មី និងជួយកុមារជាច្រើនឆ្ពោះទៅរកភាពជោគជ័យ។
                            ការបរិច្ចាគត្រឹមតែបន្តិចអាចធ្វើឱ្យមានការផ្លាស់ប្តូរធំមួយក្នុងជីវិតកុមារ។ ពួកគេនឹងមានសង្ឃឹមថ្មី សញ្ញាសម្តែងនៃភាពស្រស់ស្រាយ និងការរីកចម្រើន។ អ្នកអាចជាម្ចាស់នៃការផ្លាស់ប្តូរនោះ!
                            ចូលរួមជាមួយយើងឥឡូវនេះ ដើម្បីជួយកុមាររបស់សហគមន៍សម្រេចក្តីសុបិន្តរបស់ពួកគេ។ អនាគតរបស់ពួកគេប្រពៅលើការចូលរួមរបស់អ្នក។ <br/><br/>

                            ដោយសារ​អ្នក កុមារជាច្រើននឹងមានអនាគតមួយដ៏ភ្លឺស្វាង និងមានសុភមង្គល។ ការចូលរួមរបស់អ្នកជាផ្នែកសំខាន់ក្នុងការផ្តល់អំណោយនេះ។ កុំឲ្យពេលវេលាចំណាយទៅដោយអ្វីខុសឆ្គង!
                        </p>

                    </div>

                    {/*Start list card Event */}
                    <section className="mt-[36px]">
                        {/* List Organization Cards Start */}
                        <section className="my-[44px]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[44px]">
                                {eventData.map((event, index) => (
                                    <CommonEventCard key={index} event={event} />
                                ))}
                            </div>
                        </section>
                        {/* List Organization Cards End */}
                        <div lang={"eng"} className="flex flex-wrap justify-end my-[24px]">
                            <Button
                                className="w-[147px] h-[50px] rounded-[15px] text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-primary hover:text-iDonate-green-secondary hover:bg-iDonate-navy-primary">
                                Show More
                            </Button>
                        </div>
                    </section>
                    {/*End list card Event */}

                    {/*QA*/}
                    <section>
                        <div className="mb-[36px]">
                            <h1
                                lang="km"
                                className="text-iDonate-navy-primary max-w-2xl text-heading-two-khmer  tracking-tight leading-none md:text-[36px] xl:text-[36px] dark:text-white"
                            >
                                អត្ថប្រយោជន៍
                            </h1>
                        </div>

                        <div className="mb-[36px]">
                            <AccordionCategory/>
                        </div>
                    </section>
                </section>


                {/*section to the right */}
                <section className="mx-[36px]">
                    <AllCategoriesButton/>
                </section>
            </section>


        </>
    )
}