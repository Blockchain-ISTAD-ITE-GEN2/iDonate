'use client'
import {OrganizationCardComponent} from "@/components/events/organization-event/OrganizationCardComponent";
import {SearchInput} from "@/components/ui/SearchInput";
import OrganizationCarouseHerosection from "@/components/herosection/OrganizationCarouseHerosection";
import {DropDownButtonComponent} from "@/components/dropdown-button/DropDownButtonComponent";
import {useRouter} from "next/navigation";
import {OrganizationParam} from "@/difinitions/types/media/organization";
import {Button} from "@/components/ui/button";

// const OrganizationCarouseHerosection = dynamic(() => import("@/components/herosection/OrganizationCarouseHerosection"), { ssr: false });

// json data for testing
const organizationData = [
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ISTnNfD0aD2BShZNw3_VmxokXpB7kryEg&s",
        title: "Cambodia Kantha Bopha Foundation",
        description: "មូលនិធិកម្ពុជា គន្ធបុប្ផា គឺជាស្ថាប័នដែលមានបំណង ផ្តល់សេវាសុខាភិបាលដោយឥតគិតថ្លៃដល់កុមារខ្សត់ខ្សោយនៅទូទាំងប្រទេសកម្ពុជា។ ដោយផ្តោតលើការថែទាំសុខភាពដែលមាន"
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw6MAAOLgnKKemUTNtx2BWXrqPRmFsulj02A&s",
        title: "Cambodia Kantha Bopha Foundation",
        description: "មូលនិធិកម្ពុជា គន្ធបុប្ផា គឺជាស្ថាប័នដែលមានបំណង ផ្តល់សេវាសុខាភិបាលដោយឥតគិតថ្លៃដល់កុមារខ្សត់ខ្សោយនៅទូទាំងប្រទេសកម្ពុជា។ ដោយផ្តោតលើការថែទាំសុខភាពដែលមាន"
    },
    {
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo_of_Cambodian_Red_Cross.svg/1024px-Logo_of_Cambodian_Red_Cross.svg.png",
        title: "Cambodia Kantha Bopha Foundation",
        description: "មូលនិធិកម្ពុជា គន្ធបុប្ផា គឺជាស្ថាប័នដែលមានបំណង ផ្តល់សេវាសុខាភិបាលដោយឥតគិតថ្លៃដល់កុមារខ្សត់ខ្សោយនៅទូទាំងប្រទេសកម្ពុជា។ ដោយផ្តោតលើការថែទាំសុខភាពដែលមាន"
    },
    {
        image: "https://newhopeforcambodianchildren.org/wp-content/uploads/2016/12/nhcclogowtrans.png",
        title: "Cambodia Kantha Bopha Foundation",
        description: "មូលនិធិកម្ពុជា គន្ធបុប្ផា គឺជាស្ថាប័នដែលមានបំណង ផ្តល់សេវាសុខាភិបាលដោយឥតគិតថ្លៃដល់កុមារខ្សត់ខ្សោយនៅទូទាំងប្រទេសកម្ពុជា។ ដោយផ្តោតលើការថែទាំសុខភាពដែលមាន"
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw6MAAOLgnKKemUTNtx2BWXrqPRmFsulj02A&s",
        title: "Cambodia Kantha Bopha Foundation",
        description: "មូលនិធិកម្ពុជា គន្ធបុប្ផា គឺជាស្ថាប័នដែលមានបំណង ផ្តល់សេវាសុខាភិបាលដោយឥតគិតថ្លៃដល់កុមារខ្សត់ខ្សោយនៅទូទាំងប្រទេសកម្ពុជា។ ដោយផ្តោតលើការថែទាំសុខភាពដែលមាន"
    },
    {
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo_of_Cambodian_Red_Cross.svg/1024px-Logo_of_Cambodian_Red_Cross.svg.png",
        title: "Cambodia Kantha Bopha Foundation",
        description: "មូលនិធិកម្ពុជា គន្ធបុប្ផា គឺជាស្ថាប័នដែលមានបំណង ផ្តល់សេវាសុខាភិបាលដោយឥតគិតថ្លៃដល់កុមារខ្សត់ខ្សោយនៅទូទាំងប្រទេសកម្ពុជា។ ដោយផ្តោតលើការថែទាំសុខភាពដែលមាន"
    },
    {
        image: "https://newhopeforcambodianchildren.org/wp-content/uploads/2016/12/nhcclogowtrans.png",
        title: "Cambodia Kantha Bopha Foundation",
        description: "មូលនិធិកម្ពុជា គន្ធបុប្ផា គឺជាស្ថាប័នដែលមានបំណង ផ្តល់សេវាសុខាភិបាលដោយឥតគិតថ្លៃដល់កុមារខ្សត់ខ្សោយនៅទូទាំងប្រទេសកម្ពុជា។ ដោយផ្តោតលើការថែទាំសុខភាពដែលមាន"
    },
    {
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Logo_of_Cambodian_Red_Cross.svg/1024px-Logo_of_Cambodian_Red_Cross.svg.png",
        title: "Cambodia Kantha Bopha Foundation",
        description: "មូលនិធិកម្ពុជា គន្ធបុប្ផា គឺជាស្ថាប័នដែលមានបំណង ផ្តល់សេវាសុខាភិបាលដោយឥតគិតថ្លៃដល់កុមារខ្សត់ខ្សោយនៅទូទាំងប្រទេសកម្ពុជា។ ដោយផ្តោតលើការថែទាំសុខភាពដែលមាន"
    }
];


export default function OrganizationOnPageComponent() {

    // router to the detail
    const router = useRouter();

    // handle card click
    const handleCardClick = (id:number) => {
        // router.push(`/organizations/${id}`);
        router.push(`/organizations/${id}`);
        console.log(id);
    }
    return (
        <>
            {/* Start Hero  Section */}
            <section >
                <div className="flex justify-center gap-4 mb-[24px]">
                    <OrganizationCarouseHerosection/>
                    {/*<OrganizationHeroSection/>*/}
                </div>
            </section>
            {/*End Hero Section */}

            {/*Start List Organization Section */}
            {/*static data */}
            <section>
                <div lang={"km"} className="flex justify-center gap-4 mb-[24px] ">
                    <h2 className="text-2xl font-semibold text-iDonate-navy-primary">
                        អង្កការភាពដែលបាន ចូលរួមជាមួយពួកយើង
                    </h2>
                </div>

                <div className="mb-[24px] flex">
                    <SearchInput/>
                    <DropDownButtonComponent/>
                </div>
                <div>

                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-[24px]">
                    {organizationData.map((org: OrganizationParam, index: number) => (
                        <div
                            key={index}
                            onClick={() => handleCardClick(index)}
                        >
                            <OrganizationCardComponent
                                image={org.image}
                                title={org.title}
                                description={org.description}
                            />
                        </div>
                    ))}
                </div>

                <div lang={"eng"} className="flex flex-wrap justify-end my-[24px] mr-[106px]">
                    <Button
                        className="w-[305px] h-[50px] rounded-[15px] text-medium-eng text-idonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-primary hover:text-iDonate-green-secondary hover:bg-iDonate-navy-primary">
                        Show More Organization
                    </Button>
                </div>

            </section>
            {/*End List Organization  Section */}
        </>
    );
}