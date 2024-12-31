<script>
    import Listcontent from "$lib/components/my_components/listcontent.svelte";
    import Socialslist from "$lib/components/my_components/socialslist.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
  import { basic } from "../../../stores/basic";
    import { settingSheet } from "../../../stores/sheets";
    import { user } from "../../../stores/user";
    import Interests from "./interests.svelte";


    export let loading

    // let noInterests = $user.interests.length === 0 ? true : false
    let aboutMe
    $: aboutMe = $user.aboutme
    let instagram
    let linkedin
    let facebook
    let github

    $: instagram = $user.socials.find(social => social.platform === "instagram")?.username;
    $: linkedin = $user.socials.find(social => social.platform === "linkedIn")?.url;
    $: facebook = $user.socials.find(social => social.platform === "facebook")?.username;
    $: github = $user.socials.find(social => social.platform === "github")?.username;

</script>


{#if $basic.sameUser === 1}
<Button variant="default" class="mb-2 w-fit m-2 absolute bottom-2 right-2"   on:click={() => { settingSheet.set({...$settingSheet, openEditInfo: true}); }} >Edit Info</Button>
{/if}

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
    About me:
</h1>
{#if loading}
    <div class="flex flex-col">
        <Skeleton class="w-full h-5 my-0.5 rounded-md"></Skeleton>
        <Skeleton class="w-full h-5 my-0.5 rounded-md"></Skeleton>
        <Skeleton class="w-full h-5 my-0.5 rounded-md"></Skeleton>
        <Skeleton class="w-full h-5 my-0.5 rounded-md"></Skeleton>
        <Skeleton class="w-full h-5 my-0.5 rounded-md"></Skeleton>
        <Skeleton class="w-full h-5 my-0.5 rounded-md"></Skeleton>
    </div>
{:else}
    <!-- <p class="mt-1">{aboutMe}</p> -->
    {#if aboutMe}
        <p class="mt-1">{aboutMe}</p>
    {:else}
        <p class="mt-1 text-muted-foreground">User has not added about me</p>
    {/if}
{/if}
<hr class="my-4">
<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
    Socials:
</h1>
<div class="relative h-[80px]">
    <div class="flex w-full absolute left-0 -translate-x-0.5 items-center gap-[8px] py-2 overflow-x-scroll min-h-[80px]">
        {#if loading}
            <Skeleton class=" min-w-60 h-[3.75rem] rounded-[15px]"></Skeleton>
            <Skeleton class=" min-w-60 h-[3.75rem] rounded-[15px]"></Skeleton>
            <Skeleton class=" min-w-60 h-[3.75rem] rounded-[15px]"></Skeleton>
        {:else}
            {#if $user.socials.length === 0}
                <Listcontent title={"No socials added"} date={": ("}></Listcontent>
            {:else}
                {#if instagram}
                    <Socialslist title={"Instagram"} socialId={instagram} imagePath={"/assets/instagram_logo.png"}></Socialslist>
                {/if}
                {#if facebook}
                    <Socialslist title={"Facebook"} socialId={facebook} imagePath={"/assets/facebook_logo.png"}></Socialslist>
                {/if}
                {#if github}
                    <Socialslist title={"Github"} socialId={github} imagePath={"/assets/github_logo.png"}></Socialslist>
                {/if}
                {#if linkedin}
                    <Socialslist title={"LinkedIn"} socialId={linkedin} imagePath={"/assets/linkedin_logo.png"}></Socialslist>
                {/if}
            {/if}
        {/if}
    </div>
</div>
<br>
<Interests loading={loading}></Interests>
<div class="flex-1"></div>
<div class=" w-full h-14 bg-zinc-950"></div>