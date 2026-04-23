export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface Product {
    id: string;
    title: string;
    description: string | null;
    price: number;
    image_url: string | null;
    slug: string;
    can_ship: boolean | null;
}
