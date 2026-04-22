<script lang="ts">
    import { ROUTERS } from "@utils/router";

    const { activePage } = $props();
</script>

<aside>
    {#each ROUTERS as route}
        <p class="text-white"> {route.name}</p>
    {/each}
</aside>