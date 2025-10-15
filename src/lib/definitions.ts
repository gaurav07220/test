
export type Role = 'customer' | 'store' | 'admin';

export type User = {
    id: string;
    name: string;
    email: string;
    role: Role;
    storeId?: string;
};

export type ImagePlaceholder = {
    id: string;
    description: string;
    imageUrl: string;
    imageHint: string;
};

export type Category = {
    id: string;
    name: string;
};

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: ImagePlaceholder;
    categoryId: string;
    storeId: string;
    inventory: number;
};

export type CartItem = Product & {
    quantity: number;
};

export type Address = {
    street: string;
    city: string;
    zip: string;
    country?: string;
};

export type OrderItem = {
    product: Product;
    quantity: number;
    price: number; // Price at time of order
};

export type Order = {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    date: Date;
    shippingAddress: Address;
};
