<script lang="ts">

    let { userModel } = $props();
    let id = $props.id();

</script>

{#if userModel.createDialog}

    <div class="w-full text-black h-full fixed top-0 left-0 flex flex-col items-center bg-transparent justify-center backdrop-blur-xl">

        <div class="w-96 bg-white p-4 rounded-md">

            <form onsubmit={(e) => userModel.createUser(userModel.user.id, e)}>

                <h2 class="text-lg font-bold">

                    Crear Usuario

                </h2>

                <hr>

                <div class="p-2 flex flex-col">

                    <label for="fullName" class="block text-sm font-bold">
                        
                        Nombre de Usuario:

                    </label>

                    <input 
                        class="border border-gray-400 rounded-md p-2" 
                        placeholder="Ingrese el nombre de usuario" 
                        type="text" 
                        id={`fullName-${id}`} 
                        name="fullName" 
                    />

                </div>

                <div class="p-2 flex flex-col">
                    
                    <label 
                        for="email"
                        class="block text-sm font-bold">

                        Correo Electronico:

                    </label>

                    <input 
                        class="border border-gray-400 rounded-md p-2" 
                        placeholder="Ingrese el correo electronico" 
                        type="email" 
                        id={`email-${id}`} 
                        name="email" 
                    />

                </div>

                <div class="p-2 flex flex-col">
                    
                    <label for="password" class="block text-sm font-bold">

                        Contraseña:

                    </label>

                    <input 
                        class="border border-gray-400 rounded-md p-2" 
                        placeholder="Ingrese la contraseña" 
                        type="password" 
                        id={`password-${id}`} 
                        name="password"
                    />

                </div>

            </form>

                <div>

                    <button
                        class="bg-red-400 text-white px-4 py-2 rounded-md"
                        onclick={() => (userModel.createDialog = false)}
                    >

                        Cancelar

                    </button>

                    <button
                        class="bg-blue-400 text-white px-4 py-2 rounded-md"
                        type="submit"
                    >
                    
                        Guardar

                    </button>
                    
                </div>
        </div>

    </div>

{/if}