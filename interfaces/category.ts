export interface Category {
  id: string;
  position: number;
  name: string;
  parentId?: string;
  children?: Category[];
  createdAt: Date;
  updatedAt: Date;
  //   products: Product[]
}
