<script lang="ts">
    let { providerModel } = $props();
    let id = $props.id();
</script>

{#if providerModel.editDialog}
    <div class="w-full text-black h-full fixed top-0 left-0 flex flex-col items-center bg-transparent justify-center backdrop-blur-xl">
        <div class="bg-white rounded-md p-4 w-96">
            <form onsubmit={(e) => providerModel.editProvider(providerModel.provider.id, e)}>
                <h2 class="text-lg font-bold">Editar Proveedor</h2>
                <div class="p-2 flex flex-col">
                    <label for="name" class="block text-sm font-bold">Nombre:</label>
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        placeholder="Ingrese el nombre"
                        type="text"
                        id={`name-${id}`}
                        name="name"
                        value={providerModel.provider.name}
                    />
                </div>
                <div class="p-2 flex flex-col">
                    <label for="phone" class="block text-sm font-bold">Teléfono:</label>
                    <input
                        class="border border-gray-400 rounded-md p-2"
                        placeholder="Ingrese el teléfono"
                        type="text"
                        id={`phone-${id}`}
                        name="phone"
                        value={providerModel.provider.phone}
                    />
                </div>
                <div class="p-2 flex flex-col">
                    <label for="additionalInfo" class="block text-sm font-bold">Información adicional (opcional):</label>
                    <textarea
                        class="border border-gray-400 rounded-md p-2"
                        placeholder="Ingrese información adicional (opcional)"
                        id={`additionalInfo-${id}`}
                        name="additionalInfo"
                    >{providerModel.provider.additionalInfo}</textarea>
                </div>
                <div class="p-2 flex justify-end gap-2 mt-3">
                    <button
                        class="bg-red-400 text-white px-4 py-2 rounded-md"
                        onclick={() => (providerModel.editDialog = false)}
                    >
                        Cancelar
                    </button>
                    <button class="bg-blue-400 text-white px-4 py-2 rounded-md" type="submit">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}