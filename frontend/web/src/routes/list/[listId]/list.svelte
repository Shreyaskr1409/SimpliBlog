<script>
    import { onMount } from "svelte";
    import { list } from "../../../stores/list.js";
    import ListComponent from "./listComponent.svelte";
  import { basic } from "../../../stores/basic.js";
  import { Skeleton } from "@/components/ui/skeleton";

    onMount( async() => {
        console.log($list.blogsList);
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
    {#if $basic.sameUser === 2}
    <Skeleton class="w-full h-[500px] rounded-[15px]"></Skeleton>
    <Skeleton class="w-full h-[500px] rounded-[15px]"></Skeleton>
    {/if}
</div>