<script lang="ts">

    import Delete from "./Delete.svelte";
    import Edit from "./Edit.svelte";
    import Create from "./Create.svelte";
    import { categoryModel } from "./category.svelte";
    import { onMount } from "svelte";

    onMount(async () => 
    {
        await categoryModel.getCategories();
    });

</script>

<Delete {categoryModel} />
<Edit {categoryModel} />
<Create {categoryModel} />

<div class="w-full flex justify-end mb-4">

    <button class="bg-gray-800 text-xl text-white px-2 py-1 rounded-md border-white" onclick={() => categoryModel.showCreateModal()}>

        ➕

    </button>

</div>

<table class="flex-1 w-full">

    <thead>

        <tr>

            <th class="bg-gray-800 text-white text-left p-2">Nombre</th>
            <th class="bg-gray-800 text-white p-2">Acciones</th>

        </tr>

    </thead>

    <tbody>

        {#each categoryModel.categories as category}

            <tr class="odd:bg-gray-100 dark:odd:bg-gray-700">

                <td class="px-2 py-1 flex items-center gap-2">
                    <button
                        class="text-xl font-bold"
                        aria-label="Expandir productos"
                        onclick={() => categoryModel.toggleCategoryProducts(category.id)}
                    >
                        {categoryModel.expandedCategoryIds.includes(category.id) ? '▾' : '▸'}
                    </button>
                    {category.name}
                </td>
                <td class="px-2 py-1">

                    <div class="flex justify-center gap-2">

                        <button
                            onclick={() => categoryModel.showEditModal(category)}
                            aria-label="Editar"
                            class="bg-gray-800 text-white px-4 rounded-md"
                        >

                            Editar

                        </button>

                        <button
                            onclick={() => categoryModel.showDeleteModal(category)}
                            aria-label="Eliminar"
                            class="bg-red-500 text-white px-4 rounded-md"
                        >

                            Eliminar

                        </button>

                    </div>

                </td>

            </tr>

            {#if categoryModel.expandedCategoryIds.includes(category.id)}
                <tr class="bg-gray-50 dark:bg-gray-800">
                    <td colspan="2" class="px-4 py-3">
                        <div class="border border-gray-200 dark:border-gray-700 rounded-md p-3 bg-white dark:bg-gray-900">
                            <h3 class="text-sm font-semibold mb-2">Productos en {category.name}</h3>
                            {#if categoryModel.getProductsByCategory(category.id).length === 0}
                                <p class="text-sm text-gray-600 dark:text-gray-300">No hay productos en esta categoría.</p>
                            {:else}
                                <table class="w-full text-sm">
                                    <thead>
                                        <tr>
                                            <th class="text-left p-2">Nombre</th>
                                            <th class="text-center p-2">Stock</th>
                                            <th class="text-center p-2">Precio unitario</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#each categoryModel.getProductsByCategory(category.id) as product}
                                            <tr class="odd:bg-gray-100 dark:odd:bg-gray-700">
                                                <td class="px-2 py-1">{product.name}</td>
                                                <td class="px-2 py-1 text-center">{product.stock}</td>
                                                <td class="px-2 py-1 text-center">${typeof product.priceUnit === 'string' ? Number(product.priceUnit).toFixed(2) : product.priceUnit.toFixed(2)}</td>
                                            </tr>
                                        {/each}
                                    </tbody>
                                </table>
                            {/if}
                        </div>
                    </td>
                </tr>
            {/if}

        {/each}

    </tbody>

</table>