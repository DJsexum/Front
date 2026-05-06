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

<table>

    <thead>

        <tr>
            
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
            
        </tr>

    </thead>

    <tbody>

        {#each users.users as user}

            <tr>
                
                <td> {user.username}</td>
                <td> {user.email}</td>
                <td>

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