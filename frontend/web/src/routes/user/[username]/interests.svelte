<script>
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
  import { userInfo } from "../../../stores/userInfo";

</script>
<div class="flex flex-col bg-zinc-900 mt-2 w-full rounded-lg px-1 pb-2">
    <h2 class="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl">
        Interests:
    </h2>
    <div class="flex flex-row justify-center flex-wrap gap-1 pt-2">

        {#if $userInfo && $userInfo.data && $userInfo.data.interests}
            {#each $userInfo.data.interests as interest, index}
                <Badge variant={index % 2 === 0 ? "secondary" : "outline"}>{interest}</Badge>
            {/each}
        {:else}
        <Skeleton class="h-6 w-20"></Skeleton>
        <Skeleton class="h-6 w-28"></Skeleton>
        <Skeleton class="h-6 w-24"></Skeleton>
        <Skeleton class="h-6 w-36"></Skeleton>
        <Skeleton class="h-6 w-24"></Skeleton>
        <Skeleton class="h-6 w-28"></Skeleton>
        <Skeleton class="h-6 w-32"></Skeleton>
        <Skeleton class="h-6 w-24"></Skeleton>
        {/if}
    </div>
</div>