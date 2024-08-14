<script>
	import Listcontent from "$lib/components/my_components/listcontent.svelte";

	import { onMount } from "svelte"
    import { blogslist } from "../../stores/blogslist.js";
    import { formatDate } from "$lib/util/dateFormat.js";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";

    onMount(async () => {
        const res = await fetch("/api/v1/blogs/get-userblog/lua");
        const data = await res.json();
        blogslist.set(data);
        console.log($blogslist);
    });
</script>
<div class="w-full flex flex-col gap-[5px]">
    <ScrollArea class="flex flex-col">
        <Listcontent isActive={true} title={"The People of the Kingdom"} date={"22 July 2024"}></Listcontent>
        {#if $blogslist && $blogslist.data && $blogslist.data.userBlogList}
            {#each $blogslist.data.userBlogList as listOfBlogs}
            <Listcontent title={listOfBlogs.title} date={formatDate(listOfBlogs.createdAt)}></Listcontent>
            {/each}
        {/if}
    </ScrollArea>
</div>