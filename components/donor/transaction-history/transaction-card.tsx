import { Toolbar } from "@/components/filter/toolbar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { TransactionType } from "@/difinitions/types/table-type/transaction"
import { Share2, TableOfContents, Trash2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

type TransactionHistoryCardProps = {
    transactions: TransactionType[];
    searchKey: string;
    filtersFace: {
      key: string;
      title: string;
      options: { label: string; value: string }[];
    }[];
    filtersDateRange: {
      key: string;
      title: string
    }[];
}
  
export function TransactionHistoryCard({
    transactions,
    searchKey,
    filtersFace,
    filtersDateRange,
  }: TransactionHistoryCardProps) {
      const [filteredtransactions, setFilteredtransactions] = useState<TransactionType[]>(transactions);
  
      useEffect(() => {
          setFilteredtransactions(transactions); // Reset filtered transactions whenever `transactions` prop changes
        }, [transactions]);
        
  
    return (
      <>
        <Toolbar
          events={transactions}
          filtersFace={filtersFace}
          searchKey={searchKey}
          onFilterChange={setFilteredtransactions}
          filtersDateRange={filtersDateRange}
        />
        <div className="flex flex-1 flex-wrap gap-6">
            {filteredtransactions.map((item, index) => (
          <Card
            key={index}
            className="flex-1 bg-iDonate-white-space rounded-lg shadow-[1px_1px_1px_3px_rgba(0,0,0,0.03)] border p-7 flex flex-col gap-6 border-iDonate-navy-accent"
          >
            <CardContent
              lang="en"
              className="p-0 pb-4 font-inter flex flex-row items-center justify-between border-b-[2px] border-dashed border-b-iDonate-navy-primary"
            >
              <Button className="text-xl font-normal bg-transparent hover:bg-iDonate-navy-accent text-iDonate-navy-primary rounded-lg">
                <TableOfContents
                  className="fill-iDonate-navy-primary"
                  style={{ width: "25px", height: "25px" }}
                />
                View Event
              </Button>
  
              <Button className="text-xl font-normal bg-transparent hover:bg-iDonate-navy-accent text-iDonate-navy-primary rounded-lg">
                <Share2
                  className="fill-iDonate-navy-primary"
                  style={{ width: "25px", height: "25px" }}
                />
                Share Event
              </Button>
            </CardContent>
  
            <div className="flex gap-6">
              <CardContent className="p-0 w-auto h-auto rounded-lg">
                <Image
                  width={300}
                  height={300}
                  src={
                    item.image ||
                    "https://i.pinimg.com/236x/a9/9e/ff/a99eff25eb1ba71647fcd884c15c035a.jpg"
                  }
                  alt={item.event}
                  className="w-full h-full object-cover rounded-lg"
                />
              </CardContent>
  
              <div className="flex flex-col flex-1 justify-between h-full">
                <CardContent className="p-0 flex flex-col gap-4 flex-grow">
                  <CardTitle className="text-3xl font-medium text-iDonate-navy-secondary p-0">
                    {item.event}
                  </CardTitle>
  
                  <CardDescription className="text-xl leading-loose text-iDonate-navy-secondary p-0 overflow-hidden">
                    {item.description || "កុមាររាល់គ្នាស្ថិតក្នុងសិទ្ធិសមស្របក្នុងការរស់នៅក្នុងបរិយាកាសដ៏សុវត្ថិភាពនិងការអភិរក្សសិទ្ធិរបស់ពួកគេ ដោយមានក្តីមេត្តាករុណា និងការទទួលស្គាល់សម្លេងរបស់ពួកគេ។ ដោយគាំទ្រដល់ការដឹកនាំដែលផ្តោតលើសុវត្ថិភាព ការអប់រំ និងសុខុមាលភាពនៃកុមារ យើងអាចបង្កើតពិភពលោកដែលកុមារទាំងអស់អាចរីកចម្រើនដោយគ្មានការភ័យខ្លាច ឬការគំរាមកំហែង។"}
                  </CardDescription>
                </CardContent>
  
                <CardContent lang="en" className="p-0 flex gap-9 items-end flex-grow">
                  <div className="flex flex-col gap-2">
                    <CardTitle className="text-lg font-inter font-normal text-iDonate-green-primary p-0">
                      Order Date
                    </CardTitle>
                    <CardDescription className="text-xl font-inter text-iDonate-navy-primary p-0 whitespace-nowrap">
                      {item.order_date || "12 September 2024"}
                    </CardDescription>
                  </div>
  
                  <div className="flex flex-col gap-2">
                    <CardTitle className="text-lg font-inter font-normal text-iDonate-green-primary p-0">
                      End Date
                    </CardTitle>
                    <CardDescription className="text-xl font-inter text-iDonate-navy-primary p-0 whitespace-nowrap">
                      {item.end_date || "12 September 2025"}
                    </CardDescription>
                  </div>
  
                  <div className="flex flex-col gap-2">
                    <CardTitle className="text-lg font-inter font-normal text-iDonate-green-primary p-0">
                      Raised
                    </CardTitle>
                    <CardDescription className="text-xl font-inter text-iDonate-navy-primary p-0">
                      ${item.amount}
                    </CardDescription>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
        </div>
        
      </>
    );
  }