import { Category, Id, Package, Product, ProductImage } from "@model/index.ts";

type IdJoiner = Record<Id, Id[]>;

export class RentalStore {
  private categories: Category[];
  private products: Product[];
  private images: ProductImage[];
  private packages: Package[];

  private categoryProducts: Record<Id, Product[]>;
  private productImages: Record<Id, ProductImage[]>;
  private packageProducts: Record<Id, Product[]>;
  private categoryPackages: Record<Id, Package[]>;

  constructor(
    categories: Category[],
    products: Product[],
    images: ProductImage[],
    packages: Package[],
    categoryProducts: IdJoiner, // products in categories
    productImages: IdJoiner, // images for products
    packageProducts: IdJoiner, // products in packages
    categoryPackages: IdJoiner // packages in categories
  ) {
    this.categories = categories;
    this.products = products;
    this.images = images;
    this.packages = packages;

    const createIdMap = <T>(items: T[], idKey: keyof T): Record<Id, T> => {
      return items.reduce((map, item) => {
        map[item[idKey] as Id] = item;
        return map;
      }, {} as Record<Id, T>);
    };

    const createJoiner = <T>(joiner: IdJoiner, idMap: Record<Id, T>) => {
      return Object.keys(joiner).reduce((acc, id) => {
        acc[+id] = joiner[+id].map((id) => idMap[id]);
        return acc;
      }, {} as Record<Id, T[]>);
    };

    const idToProduct = createIdMap(products, "productId");
    const idToImage = createIdMap(images, "imageId");
    const idToPackage = createIdMap(packages, "packageId");

    this.categoryProducts = createJoiner(categoryProducts, idToProduct);
    this.productImages = createJoiner(productImages, idToImage);
    this.packageProducts = createJoiner(packageProducts, idToProduct);
    this.categoryPackages = createJoiner(categoryPackages, idToPackage);
  }

  getCategories() {
    return this.categories;
  }

  getCategoryProducts(categoryId: Id) {
    return this.categoryProducts[categoryId];
  }

  getPackageProducts(packageId: Id) {
    return this.packageProducts[packageId];
  }

  getCategoryPackages(categoryId: Id) {
    return this.categoryPackages[categoryId];
  }

  getProductImages(productId: Id) {
    return this.productImages[productId];
  }
}
