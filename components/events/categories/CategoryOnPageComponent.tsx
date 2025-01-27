"use client";

import OrganizationDetailHeroSection from "@/components/herosection/OrganizationDetailHeroSection";
import { CategoryType } from "@/difinitions/types/components-type/CategoryType";
import CategoryCardComponent from "./CategoryCardComponent";
import { useGetCategoriesQuery } from "@/redux/services/category-service";
import CategoryWithEventComponent from "./CategoryWithEventComponent";

export default function CategoryOnPageComponent() {
  const {
    data: apiReponseCategory = { content: [] },
    isLoading: isLoadingCategory,
  } = useGetCategoriesQuery({});

  // Extract the array of categories from the response
  const categories: CategoryType[] = apiReponseCategory.content || [];

  // Debugging logs
  console.log(" =====> Categories Data : ", categories);

  return (
    <section className="flex flex-col gap-9 mb-5">
      {/* Hero Section Start */}
      <OrganizationDetailHeroSection />

      {/* Start Card Categories */}
      <div className="w-full px-6 md:px-12 lg:px-24 space-y-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <CategoryCardComponent />
        </div>
      </div>

<<<<<<< HEAD
      {/* List Card Events */}
      {isLoadingCategory ? (
        <p></p>
      ) : (
        apiReponseCategory.map((category:any) => (
          <CategoryWithEventComponent key={category.uuid} category={category} />
        ))
      )}
    </section>
  );
}
=======
            {/*Start list card Event */}
            <section className="mt-[36px]  mx-[100px]">
                <h2 lang={"eng"} className="text-heading-two-eng text-iDonate-navy-primary  md:flex md:items-center md:justify-center  lg:flex lg:tems-center lg:justify-start ">
                    Clean Water
                </h2>
                {/* List Organization Cards Start */}
                <section className="flex items-center justify-center my-[44px]">
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
            <section className="mt-[36px] mx-[100px]">
                <h2 lang={"eng"}
                    className="text-heading-two-eng text-iDonate-navy-primary  md:flex md:items-center md:justify-center  lg:flex lg:tems-center lg:justify-start ">
                    Education
                </h2>

                {/* List Organization Cards Start */}
                <section className="my-[44px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[44px]">
                        <CommonEventCard events={eventData}/>
                    </div>
                    {/* List Organization Cards End */}
                    <div lang={"eng"} className="flex flex-wrap justify-end my-[24px] mr-[100px]">
                        <Button
                            className="w-[147px] h-[50px] rounded-[15px] text-medium-eng text-iDonate-navy-primary bg-iDonate-white-space border-2 border-iDonate-navy-primary hover:text-iDonate-green-secondary hover:bg-iDonate-navy-primary">
                            Show More
                        </Button>
                    </div>
                </section>

            </section>
            {/*End list card Event */}

            {/*Start list card Event */}
            <section className="mt-[36px] mx-[100px]">
                <h2 lang={"eng"}
                    className="text-heading-two-eng text-iDonate-navy-primary  md:flex md:items-center md:justify-center  lg:flex lg:tems-center lg:justify-start ">
                    Healthy Food
                </h2>

                {/* List Organization Cards Start */}
                <section className="my-[44px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[44px]">
                        <CommonEventCard events={eventData}/>
                    </div>
                </section>
                {/* List Organization Cards End */}
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
            <section className="mt-[36px] mx-[100px]">
                <h2 lang={"eng"}
                    className="text-heading-two-eng text-iDonate-navy-primary  md:flex md:items-center md:justify-center  lg:flex lg:tems-center lg:justify-start ">
                    Medical Care
                </h2>

                {/* List Organization Cards Start */}
                <section className="my-[44px]">
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
>>>>>>> 8978653 (fix categories page responsive)
