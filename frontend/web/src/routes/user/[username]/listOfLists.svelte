<script>
    import { onMount } from "svelte";
    import { user } from "../../../stores/user";
    import { blogslist } from "../../../stores/blogslist";
    import { waitUntilNotEqual } from "$lib/util/waitTillNotEqual";
    import Listcontent from "$lib/components/my_components/listcontent.svelte";
    import {formatDate} from "$lib/util/dateFormat.js";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";

    let loading = true
    let baseUrl

    onMount(async () => {
        loading = true

        console.log("Waiting till user is not null");
        await waitUntilNotEqual(() => $user._id, null)
        console.log("User is not null");


        let currentUrl = new URL(window.location.href);
        let segments = currentUrl.pathname.split('/').filter(Boolean);
        segments.pop();
        segments.pop();
        // Reconstruct the URL without the last segment
        baseUrl = `${currentUrl.protocol}//${currentUrl.host}/${segments.join('/')}`;
        
        try {
            const res = await fetch(`/api/v2/lists/get-user-lists/${$user._id}`)
            const data = await res.json()
            console.log(data)
            if (res.ok) {
                blogslist.set(data.data)
                console.log($blogslist);
            } else {
                // to be implemented
            }
        } catch (error) {
            console.log(error)
        } finally {
            loading = false
        }
    })

    let currentPage = 0
    const listsPerPage = 2
    $: totalLists = $blogslist.userLists.length || 0
    $: totalPages = Math.ceil(totalLists / listsPerPage)
    $: paginatedLists = $blogslist.userLists.slice(
        currentPage * listsPerPage,
        (currentPage + 1) * listsPerPage
    )
    

    function nextPage() {
        if (currentPage < totalPages - 1) {
        currentPage += 1;
        }
    }
    function previousPage() {
        if (currentPage > 0) {
        currentPage -= 1;
        }
    }
</script>

<div class="w-full grid grid-cols-2 max-sm:grid-cols-1 md:max-xl:grid-cols-1 gap-2">
    {#if $blogslist.userLists.length === 0 && !loading}
        <Listcontent title={"User does not have any lists"} date={"No blogs available"} customstyle1={"col-span-full"} alertmsg={true}></Listcontent>
    {/if}
    {#if paginatedLists.length > 0}
        {#each paginatedLists as list (list._id)}
            <div class="w-full rounded-[15px] px-2 py-2 bg-zinc-900 flex flex-col">
                <a class="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 hover:underline hover:cursor-pointer whitespace-nowrap w-full text-center" href="">{list.title}</a>
                {#if list.description}
                <div class="px-2">
                    <p class=" bg-zinc-950 text-base rounded-md px-2 py-1 my-2">{list.description}</p>
                </div>
                {/if}


                <div class="w-full h-full grid grid-cols-1 grid-rows-3 gap-1 bg-zinc-950 rounded-[1.25rem] p-1">
                    {#each list.blogsList as blog (blog._id)}
                        <Listcontent
                                title={blog.blogTitle}
                                date={formatDate(blog.createdAt)}
                                blogid={`${blog.blogId}`}
                                blogUrl={`${baseUrl}blog/${blog.blogId}`}
                        ></Listcontent>
                    {/each}
                </div>
                    
                <Button variant="secondary" class="w-fit px-4 self-center mt-2">Show more</Button>


            </div>
        {/each}
    {/if}

    {#if loading}
    <div class="w-full rounded-[15px] px-2 py-2 bg-zinc-900 flex flex-col">
        <div class="flex justify-center gap-1">
            <Skeleton class="h-6 my-1 w-20"></Skeleton>
            <Skeleton class="h-6 my-1 w-8"></Skeleton>
            <Skeleton class="h-6 my-1 w-16"></Skeleton>
        </div>
        <div class=" bg-zinc-950 rounded-md px-2 py-2 my-2 flex flex-col gap-2">
            <Skeleton class="h-4 w-full"></Skeleton>
            <Skeleton class="h-4 w-full"></Skeleton>
            <Skeleton class="h-4 w-20"></Skeleton>
        </div>

        <div class="w-full h-full flex flex-col gap-1 bg-zinc-950 rounded-[1.25rem] p-1">
            <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
            <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
            <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
        </div>

    </div>
    <div class="w-full rounded-[15px] px-2 py-2 bg-zinc-900 flex flex-col">
        <div class="flex justify-center gap-1">
            <Skeleton class="h-6 my-1 w-20"></Skeleton>
            <Skeleton class="h-6 my-1 w-8"></Skeleton>
            <Skeleton class="h-6 my-1 w-16"></Skeleton>
        </div>
        <div class=" bg-zinc-950 rounded-md px-2 py-2 my-2 flex flex-col gap-2">
            <Skeleton class="h-4 w-full"></Skeleton>
            <Skeleton class="h-4 w-full"></Skeleton>
            <Skeleton class="h-4 w-20"></Skeleton>
        </div>

        <div class="w-full h-full flex flex-col gap-1 bg-zinc-950 rounded-[1.25rem] p-1">
            <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
            <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
            <Skeleton class=" w-full h-[3.75rem] rounded-[15px]"></Skeleton>
        </div>

    </div>
    {/if}
    
    <Separator class="col-span-full"></Separator>
    <div class="w-full grid grid-cols-3 col-span-full items-center justify-items-center">
        <Button variant="ghost" class="w-28" on:click={previousPage} disabled={currentPage === 0}>Previous</Button>
        <span class=" text-center">Page {currentPage + 1} of {totalPages}</span>
        <Button variant="ghost" class="w-28" on:click={nextPage} disabled={currentPage === totalPages - 1}>Next</Button>
    </div>
</div>