<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import AvatarDialogue from "./avatarDialogue.svelte";
    import Settings from "./settings.svelte";
    import { blogslist } from "../../../stores/blogslist";
    import { user } from "../../../stores/user";
    import { subscribers, subscriptions } from "../../../stores/subscription";
    import { onMount } from "svelte";
    import {Separator} from "$lib/components/ui/separator/index"

    let loggedinFlag = false

    onMount(async () => {
        loggedinFlag = false
        try {
            const res = await fetch(`/api/v1/users/loggedin-confirm`, {
                    method:  "GET",
                    headers: { 'Content-Type': 'application/json' }
                });
            const data = await res.json();
            console.log(data)
            if (data.data._id == $user.data._id) {
                loggedinFlag = true
            }
        } catch (error) {
            loggedinFlag = false
        }
    });
</script>
<div class="flex flex-col items-center w-full">

    <Separator></Separator>
    <div class="h-2"></div>

    <div id="big_container" class="flex items-center w-full">
        <div id="left_container" class="flex items-center">
            <AvatarDialogue></AvatarDialogue>
            <div id="spacer_2" class=""></div>
        </div>

        <div id="right_container" class="flex items-center grow">
            <div id="names_container">
                {#if $user && $user.data}
                    <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">{$user.data.fullname}</h2>
                    <p>
                        @{$user.data.username}
                    </p>
                {/if}
                <div class="h-4"></div>



                <!-- {#if $subscribers && $subscribers.data && $subscribers.data && $subscribers.data.userSubscribersCount}
                    <p class="underline underline-offset-2"><span class="cursor-pointer"><span class=" text-2xl">{$subscribers.data.userSubscribersCount}</span> Subscribers</span></p>
                {/if}
                {#if $subscriptions && $subscriptions.data && $subscriptions.data && $subscriptions.data.userSubscriptionsCount}
                    <p class="underline underline-offset-2"><span class="cursor-pointer"><span class=" text-2xl">{$subscribers.data.userSubscriptionsCount}</span> Subscriptions</span></p>
                {/if} -->

                <p>
                    {#if $subscribers && $subscribers.data && $subscribers.data && $subscribers.data.userSubscribersCount}
                    <span class="cursor-pointer underline underline-offset-2"><span class=" text-2xl">{$subscribers.data.userSubscribersCount}</span> Subscribers,</span>
                    {/if}
                    {#if $subscriptions && $subscriptions.data && $subscriptions.data && $subscriptions.data.userSubscriptionsCount}
                    <span class="cursor-pointer underline underline-offset-2"><span class=" text-2xl">{$subscriptions.data.userSubscriptionsCount}</span> Subscriptions</span>
                    {/if}
                </p>


                {#if $blogslist && $blogslist.data && $blogslist.data.userBlogList}
                    <p><span class="cursor-pointer underline underline-offset-2"><span class=" text-2xl">{$blogslist.data.userBlogList.length}</span> Blogs</span></p>
                {/if}
            </div>
            <div class="grow"></div>
            <div class="flex flex-col justify-center items-center">
                {#if !loggedinFlag}
                    <Button variant="default" class="w-24">Subscribe</Button>
                {/if}
                <div class="min-h-1"></div>
                {#if loggedinFlag}
                    <Button variant="secondary" class="w-24" on:click={() => {window.location.href = '/blog/create-blog';}}>Create Blog</Button>
                {/if}
                <div class="min-h-1"></div>
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