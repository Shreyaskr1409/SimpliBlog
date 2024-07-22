<script>
    export let title = "The Joke Tax"
    export let date = "20 July 2024"
    export let isActive = false
    let bgclr = ""

    if (isActive) {
        bgclr = "bg-slate-900"
    }

    let usedtitle = title;
    if (title.length>25) {
        usedtitle = title.substring(0, 25) + "..."
    }
</script>

<div id="contnr" class=" w-full">
    <div id="row1" class="px-4 py-1 w-full {bgclr} hover:bg-slate-800">
        <div id="col1">
            <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 hover:underline hover:cursor-pointer whitespace-nowrap">{usedtitle}</h2>
            <p class=" text-sm">{date}</p>
        </div>
    </div>
</div>

<style>
    #contnr{
        padding: 5px 5px 0px 5px;
    }
    #row1{
        border-width: 2px;
        border-radius: 15px;
    }
</style>