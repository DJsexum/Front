<script lang="ts">
    import Create from './Create.svelte';
    import { movementModel } from './movements.svelte';
    import { onMount } from 'svelte';

    function pad(value: number) {
        return String(value).padStart(2, '0');
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    }

    onMount(async () =>
    {
        await movementModel.getMovements();
    });
</script>

<Create {movementModel} />

<div class="w-full flex justify-end mb-4">
    <button class="bg-gray-800 text-xl text-white px-2 py-1 rounded-md border-white" onclick={() => movementModel.showCreateModal()}>
        ➕
    </button>
</div>

<table class="flex-1 w-full">
    <thead>
        <tr>
            <th class="bg-gray-800 text-white text-left p-2">Fecha</th>
            <th class="bg-gray-800 text-white text-left p-2">Producto</th>
            <th class="bg-gray-800 text-white text-center p-2">Usuario</th>
            <th class="bg-gray-800 text-white text-center p-2">Tipo</th>
            <th class="bg-gray-800 text-white text-center p-2">Cantidad</th>
            <th class="bg-gray-800 text-white text-center p-2">Precio unitario</th>
            <th class="bg-gray-800 text-white text-center p-2">Total</th>
        </tr>
    </thead>
    <tbody>
        {#each movementModel.movements as movement}
            <tr class="odd:bg-gray-100 dark:odd:bg-gray-700">
                <td class="px-2 py-1 text-left">{formatDate(movement.date)}</td>
                <td class="px-2 py-1 text-left">{movement.product.name}</td>
                <td class="px-2 py-1 text-center">{movement.user.fullName}</td>
                <td class="px-2 py-1 text-center">{movement.type === 'IN' ? 'Entrada' : 'Salida'}</td>
                <td class="px-2 py-1 text-center">{movement.amount}</td>
                <td class="px-2 py-1 text-center">${typeof movement.priceUnit === 'string' ? Number(movement.priceUnit).toFixed(2) : movement.priceUnit.toFixed(2)}</td>
                <td class="px-2 py-1 text-center">${((typeof movement.priceUnit === 'string' ? Number(movement.priceUnit) : movement.priceUnit) * movement.amount).toFixed(2)}</td>
            </tr>
        {/each}
    </tbody>
</table>
