<script>
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
  import { user } from "../../../stores/user";

    export let loading
</script>
<div class="flex flex-col bg-zinc-900 mt-2 w-full rounded-lg px-1 pb-2">
    <h2 class="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl">
        Interests:
    </h2>
    <div class="flex flex-row justify-center flex-wrap gap-1 pt-2">

        {#if loading}
            <Skeleton class="h-6 w-20"></Skeleton>
            <Skeleton class="h-6 w-28"></Skeleton>
            <Skeleton class="h-6 w-24"></Skeleton>
            <Skeleton class="h-6 w-36"></Skeleton>
            <Skeleton class="h-6 w-24"></Skeleton>
            <Skeleton class="h-6 w-28"></Skeleton>
            <Skeleton class="h-6 w-32"></Skeleton>
            <Skeleton class="h-6 w-24"></Skeleton>
        {:else}
            {#if $user.interests.length !== 0}
                {#each $user.interests as interest, index}
                    <Badge variant={index % 2 === 0 ? "secondary" : "outline"}>{interest}</Badge>
                {/each}
            {:else}
                <Badge variant="secondary">User has not added any interests</Badge>
            {/if}
        {/if}
    </div>
</div>