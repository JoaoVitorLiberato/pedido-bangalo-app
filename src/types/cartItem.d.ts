import { ITypesComplements } from "./complement";

export interface ITypesItemsCart {
  id: string | number;
  name: string;
  price: {
    default: number,
    discount: {
      status: boolean,
      percentage: number
    }
  };
  quantity: number;
  total: number;
  differences: {
    [key:string]: {
      status: boolean;
      value: number;
      readonly: boolean;
    }
  };
  complements: ITypesComplements[];
}
