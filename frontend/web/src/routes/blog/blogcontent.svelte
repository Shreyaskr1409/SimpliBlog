<script>
    import { formatDate } from "$lib/util/dateFormat.js";
    import { blog } from "../../stores/blog.js";

    let subtitle = "This is the subtitle"
    let date = "20 July 2024"
</script>

<div class="w-full grow">
    <div id="textArea" class="w-full h-full bg-zinc-950">
        {#if $blog}
        <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors first:mt-0">{$blog.data.subtitle}</h2>
        {:else}
        <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors first:mt-0">{subtitle}</h2>
        {/if}
        {#if $blog}
        <p>{formatDate($blog.data.createdAt)}</p>
        {:else}
        <p class=" text-sm">{date}</p>
        {/if}
        <br>

        {#if $blog}
            <h1>{@html $blog.data.body}</h1>
        {:else}
            <p>Loading...</p>
        {/if}
    </div>
</div>

<style>
    #textArea{
        box-sizing: border-box;
        padding: 20px;
        border-radius: 20px;
        border-width: 2px;
    }
</style>