export interface ProductOption {
  optionName: string;
  value: string | number;
}

export enum Gender {
  Mujer = "Mujer",
  Hombre = "Hombre",
  Nino = "Niño",
}

export enum Marca {
  Adidas = "Adidas",
  Vans = "Vans",
  Nike = "Nike",
  Reebok = "Reebok",
  Timberland = "Timberland",
}

export enum State {
  Active = "Active",
  Inactive = "Inactive",
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  gender?: Gender;
  brand?: Marca;
  photo?: string;
  status: State;
  categoryId?: string;
  createdAt: Date;
  updatedAt: Date;
}
