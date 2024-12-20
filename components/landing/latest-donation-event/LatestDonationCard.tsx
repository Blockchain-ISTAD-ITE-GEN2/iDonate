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
}

const donationCards: DonationCard[] = [
  {
    id: "1",
    image: FamilyTwo.src,
    title: "ប្រាក់សំរាប់កុមារ",
    description: "ផ្តល់ការអប់រំពេលចេញពីសាលាដល់កុមារនៅក្នុងតំបន់ដាច់ស្រយាល",
    donors: 1.2,
    amount: 1000.0,
  },
  {
    id: "2",
    image: FamilyOne.src,
    title: "ខ្ញុំនឹងជួយផង",
    description: "កុមារនឹងទទួលបានអាហារពេលចូលនិងថ្នាំពេទ្យពេលឈឺទៀតផង",
    donors: 1.2,
    amount: 1000.0,
  },
  {
    id: "3",
    image: FamilyThree.src,
    title: "បច្ចុប្បន្នសុខភាពសហគមន៍",
    description: "ផ្តល់ឱកាសដល់សិស្សក្រីក្រឱ្យកូនៗពួកគេទៅសាលារៀន",
    donors: 1.2,
    amount: 1000.0,
  },
];

export default function LatestDonationCard() {
  return (
        
    <div className="w-full">
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
                  1.2 ពាន់នាក់បរិច្ចាគ
                </span>
              </div>
              <div className="text-xl font-semibold text-iDonate-navy-primary">
                $1000.00
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
        {/* Grid of Cards */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-[100px] pb-8 mb-2 "
          lang="km"
        >
          {donationCards.map((card) => (
            <Card
              key={card.id}
              className="overflow-hidden text-iDonate-navy-primary"
            >
              <div className="relative h-64">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={500}
                  height={300}
                  className="absolute inset-0 w-full h-full object-cover"
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
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-iDonate-navy-primary" />
                    <span className="khmer-font">
                      {card.donors} ការផ្តល់ជំនួយ
                    </span>
                  </div>
                  <span className="font-semibold flex gap-1 ">
                    <span>
                      <CircleDollarSign size={16} />
                    </span>
                    {card.amount.toFixed(2)}
                  </span>
                </div>
                <Button className="w-full bg-iDonate-green-primary hover:bg-[#22c55e] text-[#1e2c49] font-semibold">
                  {/* <div className="p-1 rounded-full bg-iDonate-navy-primary items-center flex justify-center">
                    <Heart className=" h-4 w-4 text-white" />
                  </div> */}
                  Donate Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
