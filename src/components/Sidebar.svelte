<script lang="ts">

    import { ROUTERS } from "@utils/router";
    let { activePage } = $props();

</script>

<aside class= "bg-gray-200 w-60 flex flex-col gap-2 p-2">

    <div class="p-2">

        <h1 class="text-center front-bold uppercase border-b">Mi inventario</h1>
        
    </div>

    {#each ROUTERS.filter(x => !x.public) as route}

        <a href={route.path} class="text-black text-md py-1 px-2 bg-gray-300/50 rounded-md"> {route.name} </a>
        
    {/each}

</aside>