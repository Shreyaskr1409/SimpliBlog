<script>
    import { ModeWatcher } from "mode-watcher";
    import Topbar from "./topbar.svelte";
  import RightBoxContent from "./rightBoxContent.svelte";
  import Banner from "./banner.svelte";

</script>

<head>
    <title>SimpliBlog</title>
</head>

<body class="flex flex-col justify-center items-center w-screen h-screen">
    <ModeWatcher />
    <div id="bigcont"  class="flex flex-col h-screen my-8">
        <h1 class="scroll-m-20 self-start text-4xl font-extrabold tracking-tight lg:text-5xl pb-4 mt-8">
            User:
        </h1>
        <div class=" bg-zinc-900 flex flex-row gap-[10px] justify-start border-2" id="outer_box">
            <div class="flex flex-col w-2/3" id="inner_box_left">
                <Topbar></Topbar>
                <div id="spacer_1"></div>
                <Banner></Banner>
                <div id="spacer_1"></div>
            </div>


            <div class="flex flex-col border-2 w-1/3 bg-zinc-950 p-[10px]" id="inner_box_right">
                <RightBoxContent></RightBoxContent>
            </div>
        </div>
    </div>
</body>


<style>
    body{
        overflow-x: hidden;
        padding: 0 30px 0 30px;
    }
    #bigcont{
        width: 100%;
        max-width: 1300px;
    }
    #outer_box{
        padding: 10px;
        border-radius: 30px;
    }
    #inner_box_right{
        border-radius: 20px;
    }
    #spacer_1{
        height: 10px;
    }
</style>