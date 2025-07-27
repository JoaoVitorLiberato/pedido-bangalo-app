export interface ITypesProducts {
  id: string;
  name: string;
  description: string;
  price: {
    default: number;
    discount: {
      status: boolean;
      percentage: number;
    };
  };
  tumbnail: {
    url: string;
  };
  differences: {
    flambed: {
      readonly: boolean;
      status: boolean;
      value: number;
    };
  };
  note_client: number;
  category: {
    id: string;
    name: string;
    icon: string;
  };
}
