<script>
	import Listcontent from "$lib/components/my_components/listcontent.svelte";
	import { onMount } from "svelte"
    import { blogslist } from "../../../stores/blogslist.js";
    import { formatDate } from "$lib/util/dateFormat.js";
    import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';

    let baseUrl
    let loading = true
    let errorWhileFetching = false
    let noblogs = false
    let username

    onMount(async () => {
        try {
            const url = new URL(window.location.href);
            username = url.pathname.split('/').pop(); // Get the last part of the URL


            blogslist.set({})
            const res = await fetch(`/api/v1/blogs/get-userblog/${username}`);
            const data = await res.json();
            blogslist.set(data);
            console.log($blogslist);
            if ($blogslist.data.userBlogCount === 0) {
                noblogs = true
            }
    
            let currentUrl = new URL(window.location.href);
            let segments = currentUrl.pathname.split('/').filter(Boolean);
            segments.pop();
            segments.pop();
            // Reconstruct the URL without the last segment
            baseUrl = `${currentUrl.protocol}//${currentUrl.host}/${segments.join('/')}`;
        } catch (error) {
            errorWhileFetching = true
        } finally {
            loading = !loading
        }
    });
</script>


<div class="w-full box-border grid grid-cols-2 gap-x-[5px] gap-y-[5px]">
    
    {#if errorWhileFetching == true}
    <Listcontent title={"Error occured while fetching blogs"} date={"Content not available"} customstyle1={"col-span-2"}></Listcontent>
    {/if}

    {#if noblogs == true}
    <Listcontent title={"User does not have any blogs"} date={"No blogs available"} customstyle1={"col-span-2"}></Listcontent>
    {/if}

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