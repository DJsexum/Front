<script lang="ts">

    import { ROUTERS } from "@utils/router";
    let { activePage } = $props();

</script>

<aside class= "bg-gray-200 w-60 flex flex-col gap-2 p-2">

    {#each ROUTERS.filter(x => !x.public) as route}

        <a href={route.path} class="text-black text-xl p-1 bg-gray-500 rounded-md"> {route.name} </a>
        
    {/each}

</aside>