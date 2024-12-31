<script>
    import Blogcontent from "./blogcontent.svelte";
    import Blogground from "./blogground.svelte";
    import Blogslist from "./blogslist.svelte";
    import Blogtitle from "./blogtitle.svelte";
    import Topbar from "./topbar.svelte";
    import { ModeWatcher } from "mode-watcher";

    import { onMount } from "svelte"
    import { blog } from "../../../stores/blog.js";
    import { user } from "../../../stores/user.js";
    import CommentsOrBlog from "./commentsOrBlog.svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import { userblogslist } from "../../../stores/userblogslist.js";

    let blogId
    let blog_loading = true
    let user_loading = true
    let bloglist_loading = true
    let serverDown = false
    let errormessage

    onMount( async() => {
        const url = new URL(window.location.href)
        blogId = url.pathname.split('/').pop()

        try {
            const blog_res = await fetch(`/api/v1/blogs/get-blog/${blogId}`)
            const blog_data = await blog_res.json()
            if (!blog_res.ok) {
                errormessage = blog_data.message
                return
            }
            blog.set(blog_data.data)
            console.log(blog_data);
            blog_loading = false

            const user_res = await fetch(`/api/v1/users/get-user/${$blog.author}`)
            const user_data = await user_res.json()
            user.set(user_data.data)
            console.log($user);
            user_loading = false
            if (!user_res.ok) {
                errormessage = user_data.message
                return
            }

            // This part is still not yet changed and thought about thus uses blogList.data
            const list_res = await fetch(`/api/v1/blogs/get-userblog/${$user.username}`)
            const list_data = await list_res.json()
            userblogslist.set(list_data)
            console.log($userblogslist);
            bloglist_loading = false
            if (!list_res.ok) {
                errormessage = list_data.message
                return
            }
            
        } catch (error) {
            serverDown = true
            blog_loading = true
            user_loading = true
            bloglist_loading = true
            console.log("Error while fetching user: ", error);
        }
    } )
    
</script>

<head>
    <title>Simpliblog</title>
</head>

<body class="flex flex-col justify-center items-center w-screen h-screen">
    <ModeWatcher />
    <div id="bigcont"  class="flex flex-col h-screen my-8">


        <h1 class="scroll-m-20 self-start text-4xl font-extrabold tracking-tight lg:text-5xl pb-4 mt-8">
            Blog:
        </h1>


        <div class=" bg-zinc-900 flex flex-row justify-start border-2 grow max-[1000px]:flex-col" id="outer_box">


            <div class="flex flex-col w-2/3 max-[1000px]:w-full" id="inner_box_left">
                <Topbar></Topbar>
                <div id="spacer_1"></div>
                <Blogground></Blogground>
                <div id="spacer_1"></div>
                <Blogtitle serverDown={serverDown} errormessage={errormessage}></Blogtitle>
                <div id="spacer_1"></div>
                <Blogcontent></Blogcontent>
            </div>

            <div id="spacer_2" class=" min-[1000px]:w-[10px] max-[1000px]:h-[10px]"></div>

            <div class="flex flex-col border-2 grow bg-zinc-950 p-[5px] items-center" id="inner_box_right">
                <CommentsOrBlog></CommentsOrBlog>
                <div class="h-[5px]"></div>
                <Separator></Separator>
                <div class="h-[5px]"></div>
                <Blogslist loading={bloglist_loading}></Blogslist>
            </div>


        </div>
        
        <div class=" min-h-8"></div>
    </div>
</body>


<style>
    body{
        overflow-x: hidden;
        padding: 0 10px 0 10px;
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