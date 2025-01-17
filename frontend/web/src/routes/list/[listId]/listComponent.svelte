<script>
    import AvatarFallback from "../../../lib/components/ui/avatar/avatar-fallback.svelte";
    import AvatarImage from "../../../lib/components/ui/avatar/avatar-image.svelte";
    import Avatar from "../../../lib/components/ui/avatar/avatar.svelte";
  import Skeleton from "../../../lib/components/ui/skeleton/skeleton.svelte";
  import { formatDate } from "$lib/util/dateFormat.js";
    import { Calendar } from "svelte-radix";
  import { HoverCard, HoverCardContent, HoverCardTrigger } from "$lib/components/ui/hover-card";
  import Blogcontent from "./blogcontent.svelte";
  import { Button } from "@/components/ui/button";

    export let blog = {
        author: {
            aboutme: null,
            avatar: null,
            username: null,
            _id: null,
            fullname: null
        },
        blogId: null,
        blogImageUrl: null,
        blogSubtitle: null,
        blogTitle: null,
        blogBody: null,
        createdAt: null,
        readerCount: null,
        shareCount: null
    }
    $: console.log(blog);
    
</script>

{#if blog.blogId !== null}
    <div class="w-full min-h-60 bg-zinc-900 hover:bg-zinc-800 relative rounded-[15px] p-[5px] pb-12 flex flex-col gap-2">
        {#if blog.blogImageUrl}
            <div class="relative w-full h-[300px] rounded-[20px] border-2 flex justify-center items-center overflow-hidden">
                <div class="absolute inset-0 bg-center bg-cover filter blur-sm opacity-50"
                    style="background-image: url({blog.blogImageUrl});">
                </div>
            
                <img
                    id="bg1"
                    src={blog.blogImageUrl}
                    alt=""
                    loading="lazy"
                    class="relative z-10 bg-transparent object-contain object-center h-full"
                />

                <Button variant="outline" on:click={() => {window.open(`/blog/${blog.blogId}`, "_self")}} class="z-10 absolute bottom-2 right-2">Read more</Button>
            </div>
        {:else}
            <div class="relative w-full h-[300px] rounded-[20px] border-2 flex justify-center items-center overflow-hidden">
                <div class="absolute inset-0 bg-center bg-cover filter blur-sm opacity-50"
                    style="background-image: url(https://wallpaperwaifu.com/wp-content/uploads/2019/11/minecraft-thumb-1500x844.jpg);">
                </div>
            
                <img
                    id="bg1"
                    src="https://wallpaperwaifu.com/wp-content/uploads/2019/11/minecraft-thumb-1500x844.jpg"
                    alt=""
                    loading="lazy"
                    class="relative z-10 bg-transparent object-contain object-center h-full"
                />

                <Button variant="outline" on:click={() => {window.open(`/blog/${blog.blogId}`, "_self")}} class="z-10 absolute bottom-2 right-2">Read more</Button>
                <h1 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-zinc-950 rounded-lg border-2 px-4 py-2">No blog images</h1>
            </div>
        {/if}
        <div class="flex flex-col flex-1 px-2">
            <a class="scroll-m-20 text-2xl font-bold tracking-tight underline underline-offset-2" href={`/blog/${blog.blogId}`}>
                {blog.blogTitle}
            </a>
            <hr class="my-2"/>
            <h2 class="scroll-m-20 text-xl font-normal tracking-tight mb-2">
                {blog.blogSubtitle}
            </h2>
            {#if blog.blogBody}
                <Blogcontent body={blog.blogBody}></Blogcontent>
            {:else}
                <p class="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, quasi esse eum dolores animi exercitationem itaque dolorem hic ut, aperiam quaerat ad. Nobis eveniet illo temporibus consequuntur placeat, vel explicabo?
                Quia, deserunt doloremque! Cupiditate dolorem tempora dolore.</p>
            {/if}
            <!--<div class=" h-16"></div>-->
        </div>
        
        <a id="list_topbar" class="flex flex-row items-center gap-2 w-fit absolute bottom-2 right-2 bg-zinc-950 pl-2 pr-4 py-1 bg-opacity-80 border rounded-full" href={`/user/${blog.author.username}`}>
            <Avatar>
                <AvatarImage src={blog.author.avatar} class="hover:cursor-pointer" alt=""></AvatarImage>
                <AvatarFallback class=" hover:cursor-pointer">{blog.author.fullname.charAt(0)}</AvatarFallback>
            </Avatar>
            <div class="flex flex-col justify-center">
                {#if blog.author.username}
                <HoverCard>
                    <HoverCardTrigger
                    href={`/user/${blog.author.username}`}
                    target="_self"
                    rel="noreferrer noopener"
                    class="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
                    >
                    @{blog.author.username}
                    </HoverCardTrigger>
                    <HoverCardContent class="w-80">
                    <div class="flex justify-between space-x-4">
                        <Avatar>
                        <AvatarImage src={blog.author.avatar} />
                        <AvatarFallback>{blog.author.fullname.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div class="space-y-1">
                            <h4 class="text-lg font-semibold">{blog.author.fullname}</h4>
                            <p class="text-sm">{blog.author.aboutme}</p>
                        <div class="flex items-center pt-2">
                            <Calendar class="mr-2 h-4 w-4 opacity-70" />
                            <span class="text-xs text-muted-foreground">
                            Joined {formatDate(blog.author.createdAt)}
                            </span>
                        </div>
                        </div>
                    </div>
                    </HoverCardContent>
                </HoverCard>
                {:else}
                <Skeleton class="h-4 w-32 my-1"></Skeleton>
                {/if}
                {#if blog.author.fullname}
                <HoverCard>
                    <HoverCardTrigger
                    href={`/user/${blog.author.username}`}
                    target="_self"
                    rel="noreferrer noopener"
                    class="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
                    >
                    {blog.author.fullname}
                    </HoverCardTrigger>
                    <HoverCardContent class="w-80">
                    <div class="flex justify-between space-x-4">
                        <Avatar>
                        <AvatarImage src={blog.author.avatar} />
                        <AvatarFallback>{blog.author.fullname.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div class="space-y-1">
                            <h4 class="text-lg font-semibold">{blog.author.fullname}</h4>
                            <p class="text-sm">{blog.author.aboutme}</p>
                        <div class="flex items-center pt-2">
                            <Calendar class="mr-2 h-4 w-4 opacity-70" />
                            <span class="text-xs text-muted-foreground">
                            Joined {formatDate(blog.author.createdAt)}
                            </span>
                        </div>
                        </div>
                    </div>
                    </HoverCardContent>
                </HoverCard>
                {:else}
                <Skeleton class="h-4 w-32 my-1"></Skeleton>
                {/if}
            </div>
        </a>
    </div>
{/if}