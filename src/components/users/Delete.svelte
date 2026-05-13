<script lang="ts">

    let { userModel } = $props();

</script>

{#if userModel.deleteDialog}

    <dialog open={userModel.deleteDialog} class="w-full h-full fixed top-0 left-0 flex items-center bg-transparent justify-center backdrop-blur-xl">

        <div class="bg-white p-4 rounded-md w-96">

            <button aria-label="Cerrar" class="close" onclick={() => (userModel.deleteDialog = false)}>
                
                ❌
            
            </button>

            <div class="p-4">

                <h2 class="text-lg font-bold">

                    Desea eliminar al usuario {userModel.user.username}?

                </h2>

            </div>

        </div>

    </dialog>

{/if}