<script>
	import Listcontent from "$lib/components/my_components/listcontent.svelte";
	import { onMount } from "svelte"
    import { blogslist } from "../../stores/blogslist.js";
    import { formatDate } from "$lib/util/dateFormat.js";
    import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';

    let baseUrl
    let loading = true

    onMount(async () => {
        try {
            const res = await fetch("/api/v1/blogs/get-userblog/lua");
            const data = await res.json();
            blogslist.set(data);
            console.log($blogslist);
    
    
            // Getting url of the site and popping out the last segment so that it can be replaced with the blogid for routing
            let currentUrl = new URL(window.location.href);
            let segments = currentUrl.pathname.split('/').filter(Boolean);
            segments.pop();
            // Reconstruct the URL without the last segment
            baseUrl = `${currentUrl.protocol}//${currentUrl.host}/${segments.join('/')}`;
        } catch (error) {
            loading = false
        } finally {
            loading = !loading
        }
    });
</script>


<div class="w-full box-border grid grid-cols-2 gap-x-[5px] gap-y-[5px]">

    <!-- <ScrollArea class="grid"> -->
        {#if $blogslist && $blogslist.data && $blogslist.data.userBlogList}

            {#each $blogslist.data.userBlogList as listOfBlogs}
                <Listcontent title={listOfBlogs.title} date={formatDate(listOfBlogs.createdAt)} blogid={`${listOfBlogs._id}`}  blogUrl={`${baseUrl}blog/${listOfBlogs._id}`}></Listcontent>
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