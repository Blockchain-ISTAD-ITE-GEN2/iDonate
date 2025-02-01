export type OrganizationParam = {
  uuid?:string | undefined | null;
  image: string | "";
  name: string; 
  description: string;
  key?: number | string;
  address?: string;
  onClick: () => void;
};

export type EventTypeParam = {
  image: string;
  title: string;
  description: string;
  total_amount: number;
  total_donor: number;
};
