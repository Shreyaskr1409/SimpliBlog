<script>
    import { ModeWatcher } from "mode-watcher";
    import Topbar from "./topbar.svelte";
    import RightBoxContent from "./rightBoxContent.svelte";
    import Banner from "./banner.svelte";
    import Userblogslist from "./userblogslist.svelte";
    import { onMount } from "svelte";
    import { user } from "../../../stores/user";
    import { subscribers, subscriptions } from "../../../stores/subscription";
    import Search from "./search.svelte";
    import ListOfLists from "./listOfLists.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import { Button } from "$lib/components/ui/button";

    let username
    // let loggedinFlag = false
    let loading = true

    onMount(async () => {
        try {
            const url = new URL(window.location.href);
            username = url.pathname.split('/').pop(); // Get the last part of the URL

            const res = await fetch(`/api/v1/users/get-user/${username}`);
            const data = await res.json()
            console.log(data);
            user.set(data.data);
            
        } catch (error) {
            console.log(error);
        } finally {
            loading = false
        }
    });
    onMount(async () => {
        subscribers.set({})
        try {
            const url = new URL(window.location.href);
            username = url.pathname.split('/').pop(); // Get the last part of the URL

            const res = await fetch(`/api/v1/subscription/${username}/get-user-subscribers`);
            const data = await res.json()
            subscribers.set(data);
            console.log($subscribers);
        } catch (error) {
            console.log(error);
        }
    });
    onMount(async () => {
        subscriptions.set({})
        try {
            const url = new URL(window.location.href);
            username = url.pathname.split('/').pop(); // Get the last part of the URL

            const res = await fetch(`/api/v1/subscription/${username}/get-user-subscriptions`);
            const data = await res.json()
            subscriptions.set(data);
            console.log($subscriptions);
        } catch (error) {
            console.log(error);
        }
    });

    // NOT NEEDED ANYMORE

    // onMount(async () => {
    //     loggedinFlag = false
    //     try {
    //         const res = await fetch(`/api/v1/users/loggedin-confirm`, {
    //             method:  "GET",
    //             headers: { 'Content-Type': 'application/json' }
    //         });
    //         const data = await res.json();
    //         console.log(data)
    //         if (res.ok) {
    //             loggedinFlag = true
    //         }
    //     } catch (error) {
    //         loggedinFlag = false
    //     }
    // });


</script>

<head>
    <title>SimpliBlog</title>
</head>

<div class="w-full flex flex-col justify-start items-center">
    <ModeWatcher defaultMode="dark"/>
    <div id="bigcont" class="flex flex-col items-center w-full h-fit my-8 gap-2 max-w-[1300px] max-2xl:w-[90%]">
        <div class="w-2/3 h-fit p-2 bg-zinc-900 rounded-2xl max-xl:w-[800px] max-lg:w-[700px] max-md:w-full">
            <Search></Search>
        </div>
        <div class=" bg-zinc-900 flex self-stretch flex-row gap-[10px] justify-start border-2 h-fit md:min-h-[800px] max-md:flex-col" id="outer_box">
            <div class="flex flex-col w-2/3 max-md:w-full" id="inner_box_left">
                <Banner></Banner>
                <div id="spacer_1"></div>
                <Topbar></Topbar>
                <div id="spacer_1"></div>

                
                <div>
                    <div class="flex justify-between py-1">
                        <h3 class="scroll-m-20 self-start text-3xl font-bold tracking-tight lg:text-4xl ml-4">
                            User's Blogs:
                        </h3>
                        <Button variant="outline" disabled>Show more</Button>
                    </div>
                    <div class="flex flex-col border-2 bg-zinc-950 p-[5px] items-center" id="inner_box_right">
                        <Userblogslist></Userblogslist>
                    </div>
                </div>
                <div class="h-4"></div>

                <Separator></Separator>
                <div class="h-4"></div>
                <p>Features around lists will be added soon enough.
                    Backend is ready but the frontend will need a lot of work.
                    I am working on it and the following is a small preview of how it will look.</p>
                <div class="h-4"></div>

                <Separator></Separator>

                <div class="h-4"></div>
                <div>
                    <div class="flex justify-between py-1">
                        <h3 class="scroll-m-20 self-start text-3xl font-bold tracking-tight lg:text-4xl ml-4">
                            User's Lists:
                        </h3>
                        <Button variant="outline" disabled>Show more</Button>
                    </div>
                    <div class="flex flex-col border-2 bg-zinc-950 p-[5px] items-center" id="inner_box_right">
                        <ListOfLists></ListOfLists>
                    </div>
                </div>
            </div>


            <div class="flex flex-col border-2 w-1/3 max-md:w-full bg-zinc-950 p-[10px] relative" id="inner_box_right">
                <RightBoxContent loading={loading} class="relative">
                </RightBoxContent>
            </div>
        </div>
    </div>
</div>

<style>
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
