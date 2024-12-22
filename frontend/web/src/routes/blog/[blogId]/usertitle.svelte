<script lang="ts">
    import Calendar from "svelte-radix/Calendar.svelte";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import * as HoverCard from "$lib/components/ui/hover-card/index.js";
    
    import { user } from "../../../stores/user.js";
  import { formatDate } from "$lib/util/dateFormat.js";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
    $: url = `/user/${$user.username}`
</script>

{#if $user.username}
<HoverCard.Root>
    <HoverCard.Trigger
    href={url}
    target="_self"
    rel="noreferrer noopener"
    class="rounded-sm text-xl font-semibold tracking-tight underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
    >
    {$user.fullname}
    </HoverCard.Trigger>
    <HoverCard.Content class="w-80">
    <div class="flex justify-between space-x-4">
        <Avatar.Root>
        <Avatar.Image src={$user.avatar} />
        <Avatar.Fallback>{$user.fullname.charAt(0)}</Avatar.Fallback>
        </Avatar.Root>
        <div class="space-y-1">
            <h4 class="text-lg font-semibold">{$user.fullname}</h4>
            <p class="text-sm">{$user.aboutme}</p>
        <div class="flex items-center pt-2">
            <Calendar class="mr-2 h-4 w-4 opacity-70" />
            <span class="text-xs text-muted-foreground">
            Joined {formatDate($user.createdAt)}
            </span>
        </div>
        </div>
    </div>
    </HoverCard.Content>
</HoverCard.Root>
{:else}
<Skeleton class="h-5 w-40 my-1"></Skeleton>
{/if}