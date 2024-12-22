<script>
	import Listcontent from "$lib/components/my_components/listcontent.svelte";
	import { onMount } from "svelte"
    import { blogslist } from "../../../stores/blogslist.js";
    import { formatDate } from "$lib/util/dateFormat.js";
    import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';

    let baseUrl
    export let loading = true

    onMount(async () => {
        let currentUrl = new URL(window.location.href);
        let segments = currentUrl.pathname.split('/').filter(Boolean);
        segments.pop();
        baseUrl = `${currentUrl.protocol}//${currentUrl.host}/${segments.join('/')}`;
    });
</script>


<div class="w-full box-border flex flex-col gap-[5px]">

    <!-- <ScrollArea class="flex flex-col"> -->
        {#if $blogslist.data.userBlogList}

            {#each $blogslist.data.userBlogList as listOfBlogs}
                <Listcontent title={listOfBlogs.title} date={formatDate(listOfBlogs.createdAt)} blogid={`${listOfBlogs._id}`}  blogUrl={`${baseUrl}/${listOfBlogs._id}`}></Listcontent>
            {/each}

        {/if}
    <!-- </ScrollArea> -->
    {#if loading}
        <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
        <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
        <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
        <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
        <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
        <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
    {/if}

</div>