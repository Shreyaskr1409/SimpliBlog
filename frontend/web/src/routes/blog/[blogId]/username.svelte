<script lang="ts">
    import Calendar from "svelte-radix/Calendar.svelte";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import * as HoverCard from "$lib/components/ui/hover-card/index.js";

    import { user } from "../../../stores/user.js";
  import { formatDate } from "$lib/util/dateFormat.js";

    $: url = `/user/${$user.data.username}`
</script>

<HoverCard.Root>
    <HoverCard.Trigger
    href={url}
    target="_blank"
    rel="noreferrer noopener"
    class="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
    >
    @{$user.data.username}
    </HoverCard.Trigger>
    <HoverCard.Content class="w-80">
    <div class="flex justify-between space-x-4">
        <Avatar.Root>
        <Avatar.Image src="https://github.com/shadcn.png" />
        <Avatar.Fallback>SK</Avatar.Fallback>
        </Avatar.Root>
        <div class="space-y-1">
            <h4 class="text-lg font-semibold">{$user.data.fullname}</h4>
            <p class="text-sm">Software developer and a music nerd</p>
        <div class="flex items-center pt-2">
            <Calendar class="mr-2 h-4 w-4 opacity-70" />
            <span class="text-xs text-muted-foreground">
            Joined {formatDate($user.data.createdAt)}
            </span>
        </div>
        </div>
    </div>
    </HoverCard.Content>
</HoverCard.Root>