import { http } from "@core/http"

interface Category {
    id: number
    name: string
}

interface Product
{
    id: number
    name: string
    priceUnit: number
    categoryId: number
    category?: Category
}

class ProductModel
{
    product = $state<Product | null>(null)
    products = $state<Product[]>([])
    categories = $state<Category[]>([])
    deleteDialog = $state(false);
    editDialog = $state(false);
    createDialog = $state(false);

    async getProducts()
    {
        this.products = await http.get<Product[]>(`${import.meta.env.PUBLIC_API_URL}/products`);
    }

    async getCategories()
    {
        this.categories = await http.get<Category[]>(`${import.meta.env.PUBLIC_API_URL}/categories`);
    }

    async deleteProduct(id: number)
    {
        await http.delete<Product>(`${import.meta.env.PUBLIC_API_URL}/products/${id}`);
        this.getProducts();
        this.deleteDialog = false;
    }

    async editProduct(id: number, e: Event)
    {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData) as any;

        if (data.priceUnit !== undefined) data.priceUnit = Number(data.priceUnit);
        if (data.categoryId !== undefined) data.categoryId = Number(data.categoryId);

        await http.patch<Product>(`${import.meta.env.PUBLIC_API_URL}/products/${id}`, data);
        this.getProducts();
        this.editDialog = false;
    }

    async createProduct(e: Event)
    {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData) as any;

        if (data.priceUnit !== undefined) data.priceUnit = Number(data.priceUnit);
        if (data.categoryId !== undefined) data.categoryId = Number(data.categoryId);

        await http.post<Product>(`${import.meta.env.PUBLIC_API_URL}/products`, data);
        this.getProducts();
        this.createDialog = false;
    }

    async showCreateModal()
    {
        this.product = null;
        await this.getCategories();
        this.createDialog = true;
    }

    async showEditModal(product: Product)
    {
        this.product = product;
        await this.getCategories();
        this.editDialog = true;
    }

    showDeleteModal(product: Product)
    {
        this.product = product;
        this.deleteDialog = true;
    }
}

export const productModel = new ProductModel();