import { http } from '@core/http';

interface Product {
    id: number;
    name: string;
    stock: number;
    priceUnit: number | string;
}

interface User {
    id: number;
    fullName: string;
}

interface Movement {
    id: number;
    type: 'IN' | 'OUT';
    date: string;
    amount: number;
    priceUnit: number | string;
    product: Product;
    user: User;
}

export interface MovementItem {
    productId: number;
    amount: number;
}

class MovementModel {
    movements = $state<Movement[]>([]);
    products = $state<Product[]>([]);
    users = $state<User[]>([]);
    createDialog = $state(false);

    async getMovements() {
        const movements = await http.get<Movement[]>(`${import.meta.env.PUBLIC_API_URL}/movements`);
        this.movements = movements.map((movement) =>
        (
            {
                ...movement,
                priceUnit: typeof movement.priceUnit === 'string' ? Number(movement.priceUnit) : movement.priceUnit,
                amount: Number(movement.amount),
            }
        ));
    }

    async getProducts() {
        this.products = await http.get<Product[]>(`${import.meta.env.PUBLIC_API_URL}/products`);
    }

    async getUsers() {
        this.users = await http.get<User[]>(`${import.meta.env.PUBLIC_API_URL}/users`);
    }

    async createMovement(data: { type: 'IN' | 'OUT'; userId: number; items: MovementItem[] }) {
        await http.post<Movement[]>(`${import.meta.env.PUBLIC_API_URL}/movements`, data);
        await this.getMovements();
        this.createDialog = false;
    }

    async showCreateModal() {
        await this.getProducts();
        await this.getUsers();
        this.createDialog = true;
    }
}

export const movementModel = new MovementModel();
