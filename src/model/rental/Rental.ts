export type Id = number;

export interface Product {
  productId: Id;
  name: string;
  price: number;
  description: string;
}

export interface ProductImage {
  productId: Id;
  imageId: Id;
  url: string;
  alt: string;
}

export interface Category {
  categoryId: Id;
  name: string;
  description: string;
}

export interface Package {
  packageId: Id;
  name: string;
  description: string;
  percentDiscount: number;
}
