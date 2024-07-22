<script>
  import Blogcontent from "./blogcontent.svelte";
  import Blogground from "./blogground.svelte";
  import Blogslist from "./blogslist.svelte";
  import Blogtitle from "./blogtitle.svelte";
  import Topbar from "./topbar.svelte";
  import { ModeWatcher } from "mode-watcher";

</script>


<body class="flex flex-col justify-center items-center w-screen h-screen bg-black">
    <ModeWatcher />
    <div id="bigcont"  class="flex flex-col h-screen my-8">
        <h1 class="scroll-m-20 self-start text-4xl font-extrabold tracking-tight lg:text-5xl pb-4 mt-8">
            Blogs:
        </h1>
        <div class="flex flex-row justify-start border-2 grow" id="outer_box">
            <div class="flex flex-col w-2/3" id="inner_box_left">
                <Topbar></Topbar>
                <div id="spacer_1"></div>
                <Blogground></Blogground>
                <div id="spacer_1"></div>
                <Blogtitle></Blogtitle>
                <div id="spacer_1"></div>
                <Blogcontent></Blogcontent>
            </div>


            <div id="spacer_2" class=""></div>


            <div class="flex flex-row border-2 grow" id="inner_box_right">
                <Blogslist></Blogslist>
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
    #spacer_2{
        width: 10px;
    }
    #spacer_1{
        height: 10px;
    }
</style>