<script>
    import { onMount } from "svelte";
    import { list } from "../../../stores/list.js";
    import ListComponent from "./listComponent.svelte";

    onMount( async() => {
        $: console.log($list.blogsList);
    })
</script>

<div class="flex flex-col h-full w-full bg-zinc-950 p-[5px] rounded-[20px] border-2 gap-[5px]">
    {#if $list.blogsList.length != 0}
        {#each $list.blogsList as blog (blog._id)}
            <ListComponent
                blog={blog}
            ></ListComponent>
        {/each}
    {/if}
</div>