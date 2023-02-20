export interface details {
    subTitle: string,
    info: string

}
export interface products {
    id: number | string | undefined,
    title: string,
    price: number,
    description?: string,
    category?: string,
    image: string,
    rating?: {
        rate?: number,
        count?: number,
    },
    code?: string,
    quantity?: number,
    details?: details[],
    color?: string,
    images?: string[],
    sizes?: number[],
    date?: string,
    availableQuantity?: number
}
export interface ProductColumn {
    id: 'title' | 'image' | 'category' | 'price';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}
export interface CategoryColumn {
    id: 'category';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}
export interface category {
    id?: string,
    category?: string
}