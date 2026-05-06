<script lang="ts">

    import {onMount} from "svelte";

    let users: any = $state([]);

    onMount
    (async () =>
        {
            users = await fetch('https://dummyjson.com/users'). then(res => res.json())
        }
    )

</script>

<table class="flex-1 w-full">

    <thead>

        <tr>
            
            <th class="bg-gray-800 text-white text-left px-2">Nombre</th>
            <th class="bg-gray-800 text-white text-left px-2">Email</th>
            <th class="bg-gray-800 text-white text-left px-2">Acciones</th>
            
        </tr>

    </thead>

    <tbody>

        {#each users.users as user}

            <tr class="odd:bg-gray-100 dark:odd:bg-gray-700">
                
                <td  class="px-2 py-1"> {user.username}</td>
                <td class="px-2 py-1"> {user.email}</td>
                <td class="px-2 py-1">

                    <buton aria-label="editar" class="bg-gray-800 text-white px-4 py-2 rounded-md">

                        ✏️
                         
                    </buton>

                    <buton aria-label="eliminar" class="bg-red-500 text-white px-4 py-2 rounded-md">
                        
                        🗑️

                    </buton>

                </td>

            </tr>

        {/each}

    </tbody>

</table>