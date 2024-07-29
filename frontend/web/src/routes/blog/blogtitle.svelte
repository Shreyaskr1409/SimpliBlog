<script>
    import Pagelinks from "./pagelinks.svelte";
    import { blog } from "../../stores/blog.js";
</script>
<div class="flex justify-between items-center">
    {#if $blog}
        <h3 class="scroll-m-20 text-3xl font-semibold tracking-tight">{$blog.data.title}</h3>
    {:else}
        <h3 class="scroll-m-20 text-3xl font-semibold tracking-tight">Loading...</h3>
    {/if}
    <Pagelinks></Pagelinks>
</div>