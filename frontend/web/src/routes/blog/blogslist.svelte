<script>
  import Listcontent from "$lib/components/my_components/listcontent.svelte";

</script>
<div class="w-full flex flex-col gap-[5px]">
    <Listcontent></Listcontent>
    <Listcontent></Listcontent>
    <Listcontent isActive={true} title={"The People of the Kingdom"} date={"22 July 2024"}></Listcontent>
    <Listcontent></Listcontent>
    <Listcontent></Listcontent>
    <Listcontent></Listcontent>
</div>