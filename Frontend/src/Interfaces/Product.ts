export enum ProductType {
    Fruit = 1,
    Vegetable = 2,
    Field = 3 //field crops
}


export interface Product {
    id: string;
    name: string;
    barcode: number;
    description?: string;
    type: ProductType;
    date: Date;
}