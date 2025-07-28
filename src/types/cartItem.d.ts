import { ITypesComplements } from "./complement";

export interface ITypesItemsCart {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  total: number;
  differences: {
    status: boolean;
    value: boolean;
  };
  complements: ITypesComplements[];
}
