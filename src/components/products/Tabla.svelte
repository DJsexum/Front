<script lang="ts">

    import Delete from "./Delete.svelte";
    import Edit from "./Edit.svelte";
    import Create from "./Create.svelte";
    import { productModel } from "./product.svelte";
    import { onMount } from "svelte";

    onMount(async () => 
    {
        await productModel.getProducts();
    });

</script>

<Delete {productModel} />
<Edit {productModel} />
<Create {productModel} />

<div class="w-full flex justify-end mb-4">

    <button class="bg-gray-800 text-xl text-white px-2 py-1 rounded-md border-white" onclick={() => productModel.showCreateModal()}>

        ➕

    </button>

</div>

<table class="flex-1 w-full">

    <thead>

        <tr>

            <th class="bg-gray-800 text-white text-left p-2">Nombre</th>
            <th class="bg-gray-800 text-white text-center p-2">Categoría</th>
            <th class="bg-gray-800 text-white text-center p-2">Stock</th>
            <th class="bg-gray-800 text-white text-center p-2">Precio</th>
            <th class="bg-gray-800 text-white text-center p-2">Acciones</th>

        </tr>

    </thead>

    <tbody>

        {#each productModel.products as product}

            <tr class="odd:bg-gray-100 dark:odd:bg-gray-700">

                <td class="px-2 py-1 text-left">{product.name}</td>
                <td class="px-2 py-1 text-center">{product.category?.name ?? 'Sin clase'}</td>
                <td class="px-2 py-1 text-center">{product.stock}</td>
                <td class="px-2 py-1 text-center">${typeof product.priceUnit === 'string' ? Number(product.priceUnit).toFixed(2) : product.priceUnit.toFixed(2)}</td>
                <td class="px-2 py-1">

                    <div class="flex justify-center gap-2">

                        <button
                            onclick={() => productModel.showEditModal(product)}
                            aria-label="Editar"
                            class="bg-gray-800 text-white px-4 rounded-md"
                        >

                            Editar

                        </button>

                        <button
                            onclick={() => productModel.showDeleteModal(product)}
                            aria-label="Eliminar"
                            class="bg-red-500 text-white px-4 rounded-md"
                        >

                            Eliminar

                        </button>

                    </div>

                </td>

            </tr>

        {/each}

    </tbody>

</table>