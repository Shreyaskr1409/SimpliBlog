<script>
    import { ModeWatcher } from "mode-watcher";
  import Logincard from "./logincard.svelte";

</script>


<body class="flex flex-col justify-center items-center w-screen h-screen bg-black">
    <ModeWatcher />
    <div class="flex flex-col my-8">
        <h1 class="scroll-m-20 self-start text-4xl font-extrabold tracking-tight lg:text-5xl pb-4 mt-8">
            Login:
        </h1>
        <!-- <div class="flex flex-row justify-start border-2 grow" id="outer_box">
            <Logincard></Logincard>
        </div> -->
        <Logincard></Logincard>
    </div>
</body>


<style>
    body{
        overflow-x: hidden;
    }
    /* #outer_box{
        width: 500px;
        padding: 10px;
        border-radius: 30px;
    } */
</style>