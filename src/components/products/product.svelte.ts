import { http } from "@core/http"

interface Category 
{
    id: number
    name: string
}

interface Product
{
    id: number
    name: string
    priceUnit: number | string
    stock: number
    categoryId?: number
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
        const products = await http.get<Product[]>(`${import.meta.env.PUBLIC_API_URL}/products`);
        this.products = products.map((product) =>
        (
            {
                ...product,
                priceUnit: typeof product.priceUnit === 'string' ? Number(product.priceUnit) : product.priceUnit,
            }
        ));
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
        if (data.stock !== undefined) data.stock = Number(data.stock);
        if (data.categoryId !== undefined) 
        {
            if (data.categoryId === '')
            {
                data.categoryId = null;
            }
            else
            {
                data.categoryId = Number(data.categoryId);
            }
        }

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
        if (data.stock !== undefined) data.stock = Number(data.stock);
        if (data.categoryId !== undefined) 
        {
            if (data.categoryId === '')
            {
                delete data.categoryId;
            }
            else
            {
                data.categoryId = Number(data.categoryId);
            }
        }

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