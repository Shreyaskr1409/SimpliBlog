<script>
	import Listcontent from "$lib/components/my_components/listcontent.svelte";
	import { onMount } from "svelte"
    import { blogslist } from "../../../stores/blogslist.js";
    import { formatDate } from "$lib/util/dateFormat.js";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";

    let baseUrl

    // retrieving blogs of the active user
    onMount(async () => {
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
        });
</script>


<div class="w-full box-border flex flex-col gap-[5px]">

    <ScrollArea class="flex flex-col">
        {#if $blogslist && $blogslist.data && $blogslist.data.userBlogList}

            {#each $blogslist.data.userBlogList as listOfBlogs}
                <Listcontent title={listOfBlogs.title} date={formatDate(listOfBlogs.createdAt)} blogid={`${listOfBlogs._id}`}  blogUrl={`${baseUrl}/${listOfBlogs._id}`}></Listcontent>
            {/each}

        {/if}
    </ScrollArea>

</div>