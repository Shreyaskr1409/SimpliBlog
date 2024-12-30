<script>
    import { onMount } from "svelte";
    import { user } from "../../../stores/user";
    import { blogslist } from "../../../stores/blogslist";
    import { waitUntilNotEqual } from "$lib/util/waitTillNotEqual";
    import Listcontent from "$lib/components/my_components/listcontent.svelte";
    import {formatDate} from "$lib/util/dateFormat.js";

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
                blogslist.set(data.data[0])
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

</script>

<div class="w-full">
    {#each $blogslist.userLists as list (list._id)}
        <div class="w-full rounded-[15px] border-2 px-4 py-1 bg-zinc-900 flex flex-col">
            <a class="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 hover:underline hover:cursor-pointer whitespace-nowrap" href="">{list.title}</a>


            <div class="w-full flex flex-col gap-1">
                {#each list.blogsList as blog (blog._id)}
                    <Listcontent
                            title={blog.blogTitle}
                            date={formatDate(blog.createdAt)}
                            blogid={`${blog.blogId}`}
                            blogUrl={`${baseUrl}blog/${blog.blogId}`}
                    ></Listcontent>
                {/each}
            </div>

        </div>
    {/each}
</div>