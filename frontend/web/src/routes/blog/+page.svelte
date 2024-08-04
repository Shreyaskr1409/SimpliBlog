<script>
    import Blogcontent from "./blogcontent.svelte";
    import Blogground from "./blogground.svelte";
    import Blogslist from "./blogslist.svelte";
    import Blogtitle from "./blogtitle.svelte";
    import Topbar from "./topbar.svelte";
    import { ModeWatcher } from "mode-watcher";

    import { onMount } from "svelte"
    import { blog } from "../../stores/blog.js";
    import { user } from "../../stores/user.js";

    onMount(async () => {
        try {
            const res = await fetch("/api/v1/blogs/get-blog/66af4716f66a29979e64c0c5");
            const data = await res.json();
            blog.set(data);
            console.log($blog);
        } catch (error) {
            console.log("Error while fetching blog: ", error);
        }
    });
    
    onMount(async () => {
        try {
            const res = await fetch(`/api/v1/users/get-user/${blog.data.author}`);
            const data = await res.json();
            user.set(data);
            console.log($user);
        } catch (error) {
            console.log("Error while fetching user: ", error);
        }
    });
</script>

<head>
    <title>Simpliblog</title>
</head>

<body class="flex flex-col justify-center items-center w-screen h-screen">
    <ModeWatcher />
    <div id="bigcont"  class="flex flex-col h-screen my-8">
        <h1 class="scroll-m-20 self-start text-4xl font-extrabold tracking-tight lg:text-5xl pb-4 mt-8">
            Blogs:
        </h1>
        <div class=" bg-zinc-900 flex flex-row justify-start border-2 grow" id="outer_box">
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


            <div class="flex flex-row border-2 grow bg-zinc-950 p-[5px]" id="inner_box_right">
                <Blogslist></Blogslist>
            </div>
        </div>
        <div class=" min-h-8"></div>
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