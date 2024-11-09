<script>
    import { ModeWatcher } from "mode-watcher";
    import Topbar from "./topbar.svelte";
    import RightBoxContent from "./rightBoxContent.svelte";
    import Banner from "./banner.svelte";
    import Blogslist from "./blogslist.svelte";
    import { onMount } from "svelte";
    import { userInfo } from "../../../stores/userInfo";
    import { user } from "../../../stores/user";
    import { subscribers, subscriptions } from "../../../stores/subscription";
    import Search from "./search.svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";

    let username
    let nouserinfoflag = false
    onMount(async () => {
        userInfo.set({})
        try {
            const url = new URL(window.location.href);
            username = url.pathname.split('/').pop(); // Get the last part of the URL

            const res = await fetch(`/api/v1/users/get-user-info/${username}`);
            const data = await res.json()
            userInfo.set(data);
            console.log($userInfo);
            if(!res.ok) {
                nouserinfoflag = true
            }
        } catch (error) {
            nouserinfoflag = true
        }
    });
    onMount(async () => {
        user.set({})
        try {
            const url = new URL(window.location.href);
            username = url.pathname.split('/').pop(); // Get the last part of the URL

            const res = await fetch(`/api/v1/users/get-user/${username}`);
            const data = await res.json()
            user.set(data);
            console.log($user);
        } catch (error) {

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

        }
    });
    

    let aboutMe
    let instagram
    let linkedin
    let facebook
    let github
    $: if ($userInfo && $userInfo.data && $userInfo.data.aboutme) {
        aboutMe = $userInfo.data.aboutme
    }

    $: if ($userInfo && $userInfo.data && $userInfo.data.socials) {
        const instagramSocial = $userInfo.data.socials.find(social => social.platform === "instagram");
        instagram = instagramSocial ? instagramSocial.username : undefined;
    }

    $: if ($userInfo && $userInfo.data && $userInfo.data.socials) {
        const linkedinSocial = $userInfo.data.socials.find(social => social.platform === "linkedIn");
        linkedin = linkedinSocial ? linkedinSocial.url : undefined;
    }

    $: if ($userInfo && $userInfo.data && $userInfo.data.socials) {
        const facebookSocial = $userInfo.data.socials.find(social => social.platform === "facebook");
        facebook = facebookSocial ? facebookSocial.username : undefined;
    }

    $: if ($userInfo && $userInfo.data && $userInfo.data.socials) {
        const githubSocial = $userInfo.data.socials.find(social => social.platform === "github");
        github = githubSocial ? githubSocial.username : undefined;
    }
</script>

<head>
    <title>SimpliBlog</title>
</head>

<div class="w-full flex flex-col justify-start items-center">
    <ModeWatcher />
    <div id="bigcont" class="flex flex-col items-center w-full h-screen my-8 gap-2 max-w-[1300px] max-2xl:w-[90%]">
        <div class="w-2/3 h-fit p-2 bg-zinc-900 rounded-2xl max-xl:w-[800px] max-lg:w-[700px] max-md:w-full">
            <Search></Search>
        </div>
        <div class=" bg-zinc-900 flex flex-row gap-[10px] justify-start border-2 min-h-[800px] max-md:flex-col" id="outer_box">
            <div class="flex flex-col w-2/3 max-md:w-full" id="inner_box_left">


                

                <!-- <Search></Search>
                <div class="h-2"></div>
                <Separator></Separator>
                <div class="h-2"></div> -->

                <Banner></Banner>
                <div id="spacer_1"></div>
                <Topbar></Topbar>
                <div id="spacer_1"></div>

                
                <h3 class="scroll-m-20 self-start text-3xl font-bold tracking-tight lg:text-4xl ml-4">
                    User's Blogs:
                </h3>
                <div class="flex flex-col border-2 bg-zinc-950 p-[5px] items-center" id="inner_box_right">
                    <Blogslist></Blogslist>
                </div>
            </div>


            <div class="flex flex-col border-2 w-1/3 max-md:w-full bg-zinc-950 p-[10px]" id="inner_box_right">
                <RightBoxContent nouserinfo={nouserinfoflag} aboutMe={aboutMe} linkedin={linkedin} instagram={instagram} facebook={facebook} github={github}></RightBoxContent>
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