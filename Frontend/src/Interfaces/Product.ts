
export interface Product {
    id: number;
    name: string;
    barcode: number;
    description?: string;
    type: 'Fruit'|'Vegetable'|'Field';
    date: Date;
    createdBy: string;
}