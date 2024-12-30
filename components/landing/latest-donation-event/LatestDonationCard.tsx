"use client";

import { Heart, User, Users, CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import FamilyImage from "@/public/landing/LateDonation.jpg";
import FamilyOne from "@/public/images/Group 4630.png";
import FamilyTwo from "@/public/images/image (7).png";
import FamilyThree from "@/public/images/image (8).png";

interface DonationCard {
  id: string;
  image: string;
  title: string;
  description: string;
  donors: number;
  amount: number;
  isCurrent?: boolean;
}

const donationCards: DonationCard[] = [
  {
    id: "1",
    image: FamilyTwo.src,
    title: "ប្រាក់សំរាប់កុមារ",
    description: "ផ្តល់ការអប់រំពេលចេញពីសាលាដល់កុមារនៅក្នុងតំបន់ដាច់ស្រយាល",
    donors: 1.2,
    amount: 1000,
    isCurrent: false,
  },
  {
    id: "2",
    image: FamilyOne.src,
    title: "ជួយខ្ញុំផង",
    description: "កុមារនឹងទទួលបានអាហារពេលចូលនិងថ្នាំពេទ្យពេលឈឺទៀតផង",
    donors: 1.2,
    amount: 1000,
    isCurrent: false,
  },
  {
    id: "3",
    image: FamilyThree.src,
    title: "សុខភាពសហគមន៍បច្ចុប្បន្ន",
    description: "ផ្តល់ឱកាសដល់សិស្សក្រីក្រឱ្យកូនៗពួកគេទៅសាលារៀន",
    donors: 1.2,
    amount: 1000,
    isCurrent: false,
  },
];

export default function LatestDonationCard() {
  const currentDonations = donationCards.filter((card) => card.isCurrent);

  return (
    <div className="w-full bg-transparent flex flex-col gap-6">
      {/* Hero Section */}
      <Card className="p-0 m-0 h-auto border-none grid lg:grid-cols-2 ">
          {/* Image Section */}
          <div className="relative min-h-[500px]">
            <Image
              src={FamilyImage}
              fill
              alt="Community support image"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="p-9 bg-iDonate-navy-primary text-iDonate-white-space flex flex-grow flex-col gap-4">
            <h2 lang="km" className="text-title-khmer md:text-heading-one-khmer font-semibold leading-relaxed">
                កិច្ចប្រឹងប្រែងការពារសេរីភាព និងសិទ្ធិរបស់កុមារ
            </h2>

            <p lang="km" className="flex-1 text-description-khmer md:text-medium-khmer leading-relaxed">
              កុមារទាំងនេះត្រូវការជំនួយក្នុងការការពារសេរីភាពនិងសិទ្ធិរបស់កុមារ
              និងជួយធ្វើឱ្យពួកគេរស់នៅក្នុងសង្គម។ វាជាការលំបាកណាស់ដែលប្រឈមសេរីភាពរបស់កុមារគ្រប់ៗគ្នា។
            </p>

            <div lang="km" className="p-4 bg-iDonate-navy-accent rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {/* <Users className="h-4 w-4 text-iDonate-navy-primary" /> */}
                <span className=" text-iDonate-navy-primary">
                  អ្នកបរិច្ចាគ: 1.2 ពាន់នាក់
                </span>
              </div>

              <div className="text-iDonate-navy-primary">
                ​​ទឹកប្រាក់ទទួលបាន: $100
              </div>
            </div>

            <Button className=" w-full bg-iDonate-green-secondary hover:bg-iDonate-green-primary text-iDonate-navy-primary font-semibold">
              Donate Now
            </Button>
          </div>
      </Card>

      {/* Current Donations Section */}
      <div className="w-full flex flex-col gap-2">
        <h2 lang="km" className="text-heading-two-khmer text-iDonate-navy-primary khmer-font text-center">
          បច្ចុប្បន្នភាពនៃការបរិច្ចាគ
        </h2>

        {currentDonations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
            {currentDonations.map((card) => (
              <Card
                key={card.id}
                className="overflow-hidden text-iDonate-navy-primary p-4"
              >
                <div className="relative h-64">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={5000}
                    height={5000}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg khmer-font">
                      {card.title}
                    </h3>
                    <p className="text-sm text-iDonate-navy-secondary khmer-font mt-1">
                      {card.description}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between text-sm gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-iDonate-navy-primary" />
                      <span className="khmer-font">
                        អ្នកបរិច្ចាគ៖ {card.donors} ពាន់នាក់
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <CircleDollarSign size={16} />
                      <span className="khmer-font">
                        ទឹកប្រាក់ទទួលបាន៖​​ ${card.amount}
                      </span>
                    </span>
                  </div>
                  <Button className="w-full bg-iDonate-green-primary hover:bg-[#22c55e] text-[#1e2c49] font-semibold">
                    បរិច្ចាគឥឡូវនេះ
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center w-full container mx-auto flex flex-col gap-4">
            <h3 lang="km" className="text-medium-khmer font-medium  text-iDonate-navy-primary khmer-font">
              បច្ចុប្បន្នមិនមានព្រឹត្តិការណ៍បរិច្ចាគទេ
            </h3>
            <p lang="km" className="text-iDonate-gray khmer-font">
              សូមត្រឡប់មកម្តងទៀតនៅពេលក្រោយ ដើម្បីពិនិត្យមើលឱកាសបរិច្ចាគថ្មីៗ។ អរគុណសម្រាប់ការគាំទ្ររបស់អ្នក!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}