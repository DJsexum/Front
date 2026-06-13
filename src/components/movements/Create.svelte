<script lang="ts">
    import { type MovementItem } from './movements.svelte.ts';

    interface Product 
    {
        id: number;
        name: string;
        stock: number;
        priceUnit: number | string;
    }

    let { movementModel } = $props();
    let id = $props.id();

    let userId = $state(0);
    let type = $state<'IN' | 'OUT'>('IN');
    let selectedProductId = $state(0);
    let selectedQuantity = $state(1);
    let items = $state<MovementItem[]>([]);

    function resetForm() 
    {
        userId = 0;
        type = 'IN';
        selectedProductId = 0;
        selectedQuantity = 1;
        items = [];
    }

    function addItem() 
    {
        const productId = Number(selectedProductId);
        const amount = Number(selectedQuantity);

        if (!productId || amount < 1) 
        {
            return;
        }

        const existing = items.find((item) => item.productId === productId);
        if (existing) 
        {
            existing.amount += amount;
        } 
        else 
        {
            items = [...items, { productId, amount }];
        }

        selectedProductId = 0;
        selectedQuantity = 1;
    }

    function removeItem(productId: number) 
    {
        items = items.filter((item) => item.productId !== productId);
    }

    function getProduct(productId: number): Product | undefined 
    {
        return (movementModel.products as Product[]).find((product) => product.id === productId);
    }

    function getItemTotal(item: MovementItem) 
    {
        const product = getProduct(item.productId);
        if (!product) return 0;
        return Number(product.priceUnit) * item.amount;
    }

    function getTotalAmount() 
    {
        return items.reduce((sum, item) => sum + getItemTotal(item), 0);
    }

    async function submitMovement(e: Event) 
    {
        e.preventDefault();
        
        const finalUserId = Number(userId);

        if (!finalUserId || items.length === 0) 
        {
            return;
        }
        
        await movementModel.createMovement({ type, userId: finalUserId, items });
        resetForm();
    }
</script>

{#if movementModel.createDialog}
    <div class="w-full text-black h-full fixed top-0 left-0 flex flex-col items-center bg-transparent justify-center backdrop-blur-xl">
        <div class="bg-white rounded-md p-4 w-96">
            <form onsubmit={submitMovement}>
                <h2 class="text-lg font-bold">Registrar Movimiento</h2>

                <div class="p-2 flex flex-col">
                    <label for="userId-{id}" class="block text-sm font-bold">Usuario:</label>
                    <select class="border border-gray-400 rounded-md p-2" id="userId-{id}" bind:value={userId} required>
                        <option value={0}>Seleccione un usuario</option>
                        {#each movementModel.users as user}
                            <option value={user.id}>{user.fullName}</option>
                        {/each}
                    </select>
                </div>

                <div class="p-2 flex flex-col">
                    <label for="type-{id}" class="block text-sm font-bold">Tipo:</label>
                    <select class="border border-gray-400 rounded-md p-2" id="type-{id}" bind:value={type}>
                        <option value="IN">Entrada</option>
                        <option value="OUT">Salida</option>
                    </select>
                </div>

                <div class="flex flex-col border border-gray-200 rounded-md p-3 mb-3 bg-gray-50">
                    <h3 class="font-semibold mb-2">Agregar productos</h3>
                    <div class="flex flex-col gap-2">
                        <div class="flex gap-2">
                            <select class="border border-gray-400 rounded-md p-2 flex-1" bind:value={selectedProductId}>
                                <option value={0}>Seleccione un producto</option>
                                {#each movementModel.products as product}
                                    <option value={product.id}>{product.name} (stock: {product.stock})</option>
                                {/each}
                            </select>

                            <input
                                class="border border-gray-400 rounded-md p-2 w-24"
                                type="number"
                                min="1"
                                bind:value={selectedQuantity}
                            />
                        </div>

                        <button
                            type="button"
                            class="bg-blue-400 text-white px-4 py-2 rounded-md"
                            onclick={addItem}
                        >
                            Agregar producto
                        </button>
                    </div>
                </div>

                {#if items.length > 0}
                    <div class="p-2 mb-3">
                        <h3 class="font-semibold mb-2">Productos seleccionados</h3>
                        <table class="w-full text-sm border-collapse">
                            <thead>
                                <tr>
                                    <th class="text-left p-2">Producto</th>
                                    <th class="text-center p-2">Cantidad</th>
                                    <th class="text-center p-2">Precio unitario</th>
                                    <th class="text-center p-2">Total</th>
                                    <th class="text-center p-2">Quitar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each items as item}
                                    <tr class="odd:bg-gray-100 dark:odd:bg-gray-700">
                                        <td class="px-2 py-1">{getProduct(item.productId)?.name}</td>
                                        <td class="px-2 py-1 text-center">{item.amount}</td>
                                        <td class="px-2 py-1 text-center">${getProduct(item.productId) ? Number(getProduct(item.productId)?.priceUnit).toFixed(2) : '0.00'}</td>
                                        <td class="px-2 py-1 text-center">${getItemTotal(item).toFixed(2)}</td>
                                        <td class="px-2 py-1 text-center">
                                            <button type="button" class="bg-red-500 text-white px-3 py-1 rounded-md" onclick={() => removeItem(item.productId)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>

                        <div class="text-right font-semibold mt-3">
                            Total: ${getTotalAmount().toFixed(2)}
                        </div>
                    </div>
                {/if}

                <div class="p-2 flex justify-end gap-2 mt-3">
                    <button class="bg-red-400 text-white px-4 py-2 rounded-md" type="button" onclick={() => { movementModel.createDialog = false; resetForm(); }}>
                        Cancelar
                    </button>
                    <button class="bg-blue-400 text-white px-4 py-2 rounded-md" type="submit" disabled={items.length === 0 || userId === 0}>
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}