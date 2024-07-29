<script>
	import Listcontent from "$lib/components/my_components/listcontent.svelte";

	import { onMount } from "svelte"
    import { blogslist } from "../../stores/blogslist.js";

    onMount(async () => {
        const res = await fetch("/api/v1/blogs/get-userblog/lua");
        const data = await res.json();
        blogslist.set(data);
        console.log($blogslist);
    });
</script>
<div class="w-full flex flex-col gap-[5px]">
    <Listcontent></Listcontent>
    <Listcontent></Listcontent>
    <Listcontent isActive={true} title={"The People of the Kingdom"} date={"22 July 2024"}></Listcontent>
    <Listcontent></Listcontent>
    <Listcontent></Listcontent>
    <Listcontent></Listcontent>
</div>