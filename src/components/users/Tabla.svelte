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

        </tr>

    </thead>

    <tbody>

        {#each users.users as user}

            <tr>
                
                <td> {user.username}</td>
                <td> {user.email}</td>

            </tr>

        {/each}

    </tbody>

</table>