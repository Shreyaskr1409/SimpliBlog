<script>
  import Listcontent from "$lib/components/my_components/listcontent.svelte";
import Socialslist from "$lib/components/my_components/socialslist.svelte";
  import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
  import Interests from "./interests.svelte";

    // export let aboutMe = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, esse cupiditate? Nobis quae voluptatum ab facere ratione. Est, reprehenderit similique aliquid, recusandae et veritatis harum quod quidem eaque maiores error.
    // Autem vero pariatur quidem ipsa expedita laboriosam illum debitis nobis animi! Modi ea, itaque corrupti vero corporis nisi. Amet soluta possimus facere minus eum error sed quasi nisi beatae aspernatur!`
    export let instagram
    export let linkedin
    export let facebook
    export let github
    export let aboutMe

    export let nouserinfo = false
</script>
<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
    About me:
</h1>
{#if aboutMe}
    <p class="mt-1">{aboutMe}</p>
{:else if nouserinfo}
    <p class="mt-1 text-muted-foreground">User has not added about me</p>
{:else}
    <div class="flex flex-col gap-1">
        <Skeleton class="w-full h-5 rounded-md"></Skeleton>
        <Skeleton class="w-full h-5 rounded-md"></Skeleton>
        <Skeleton class="w-full h-5 rounded-md"></Skeleton>
        <Skeleton class="w-full h-5 rounded-md"></Skeleton>
        <Skeleton class="w-full h-5 rounded-md"></Skeleton>
        <Skeleton class="w-full h-5 rounded-md"></Skeleton>
    </div>
{/if}
<hr class="my-4">
<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
    Socials:
</h1>
<div class="flex items-center gap-[8px] py-2 overflow-x-scroll min-h-[90px]">
    {#if nouserinfo}
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
        {#if !linkedin && !facebook && !github && !instagram}
        <Skeleton class=" min-w-60 h-[3.75rem] rounded-[15px]"></Skeleton>
        <Skeleton class=" min-w-60 h-[3.75rem] rounded-[15px]"></Skeleton>
        <Skeleton class=" min-w-60 h-[3.75rem] rounded-[15px]"></Skeleton>
        {/if}
    {/if}
</div>
<br>
<Interests></Interests>