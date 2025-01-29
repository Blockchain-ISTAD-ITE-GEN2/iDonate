import { OrganizationResponse } from "./OrganizationType";
import {OrganizationEventType} from "@/difinitions/dto/Organization-event";

export type EventRequest = {
  name: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
};

export type EventResponse = {
  uuid: string;
  name: string;
  description: string;
  isVisible: boolean;
  organization: OrganizationResponse;
};


// export type EventType = {
//   image: string;
//   title: string;
//   description: string;
//   total_amount: number;
//   total_donor: number;
//   date?: string;
//   key?: number;
//   category?: string;
// };


export type EventType = {
  uuid?:string;
  name: string;
  description: string;
  startDate:string;
  endDate:string; 
  total_amount: number;
  total_donor: number;
  // date?: string;
  key?: number;
  category?: {
    name:string;
  };
  organization?:OrganizationEventType;
  images: string[];
};


interface EventTTT {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  category: {
    name: string;
  };
  images: string[];
}