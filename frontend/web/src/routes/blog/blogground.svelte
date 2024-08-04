<script>
    import { blog } from "../../stores/blog.js";
</script>

<div class="relative flex flex-row">
    <img id="bg1"
        src="https://wallpaperwaifu.com/wp-content/uploads/2019/11/minecraft-thumb-1500x844.jpg"
        alt="Banner" 
        loading="lazy"
        class=" bg-zinc-900 w-full"
    />
    <div class="absolute pl-3 pt-2">
        {#if $blog}
            <p class="underline underline-offset-2 text-nowrap"><span class="cursor-pointer"><span class=" text-2xl">{$blog.data.readerCount}</span> views</span></p>
            <p class="underline underline-offset-2"><span class="cursor-pointer"><span class=" text-2xl">{$blog.data.shareCount}</span> shares</span></p>
        {:else}
            <div></div>
        {/if}
    </div>
</div>

<style>
    #bg1{
        border-radius: 20px;
        border-width: 2px;
        object-fit: cover;
        object-position: 50%;
        height: 400px;
    }
</style>