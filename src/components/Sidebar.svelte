<script lang="ts">

    import { ROUTERS } from "@utils/router";
    import { appStore } from "@utils/store.svelte";

    let { activePage } = $props();

</script>

<aside class= "bg-gray-200 dark:bg-gray-800 w-60 flex flex-col gap-2 p-2 transition-colors duration-300">

    <div class="p-2">

        <h1 class="text-center front-bold uppercase border-b">Mi inventario</h1>
        
    </div>

    {#each ROUTERS.filter(x => !x.public) as route}

        <a href={route.path} class="text-black text-md py-1 px-2 bg-gray-300/50 rounded-md"> {route.name} </a>
        
    {/each}

    <dvi clas="p-2 flex justify center">

        <button onclick={() => appStore.toggleDarkMode()} class="bg-gray-800 text-white dark:bg-white dark:text-black px-4 py-2">

            {appStore.isDarkMode ? '☀️' : '🌙'}

        </button>

    </dvi>

</aside>