
export interface Product {
    id: number;
    name: string;
    barcode: number;
    description?: string;
    type: 'Fruit' | 'Vegetable' | 'Field' | '0';
    date: Date;
    createdBy: string;
}