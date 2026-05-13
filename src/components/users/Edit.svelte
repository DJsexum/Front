<script lang="ts">

    let { userModel } = $props();
    let id = $props.id();

</script>

{#if userModel.editDialog}

    <div class="w-full text-black h-full fixed top-0 left-0 flex flex-col items-center bg-transparent justify-center backdrop-blur-xl">

        <div class="w-96 bg-white p-4 rounded-md">

            <form>

                <h2 class="text-lg font-bold">

                    Editar Usuario

                </h2>

                <hr>

                <div class="p-2 flex flex-col">

                    <label for="username" class="block text-sm font-bold">
                        
                        Nombre de Usuario:

                    </label>

                    <input 
                        class="border border-gray-400 rounded-md p-2" 
                        placeholder="Ingrese el nombre de usuario" 
                        type="text" 
                        id={`username-${id}`} 
                        name="username" 
                        value={userModel.user.username}
                    />

                </div>

                <div class="p-2 flex flex-col">
                    
                    <label for="email" class="block text-sm font-bold">

                        Correo Electronico:

                    </label>

                    <input 
                        class="border border-gray-400 rounded-md p-2" 
                        placeholder="Ingrese el correo electronico" 
                        type="email" 
                        id={`email-${id}`} 
                        name="email" value={userModel.user.email}
                    />

                </div>

            </form>

                <button aria-label="Cerrar" class="close" onclick={() => (userModel.editDialog = false)}>
                    
                    Cerrar
                
                </button>

        </div>

    </div>

{/if}