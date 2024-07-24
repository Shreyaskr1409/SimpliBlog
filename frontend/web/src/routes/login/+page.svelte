<script>
    import { ModeWatcher } from "mode-watcher";
  import Logincard from "./logincard.svelte";

</script>


<body class="flex flex-row justify-center items-center w-screen h-screen ">
    <ModeWatcher />
    <div class="w-1/2 h-full">
        <div id="bgimg_up" class="w-full h-full"></div>
    </div>
    <div class="flex flex-col justify-center items-center w-1/2">
        <div class="flex flex-col my-8">
            <h1 class="scroll-m-20 self-start text-4xl font-extrabold tracking-tight lg:text-5xl pb-4 mt-8">
                Login:
            </h1>
            <Logincard></Logincard>
        </div>
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
    #bgimg_up{
        /* background-image: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e918a90b-daa4-4f5d-8e95-fb8771592c4d/dh9sh3z-d0c3f79a-e000-46d7-ba09-3f6343032fde.png/v1/fill/w_1280,h_2284,q_80,strp/sun_and_clouds_pixel_art_wallpaper_by_subtlerealityshift_dh9sh3z-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjI4NCIsInBhdGgiOiJcL2ZcL2U5MThhOTBiLWRhYTQtNGY1ZC04ZTk1LWZiODc3MTU5MmM0ZFwvZGg5c2gzei1kMGMzZjc5YS1lMDAwLTQ2ZDctYmEwOS0zZjYzNDMwMzJmZGUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.VSKZpNALheqGsb3Z9SuWqv1XAOU_Dq0eaK8eawjcCwg"); */
        background-image: url("https://66.media.tumblr.com/7dc3ca107415a75f11881ec55688ea81/tumblr_n5tuyw0G8S1tah9pwo8_r1_640.gif");
        background-size: cover;
        background-position-y: 40%;
        background-repeat: no-repeat;
        z-index: 1;
    }
</style>