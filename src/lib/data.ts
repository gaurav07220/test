
import type { Product, Category, User, Order, Discount } from './definitions';
import placeholderData from './placeholders/all-products.json';

export const categories: Category[] = [
    { id: 'cat-1', name: 'Fruits & Vegetables' },
    { id: 'cat-2', name: 'Dairy & Eggs' },
    { id: 'cat-3', name: 'Bakery' },
    { id: 'cat-4', name: 'Meat & Fish' },
    { id: 'cat-5', name: 'Pantry' },
    { id: 'cat-6', name: 'Snacks' },
];

export const products: Product[] = placeholderData.products.map(p => ({
    ...p,
    price: parseFloat(p.price)
}));


export const users: User[] = [
    {
        id: 'user-1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'customer',
    },
    {
        id: 'user-2',
        name: 'Bob Smith',
        email: 'store@blinkit.com',
        role: 'store',
        storeId: 'store-1',
    },
    {
        id: 'user-3',
        name: 'Charlie Brown',
        email: 'admin@blinkit.com',
        role: 'admin',
    },
];

export const orders: Order[] = [
    {
        id: 'order-1',
        userId: 'user-1',
        date: new Date('2023-10-26T10:00:00Z'),
        status: 'Delivered',
        total: 22.48,
        items: [
            { product: products[0], quantity: 2, price: products[0].price },
            { product: products[1], quantity: 1, price: products[1].price },
        ],
        shippingAddress: {
            street: '123 Main St',
            city: 'Anytown',
            zip: '12345'
        }
    },
    {
        id: 'order-2',
        userId: 'user-1',
        date: new Date('2023-10-27T14:30:00Z'),
        status: 'Processing',
        total: 5.49,
        items: [
            { product: products[4], quantity: 1, price: products[4].price },
        ],
        shippingAddress: {
            street: '123 Main St',
            city: 'Anytown',
            zip: '12345'
        }
    },
    {
        id: 'order-3',
        userId: 'user-1',
        date: new Date('2023-10-28T09:00:00Z'),
        status: 'Shipped',
        total: 12.98,
        items: [
            { product: products[2], quantity: 1, price: products[2].price },
            { product: products[6], quantity: 1, price: products[6].price },
        ],
        shippingAddress: {
            street: '123 Main St',
            city: 'Anytown',
            zip: '12345'
        }
    },
    {
        id: 'order-4',
        userId: 'user-2',
        date: new Date('2023-10-29T11:00:00Z'),
        status: 'Delivered',
        total: 7.99,
        items: [
            { product: products[5], quantity: 1, price: products[5].price },
        ],
        shippingAddress: {
            street: '456 Oak Ave',
            city: 'Someville',
            zip: '67890'
        }
    },
];

export const discounts: Discount[] = [
    {
        id: 'disc-1',
        code: 'SUMMER10',
        percentage: 10,
        isActive: true,
    },
    {
        id: 'disc-2',
        code: 'FALL20',
        percentage: 20,
        isActive: false,
    },
    {
        id: 'disc-3',
        code: 'WELCOME15',
        percentage: 15,
        isActive: true,
    }
];
