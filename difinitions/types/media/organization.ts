export type OrganizationParam = {
  image: string | ""; 
  name: string; 
  description: string;
  key?: number | string;
  address?: string;
};

export type EventTypeParam = {
  image: string;
  title: string;
  description: string;
  total_amount: number;
  total_donor: number;
};
