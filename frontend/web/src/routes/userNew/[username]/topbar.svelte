<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import AvatarDialogue from "./avatarDialogue.svelte";
    import { blogslist } from "../../../stores/blogslist";
    import { user } from "../../../stores/user";
    import { subscribers, subscriptions } from "../../../stores/subscription";
    import { onMount } from "svelte";
    import {Separator} from "$lib/components/ui/separator/index"
    import { Skeleton } from "$lib/components/ui/skeleton";
    import { basic } from "../../../stores/basic";
  import { waitUntilNotEqual } from "$lib/util/waitTillNotEqual";

    let loggedin_confirm = false
    let subscribed_or_not = false
    let subscriptionId
    

    onMount(async () => {
        loggedin_confirm = false

        console.log("Waiting till user is not null");
        await waitUntilNotEqual(() => $user._id, null)
        console.log("User is not null");
        

        try {
            const res = await fetch(`/api/v1/users/loggedin-confirm`, {
                    method:  "GET",
                    headers: { 'Content-Type': 'application/json' }
                });
            const data = await res.json();
            console.log(data)
            if (res.status == 401) {
                basic.set({sameUser: 3})
                return
            }
            if (data.data?._id === $user._id) {
                basic.set({sameUser: 1})
            } else {
                console.log(data.data?._id, "\n" , $user._id)
                basic.set({sameUser: 0})
            }
            
        } catch (error) {
            console.log(error);
            
            basic.set({sameUser: 2})
            loggedin_confirm = false
        }

        try {
            if ($basic.sameUser == 0) {
                const url = new URL(window.location.href);
                let username = url.pathname.split('/').pop(); // Get the last part of the URL
                
                const res = await fetch(`/api/v1/subscription/is-subscribed`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        blogger: username
                    })
                })
                const data = await res.json()
                console.log(data);
                
                
                if (res.ok) {
                    subscribed_or_not = true
                    if (data.data.id) {
                        subscriptionId = data.data._id
                    }
                } else {
                    subscribed_or_not = false
                }
            }
            

        } catch (error) {
            subscribed_or_not = false
            console.log(error);
        }

        console.log(subscribed_or_not);
        
    });

    const subscribe = async () => {
        try {
            console.log($user.data.username);
            
            const res = await fetch(`/api/v1/subscription/subscribe`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    blogger_username: $user.username
                })
            })
            const data = await res.json()
            console.log(data);
            
            if (res.ok) {
                subscribed_or_not = true
                subscriptionId = data.data._id
            } else {
                subscribed_or_not = false
            }
        } catch (error) {
            subscribed_or_not = false
        }
    }

    const unsubscribe = async () => {
        try {
            const res = await fetch(`/api/v1/subscription/unsubscribe`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subscriptionId: subscriptionId
                })
            })
            if (res.ok) {
                subscribed_or_not = false
            } else {
                subscribed_or_not = true
            }
        } catch (error) {
            subscribed_or_not = true
        }
    }
</script>
<div class="flex flex-col items-center w-full">

    <Separator></Separator>
    <div class="h-2"></div>

    <div id="big_container" class="flex items-center w-full">
        <div id="left_container" class="flex items-center">
            <AvatarDialogue></AvatarDialogue>
            <div id="spacer_2" class=""></div>
        </div>

        <div id="right_container" class="flex flex-row items-center grow justify-between max-sm:flex-col max-sm:items-start max-sm:gap-2">
            <div id="names_container">
                <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">{$user.fullname}</h2>
                <p>
                    @{$user.username}
                </p>
                <div class="h-4"></div>



                <p>
                    {#if $subscribers && $subscribers.data && $subscribers.data && $subscribers.data.userSubscribersCount}
                    <span class="cursor-pointer underline underline-offset-2"><span class=" text-2xl">{$subscribers.data.userSubscribersCount}</span> Subscribers</span>
                    {/if}
                    {#if $subscriptions && $subscriptions.data && $subscriptions.data && $subscriptions.data.userSubscriptionsCount}
                    <span class="cursor-pointer underline underline-offset-2"><span class=" text-2xl"> {$subscriptions.data.userSubscriptionsCount}</span> Subscriptions</span>
                    {/if}
                </p>


                {#if $blogslist && $blogslist.data && $blogslist.data.userBlogList}
                    <p><span class="cursor-pointer underline underline-offset-2"><span class=" text-2xl">{$blogslist.data.userBlogList.length}</span> Blogs</span></p>
                {/if}
            </div>
            <!-- <div class="grow"></div> -->
            <div class="flex flex-col justify-center items-center">
                {#if $basic.sameUser === 0}
                    {#if subscribed_or_not}
                    <Button variant="secondary" class="w-24" on:click={unsubscribe}>Unsubscribe</Button>
                    {:else}
                    <Button variant="default" class="w-24" on:click={subscribe}>Subscribe</Button>
                    {/if}
                {:else if $basic.sameUser === 1}
                    <Button variant="secondary" class="w-24" on:click={() => {window.open('/blog/create-blog', "_self")}}>Create Blog</Button>
                {:else if $basic.sameUser === 2}
                    <Skeleton class="w-24 h-10 rounded-md"></Skeleton>
                {:else}
                    <Button variant="default" class="w-24" on:click={() => {window.open("/login", "_self")}}>Subscribe</Button>
                {/if}
            </div>
        </div>
    </div>

    <div class="h-2"></div>
    <Separator></Separator>
</div>

<style>
    #spacer_2{
        min-width: 15px;
    }
</style>