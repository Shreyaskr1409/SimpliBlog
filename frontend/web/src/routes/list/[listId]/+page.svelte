
<script>
    import { ModeWatcher } from "mode-watcher";
    import { onMount } from "svelte";
    import RightBoxContent from "./rightBoxContent.svelte";
  import List from "./list.svelte";
</script>

<head>
    <title>Simpliblog</title>
</head>

<div class="w-full flex flex-col justify-start items-center">
    <ModeWatcher defaultMode="dark"/>
    <div id="bigcont" class="flex flex-col items-center w-full h-fit mb-8 max-w-[1300px] max-2xl:w-[90%]">

        <h1 class="scroll-m-20 self-start text-4xl font-extrabold tracking-tight lg:text-5xl pb-4 mt-8">
            List:
        </h1>

        <div class=" bg-zinc-900 flex self-stretch flex-row gap-[10px] justify-start border-2 h-fit lg:min-h-[800px] max-lg:flex-col-reverse" id="outer_box">
            <div class="flex flex-col w-2/3 max-lg:w-full" id="inner_box_left">
                <List></List>
            </div>


            <div class="flex flex-col border-2 w-1/3 max-lg:w-full bg-zinc-950 p-[10px] relative" id="inner_box_right">
            <RightBoxContent></RightBoxContent>
            </div>
        </div>
    </div>
</div>

<style>
    #outer_box{
        padding: 10px;
        border-radius: 30px;
    }
    #inner_box_right{
        border-radius: 20px;
    }
</style>
