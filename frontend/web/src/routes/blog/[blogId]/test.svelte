<!-- THIS WHOLE FILE IS FOR TESTING PURPOSES -->




<!-- <script>
    import { onMount } from "svelte";
    import { blogslist } from "../../../stores/blogslist.js";
    import { formatDate } from "$lib/util/dateFormat.js";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import Listcontent from "$lib/components/my_components/listcontent.svelte";

    let blogUrl = "";

    onMount(async () => {
        // Fetch and set blog data
        const res = await fetch("/api/v1/blogs/get-userblog/lua");
        const data = await res.json();
        blogslist.set(data);
        console.log($blogslist);

        // Construct URL
        const currentUrl = new URL(window.location.href);
        const segments = currentUrl.pathname.split('/').filter(Boolean);
        segments.pop(); // Remove the last segment
        const baseUrl = `${currentUrl.protocol}//${currentUrl.host}/${segments.join('/')}`;
        blogUrl = `${baseUrl}/66af4716f66a29979e64c0c5`;
    });
</script>

<div class="w-full flex flex-col gap-[5px]">
    <ScrollArea class="flex flex-col">
        <Listcontent isActive={true} title={"The People of the Kingdom"} date={"22 July 2024"} blogUrl={blogUrl}></Listcontent>
        {#if $blogslist && $blogslist.data && $blogslist.data.userBlogList}
            {#each $blogslist.data.userBlogList as listOfBlogs}
            <Listcontent title={listOfBlogs.title} date={formatDate(listOfBlogs.createdAt)}></Listcontent>
            {/each}
        {/if}
    </ScrollArea>
</div> -->
