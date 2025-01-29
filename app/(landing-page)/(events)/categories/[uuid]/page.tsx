// Page Detail
import HeroSectionCategoryComponent from "@/components/events/categories/HeroSectionCategoryComponent";
import CategoryDetailComponent from "@/components/events/categories/CategoryDetailComponent";




export default function Page(props: { params: { uuid: string } }) {


  return (
    <section className="flex flex-col gap-9 justify-center">
      {/*Start Hero Section*/}
      <HeroSectionCategoryComponent />

      <CategoryDetailComponent />
    </section>
  );
}

// import { Metadata } from "next";

// type Props = {
//     params: { id: string };
// };
//
// // Dynamic metadata for individual categories
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//     const categoryName = params.id.charAt(0).toUpperCase() + params.id.slice(1); // Example: Capitalize category name
//     return {
//         title: `${categoryName} - iDonate`,
//         description: `Explore donation opportunities in the ${categoryName} category on iDonate.`,
//         keywords: ['iDonate', categoryName, 'Donation Category', 'Charity Causes', 'Nonprofit Organizations'],
//         openGraph: {
//             title: `${categoryName} - iDonate`,
//             description: `Discover impactful causes and organizations in the ${categoryName} category.`,
//             url: `https://yourwebsite.com/categories/${params.id}`,
//             images: [
//                 {
//                     url: `https://yourwebsite.com/static/categories/${params.id}-banner.jpg`,
//                     width: 1200,
//                     height: 630,
//                     alt: `${categoryName} Banner`,
//                 },
//             ],
//             type: 'website',
//         },
//         twitter: {
//             card: 'summary_large_image',
//             title: `${categoryName} - iDonate`,
//             description: `Find meaningful donation opportunities in the ${categoryName} category.`,
//             images: [`https://yourwebsite.com/static/categories/${params.id}-banner.jpg`],
//         },
//         icons: {
//             icon: '/favicon.ico',
//             apple: '/apple-touch-icon.png',
//         },
//         robots: {
//             index: true,
//             follow: true,
//         },
//         alternates: {
//             canonical: `https://yourwebsite.com/categories/${params.id}`,
//             languages: {
//                 en: `https://yourwebsite.com/categories/${params.id}`,
//                 km: `https://yourwebsite.com/kh/categories/${params.id}`,
//             },
//         },
//     };
// }
//
// export default function CategoryDetailPage({ params }: Props) {
//     const categoryName = params.id.charAt(0).toUpperCase() + params.id.slice(1); // Example: Capitalize category name
//
//     return (
//         <main>
//             <h1>{categoryName} Category</h1>
//             <p>
//                 Welcome to the {categoryName} category on iDonate. Explore verified causes and organizations that fall under this
//                 category.
//             </p>
//             {/* Placeholder for detailed category items */}
//             <ul>
//                 <li>Cause 1 in {categoryName}</li>
//                 <li>Cause 2 in {categoryName}</li>
//                 <li>Cause 3 in {categoryName}</li>
//             </ul>
//         </main>
//     );
// }
//
