
// Page Detail
import HeroSectionCategoryComponent from "@/components/events/categories/categorydetail/HeroSectionCategoryComponent";
import CategoryDetailComponent from "@/components/events/categories/categorydetail/CategoryDetailComponent";

export default function Page(){
    return (
        <>
            {/*Start Hero Section*/}
            <section>
                <HeroSectionCategoryComponent/>
            </section>
            {/*End Hero Section*/}
            {/*content */}

            <section>
                <CategoryDetailComponent/>
            </section>
        </>
    )
}
