<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar";
    import { Input } from "$lib/components/ui/input/index.js";
</script>

<div class="h-fit grow flex flex-row items-center justify-between">
    <Avatar.Root>
        <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
        <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>

    <div>
        <Input type="Search" placeholder="email" class=" max-w-60" />
    </div>
</div>