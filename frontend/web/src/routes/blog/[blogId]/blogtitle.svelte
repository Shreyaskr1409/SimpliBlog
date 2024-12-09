<script>
    import Pagelinks from "./pagelinks.svelte";
    import { blog } from "../../../stores/blog.js";

    export let serverDown = false
    export let errormessage
</script>



<div class="flex flex-row max-md:flex-col justify-between items-center gap-2">


    {#if $blog.data.title}
        <h3 class="scroll-m-20 text-3xl font-semibold tracking-tight">{$blog.data.title}</h3>
    {:else if serverDown}
        <h3 class="scroll-m-20 text-3xl font-semibold tracking-tight text-red-400">Server Down. I am sorry...</h3>
    {:else if errormessage}
        <h3 class="scroll-m-20 text-3xl font-semibold tracking-tight text-red-400">{errormessage}</h3>
    {:else}
        <h3 class="scroll-m-20 text-3xl font-semibold tracking-tight">Loading...</h3>
    {/if}
    

    <Pagelinks></Pagelinks>


</div>