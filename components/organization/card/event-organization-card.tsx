import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, Trash2 } from "lucide-react";
import Image from "next/image";
import {Toolbar} from "@/components/filter/toolbar";
import { OrganizationEventType } from "@/difinitions/dto/Organization-event";

interface OrganizationEventCardProps {
    events: OrganizationEventType[];
    searchKey: string;
    filters: {
      key: string;
      title: string;
      options: { label: string; value: string }[];
    }[];
    dateField: string; // The date field for dynamic date filtering
    onFilterChange: (filters: Record<string, any>) => void;
  }


export function OrganizationEventCard({
    events,
    searchKey,
    filters,
    dateField,
    onFilterChange,
  }: OrganizationEventCardProps){
          return (
              <>
                  <Toolbar
                      searchKey={searchKey}
                      onFilterChange={onFilterChange}
                      filters={filters}
                      dateField={dateField}
                  />
                  {events.map((item, index) => {
                      return (
                          <Card key={index}
                                className="w-full h-[440px] bg-iDonate-white-space rounded-lg shadow-[1px_1px_1px_3px_rgba(0,0,0,0.03)] border p-7 flex flex-col gap-6 border-iDonate-navy-accent">
                              <CardContent lang="en"
                                           className="p-0 pb-4 font-inter flex flex-row items-center justify-between border-b-[2px] border-dashed border-b-iDonate-navy-primary">
                                  <Button
                                      className="text-xl font-normal bg-transparent hover:bg-iDonate-navy-accent text-iDonate-error rounded-lg">
                                      <Trash2 className="fill-iDonate-error w-9 h-9"
                                              style={{width: '25px', height: '25px'}}/>
                                      Delete Event
                                  </Button>

                                  <Button
                                      className="text-xl font-normal bg-transparent hover:bg-iDonate-navy-accent text-iDonate-navy-primary rounded-lg">
                                      <Share2 className="fill-iDonate-navy-primary"
                                              style={{width: '25px', height: '25px'}}/>
                                      Share Event
                                  </Button>
                              </CardContent>

                              <div className="flex gap-6">
                                  <CardContent className="p-0 w-[300px] h-[300px] rounded-lg">

                                      <Image width={300} height={300}
                                             src={item.image || "https://i.pinimg.com/236x/a9/9e/ff/a99eff25eb1ba71647fcd884c15c035a.jpg"}
                                             alt={item.title} className="w-full h-full object-cover rounded-lg"/>

                                  </CardContent>

                                  <div className="flex flex-col flex-1 justify-between h-full min-h-0">
                                      <CardContent className="p-0 flex flex-col gap-4 flex-grow">
                                          <CardTitle className="text-3xl font-medium text-iDonate-navy-secondary p-0">
                                              {item.title}
                                          </CardTitle>

                                          <CardDescription
                                              className="text-xl leading-loose text-iDonate-navy-secondary p-0 overflow-hidden">
                                              {item.description}
                                          </CardDescription>
                                      </CardContent>

                                      <CardContent lang="en" className="p-0 flex gap-9 items-end flex-grow">
                                          <div className="flex flex-col gap-2">
                                              <CardTitle
                                                  className="text-lg font-inter font-normal text-iDonate-green-primary p-0">
                                                  Order Date
                                              </CardTitle>
                                              <CardDescription
                                                  className="text-xl font-inter text-iDonate-navy-primary p-0">
                                                  {item.order_date}
                                              </CardDescription>
                                          </div>

                                          <div className="flex flex-col gap-2">
                                              <CardTitle
                                                  className="text-lg font-inter font-normal text-iDonate-green-primary p-0">
                                                  End Date
                                              </CardTitle>
                                              <CardDescription
                                                  className="text-xl font-inter text-iDonate-navy-primary p-0">
                                                  {item.end_date}
                                              </CardDescription>
                                          </div>

                                          <div className="flex flex-col gap-2">
                                              <CardTitle
                                                  className="text-lg font-inter font-normal text-iDonate-green-primary p-0">
                                                  Raised
                                              </CardTitle>
                                              <CardDescription
                                                  className="text-xl font-inter text-iDonate-navy-primary p-0">
                                                  ${item.total_raised}
                                              </CardDescription>
                                          </div>
                                      </CardContent>
                                  </div>
                              </div>
                          </Card>
                      )
                  })}
              </>
          );
      }