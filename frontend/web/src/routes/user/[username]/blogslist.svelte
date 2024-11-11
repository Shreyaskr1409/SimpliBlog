<script>
	import Listcontent from "$lib/components/my_components/listcontent.svelte";
	import { onMount } from "svelte"
    import { blogslist } from "../../../stores/blogslist.js";
    import { formatDate } from "$lib/util/dateFormat.js";
    import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import Button from "$lib/components/ui/button/button.svelte";

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


    let currentPage = 0;
    const blogsPerPage = 6;
    $: totalBlogs = $blogslist?.data?.userBlogList?.length || 0;
    $: totalPages = Math.ceil(totalBlogs / blogsPerPage);

    // Sliced data for current page
    $: paginatedBlogs = $blogslist?.data?.userBlogList?.slice(
        currentPage * blogsPerPage,
        (currentPage + 1) * blogsPerPage
    );

    function nextPage() {
        if (currentPage < totalPages - 1) {
        currentPage += 1;
        }
    }
    function previousPage() {
        if (currentPage > 0) {
        currentPage -= 1;
        }
    }
</script>


<div class="box-border w-full grid grid-cols-2 max-sm:grid-cols-1 gap-x-[5px] gap-y-[5px]">
    
    {#if errorWhileFetching == true}
    <Listcontent title={"Error occured while fetching blogs"} date={"Content not available"} customstyle1={"col-span-2"} alertmsg={true}></Listcontent>
    {/if}

    {#if noblogs == true}
    <Listcontent title={"User does not have any blogs"} date={"No blogs available"} customstyle1={"col-span-2"} alertmsg={true}></Listcontent>
    {/if}

    <!-- <ScrollArea class="grid"> -->
        <!-- {#if $blogslist && $blogslist.data && $blogslist.data.userBlogList}

            {#each $blogslist.data.userBlogList as listOfBlogs}
                <Listcontent title={listOfBlogs.title} date={formatDate(listOfBlogs.createdAt)} blogid={`${listOfBlogs._id}`}  blogUrl={`${baseUrl}blog/${listOfBlogs._id}`}></Listcontent>
            {/each}
            
        {/if} -->
    <!-- </ScrollArea> -->




    {#if paginatedBlogs && paginatedBlogs.length > 0}
        {#each paginatedBlogs as listOfBlogs}
        <Listcontent
            title={listOfBlogs.title}
            date={formatDate(listOfBlogs.createdAt)}
            blogid={`${listOfBlogs._id}`}
            blogUrl={`${baseUrl}blog/${listOfBlogs._id}`}
        ></Listcontent>
        {/each}
    {/if}


    {#if loading}
    <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
    <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
    <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
    <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
    <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
    <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
    {/if}
</div>

<Separator class="my-[5px]"></Separator>

<div class="w-full grid grid-cols-3 items-center justify-items-center">
    <Button variant="ghost" class="w-28" on:click={previousPage} disabled={currentPage === 0}>Previous</Button>
    <span class=" text-center">Page {currentPage + 1} of {totalPages}</span>
    <Button variant="ghost" class="w-28" on:click={nextPage} disabled={currentPage === totalPages - 1}>Next</Button>
</div>