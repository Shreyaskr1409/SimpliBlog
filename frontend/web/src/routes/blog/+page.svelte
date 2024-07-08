<script>
  import Topbar from "./topbar.svelte";
  import { ModeWatcher } from "mode-watcher";

</script>


<body class="flex flex-col justify-center items-center w-screen h-screen bg-black">
    <ModeWatcher />
    <div class="flex flex-col h-screen my-8 w-2/3">
        <h1 class="scroll-m-20 self-start text-4xl font-extrabold tracking-tight lg:text-5xl pb-4">
            Blogs:
        </h1>
        <div class="flex flex-row justify-start border-slate-500 border-2 grow" id="outer_box">
            <div class="flex flex-row w-2/3" id="inner_box_left">
                <Topbar></Topbar>
            </div>
            <div id="spacer" class=""></div>
            <div class="flex flex-row border-slate-500 border-2 grow" id="inner_box_right">

            </div>
        </div>
    </div>
</body>


<style>
    *{
        --pad: 10px;
    }
    #outer_box {
        padding: var(--pad);
    }
    #spacer {
        width: var(--pad);
    }

    @media (min-width: 1536px) {
        *{
            --pad: 15px;
        }
        #outer_box {
            padding: var(--pad);
        }
        #spacer {
            width: var(--pad);
        }
    }
</style>