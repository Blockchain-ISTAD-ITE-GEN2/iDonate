"use client";

import { Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import FamilyImage from "@/public/images/family-photo.png";
import { Users } from "lucide-react";
import { CircleDollarSign } from "lucide-react";
import FamilyOne from "@/public/images/Group 4630.png"
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
    isCurrent: true
  },
  {
    id: "2",
    image: FamilyOne.src,
    title: "ជួយខ្ញុំផង",
    description: "កុមារនឹងទទួលបានអាហារពេលចូលនិងថ្នាំពេទ្យពេលឈឺទៀតផង",
    donors: 1.2,
    amount: 1000,
    isCurrent: true
  },
  {
    id: "3",
    image: FamilyThree.src,
    title: "សុខភាពសហគមន៍បច្ចុប្បន្ន",
    description: "ផ្តល់ឱកាសដល់សិស្សក្រីក្រឱ្យកូនៗពួកគេទៅសាលារៀន",
    donors: 1.2,
    amount: 1000,
    isCurrent: true
  },
];

export default function LatestDonationCard() {
  const currentDonations = donationCards.filter(card => card.isCurrent);
  return (
        
    <div className="w-full lg:px-[100px] md:px-4 px-4 bg-transparent">
      <Card className="overflow-hidden border border-none">
        <div className="grid lg:grid-cols-2 gap-0 ">
          {/* Image Section */}
          <div className="relative h-[300px] lg:h-[500px]">
            <Image
              src={FamilyImage}
              alt="Community support image"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="p-6 bg-[#1e2c49] text-white flex flex-col gap-4">
            <div className="space-y-2">
              <h2
                className="text-2xl font-semibold leading-tight khmer-font"
                lang="km"
              >
                កិច្ចប្រឹងប្រែងកុមារការពារសេរីភាព
              </h2>
              <h3 className="text-xl font-medium khmer-font" lang="km">
                និងសិទ្ធិរបស់កុមារ
              </h3>
            </div>

            <p
              className="text-sm opacity-90 khmer-font leading-relaxed"
              lang="km"
            >
              កុមារទាំងនេះត្រូវការជំនួយការពារសេរីភាពនិងសិទ្ធិរបស់កុមារ
              និងជួយធ្វើឱ្យពួកគេរស់នៅក្នុងសង្គម។
              <br />
              វាជាការលំបាកណាស់ដែលប្រឈមសេរីភាពរបស់កុមារគ្រប់ៗគ្នា។
            </p>

            <div
              className="mt-4 p-4 bg-iDonate-navy-accent rounded-lg flex items-center justify-between"
              lang="km"
            >
              <div className="flex items-center gap-2">
                <div className="text-iDonate-navy-primary">
                  <Users className="h-4 w-4" />
                </div>
                <span className="khmer-font text-iDonate-navy-primary">
                  អ្នកបរិច្ចាគ៖ 1.2 ពាន់នាក់                </span>
              </div>
              <div className=" text-iDonate-navy-primary">
              ​​ទឹកប្រាក់ទទួលបាន៖ $100
              </div>
            </div>

            <Button className="mt-4 w-full bg-iDonate-green-primary hover:bg-[#22c55e] text-[#1e2c49] font-semibold">
              {/* <div className="p-2 rounded-full bg-iDonate-navy-primary items-center flex justify-center">
                <Heart className=" h-4 w-4 text-white" />
              </div> */}
              Donate Now
            </Button>
          </div>
        </div>
        
      </Card>

      {/* current donation */}
   
      <div className="w-full md:px-4 lg:px-0 py-8 " lang="km">
  <h2 className="text-2xl mb-6 text-iDonate-navy-primary khmer-font text-center">
    បច្ចុប្បន្នភាពនៃការបរិច្ចាគ
  </h2>

  {currentDonations.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {currentDonations.map((card) => (
        <Card key={card.id} className="overflow-hidden text-iDonate-navy-primary ">
          <div className="relative h-64">
            <Image
              src={card.image}
              alt={card.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-lg khmer-font">{card.title}</h3>
              <p className="text-sm text-iDonate-navy-secondary khmer-font mt-1">
                {card.description}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-iDonate-navy-primary" />
                <span className="khmer-font">
                  អ្នកបរិច្ចាគ៖ {card.donors} ពាន់នាក់
                </span>
              </div>
              <span className="flex items-center gap-1">
                <CircleDollarSign size={16} />
                <span className="khmer-font">ទឹកប្រាក់ទទួលបាន៖​​ ${card.amount}</span>
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
    <Card className=" p-8 text-center w-full">
      <h3 className="text-xl font-semibold mb-4 text-iDonate-navy-primary khmer-font">
        បច្ចុប្បន្នមិនមានព្រឹត្តិការណ៍បរិច្ចាគទេ
      </h3>
      <p className="text-iDonate-navy-secondary khmer-font">
        សូមត្រឡប់មកម្តងទៀតនៅពេលក្រោយ ដើម្បីពិនិត្យមើលឱកាសបរិច្ចាគថ្មីៗ។ អរគុណសម្រាប់ការគាំទ្ររបស់អ្នក!
      </p>
    </Card>
  )}
</div>


    </div>
  );
}
