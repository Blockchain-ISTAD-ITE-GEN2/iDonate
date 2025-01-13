import { OrganizationDetail } from "@/components/events/organization-event/detail-event/Organization-card-detail";
import OrganizationDetailHeroSection from "@/components/herosection/OrganizationDetailHeroSection";

import { SearchPage } from "@/components/search/SearchOnPageComponent";

export default function Page() {

  return (
    <section className="flex flex-col gap-9 py-9 justify-center">
      {/*Start Hero Section*/}
      <OrganizationDetailHeroSection />

      <OrganizationDetail />
    </section>
  );
}


// sample
//
// import { Metadata } from 'next';
//
// type Props = {
//     params: { id: string };
// };
//
// // Dynamic metadata for individual organization details
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//     const organizationName = params.id.charAt(0).toUpperCase() + params.id.slice(1); // Capitalize the first letter
//     return {
//         title: `${organizationName} - iDonate`,
//         description: `Learn more about ${organizationName}, its mission, and how you can contribute to making a difference.`,
//         keywords: ['iDonate', 'Organization', 'Nonprofit', organizationName, 'Charity'],
//         openGraph: {
//             title: `${organizationName} - iDonate`,
//             description: `Get involved with ${organizationName} on iDonate and support their mission.`,
//             url: `https://yourwebsite.com/organizations/${params.id}`,
//             images: [
//                 {
//                     url: `https://yourwebsite.com/static/organizations/${params.id}-banner.jpg`,
//                     width: 1200,
//                     height: 630,
//                     alt: `${organizationName} Banner`,
//                 },
//             ],
//             type: 'website',
//         },
//         twitter: {
//             card: 'summary_large_image',
//             title: `${organizationName} - iDonate`,
//             description: `Learn about the ${organizationName} organization and how you can support their cause.`,
//             images: [`https://yourwebsite.com/static/organizations/${params.id}-banner.jpg`],
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
//             canonical: `https://yourwebsite.com/organizations/${params.id}`,
//             languages: {
//                 en: `https://yourwebsite.com/organizations/${params.id}`,
//                 km: `https://yourwebsite.com/kh/organizations/${params.id}`,
//             },
//         },
//     };
// }
//
// export default function OrganizationDetailPage({ params }: Props) {
//     const organizationName = params.id.charAt(0).toUpperCase() + params.id.slice(1); // Capitalize the first letter
//
//     return (
//         <main>
//             <h1>{organizationName}</h1>
//             <p>Welcome to the {organizationName} page. Learn more about this organization's mission, initiatives, and how you can support them.</p>
//             <section>
//                 <h2>About {organizationName}</h2>
//                 <p>This organization is dedicated to making a positive impact in the community by supporting various causes. They focus on education, health, and environmental issues.</p>
//             </section>
//             <section>
//                 <h2>Get Involved</h2>
//                 <p>Here are the ways you can contribute:</p>
//                 <ul>
//                     <li>Donate directly to their causes</li>
//                     <li>Volunteer your time</li>
//                     <li>Spread awareness through social media</li>
//                 </ul>
//             </section>
//         </main>
//     );
// }
