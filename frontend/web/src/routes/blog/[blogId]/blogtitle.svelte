<script>
    import Pagelinks from "./pagelinks.svelte";
    import { blog } from "../../../stores/blog.js";

    export let errormessage = false
</script>



<div class="flex justify-between items-center">


    {#if $blog}
        <h3 class="scroll-m-20 text-3xl font-semibold tracking-tight">{$blog.data.title}</h3>
    {:else if errormessage}
        <h3 class="scroll-m-20 text-3xl font-semibold tracking-tight">Error encountered...</h3>
    {:else}
        <h3 class="scroll-m-20 text-3xl font-semibold tracking-tight">Loading...</h3>
    {/if}
    

    <Pagelinks></Pagelinks>


</div>