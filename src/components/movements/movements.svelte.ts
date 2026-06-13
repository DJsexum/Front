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

export enum MovementType {
    IN = "INGRESO",
    OUT = "EGRESO",
}

interface Movement {
    id: number;
    date: string;
    type: 'IN' | 'OUT';
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

    // ✅ NUEVO: eliminación
    deleteDialog = $state(false);
    movement = $state<Movement | null>(null);

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

    // ✅ NUEVO: abrir modal de delete
    async showDeleteModal(movement: Movement) {
        this.movement = movement;
        this.deleteDialog = true;
    }

    // ✅ NUEVO: ejecutar delete
    async deleteMovement(id: number) {
        if (!id) return;
        await http.delete<Movement>(`${import.meta.env.PUBLIC_API_URL}/movements/${id}`);
        await this.getMovements();
        this.deleteDialog = false;
        this.movement = null;
    }
}

export const movementModel = new MovementModel();