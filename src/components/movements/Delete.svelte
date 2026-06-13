<script lang="ts">

    let { movementModel } = $props();

</script>

{#if movementModel.deleteDialog}

    <dialog
        open={movementModel.deleteDialog}
        class="w-full h-full fixed top-0 left-0 flex items-center bg-transparent justify-center backdrop-blur-xl"
    >

        <div class="bg-white p-4 rounded-md w-96">

            <button
                aria-label="Cerrar"
                class="close"
                onclick={() => (movementModel.deleteDialog = false)}
            >

                ❌ 
            
            </button>

            <div class="p-4">

                <h2 class="text-lg font-bold">

                    Desea eliminar el movimiento
                    {movementModel.movement?.product?.name ? `(${movementModel.movement.product.name})` : ''}?

                </h2>

            </div>

            <div class="p-2 flex justify-end gap-2 mt-3">

                <button
                    class="bg-red-400 text-white px-4 py-2 rounded-md"
                    onclick={() => (movementModel.deleteDialog = false)}
                >

                    Cancelar

                </button>

                <button
                    class="bg-blue-400 text-white px-4 py-2 rounded-md"
                    onclick={() => movementModel.deleteMovement(movementModel.movement?.id ?? 0)}
                >

                    Eliminar

                </button>

            </div>

        </div>

    </dialog>

{/if}