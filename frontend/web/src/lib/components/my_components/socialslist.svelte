<script>
    export let title = "Instagram"
    export let socialId = "shreyaskr.1409"
    export let imagePath = ""
</script>

<div id="contnr" class="w-full">
    <div id="row1" class=" gap-2 flex flex-row items-center flex-nowrap px-2 py-1 w-full hover:bg-zinc-800">
        <div id="box" style="background-image: url({imagePath});" class="h-10 w-10"></div>
        <div id="col1">
            <h2 class="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 hover:underline hover:cursor-pointer whitespace-nowrap">{title}</h2>
            <p class=" text-sm text-nowrap">{socialId}</p>
        </div>
    </div>
</div>

<style>
    #row1{
        border-width: 2px;
        border-radius: 15px;
    }
    #box {
        background-size: contain;
        border-radius: 8px;
    }
</style>