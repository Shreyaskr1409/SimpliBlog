<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

    let follow = true
    let save = true
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
    <Button builders={[builder]} variant="secondary">Settings</Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56">
    <DropdownMenu.Label>Current Blog</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
        <DropdownMenu.Item>
        Show user
        <!-- <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut> -->
        </DropdownMenu.Item>
        {#if follow}
        <DropdownMenu.Item>
        Follow user
        <!-- <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut> -->
        </DropdownMenu.Item>
        {:else}
        <DropdownMenu.Item>
        Unfollow user
        <!-- <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut> -->
        </DropdownMenu.Item>
        {/if}
        <DropdownMenu.Item>
        Report user
        <!-- <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut> -->
        </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
        <DropdownMenu.Item>Blog</DropdownMenu.Item>
        <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>Share blog</DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
            <DropdownMenu.Item>LinkedIn</DropdownMenu.Item>
            <DropdownMenu.Item>Instagram</DropdownMenu.Item>
            <DropdownMenu.Item>X</DropdownMenu.Item>
            <DropdownMenu.Item>WhatsApp</DropdownMenu.Item>
            <DropdownMenu.Item>Email</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>More...</DropdownMenu.Item>
        </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
            {#if save}
            <DropdownMenu.Item>
            Save Blog
            <!-- <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut> -->
            </DropdownMenu.Item>
            {:else}
            <DropdownMenu.Item>
            Unsave Blog
            <!-- <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut> -->
            </DropdownMenu.Item>
            {/if}
        <DropdownMenu.Item>Report blog</DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Sub>
    <DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
    <DropdownMenu.SubContent>
        <DropdownMenu.Item>LinkedIn</DropdownMenu.Item>
        <DropdownMenu.Item>Instagram</DropdownMenu.Item>
        <DropdownMenu.Item>X</DropdownMenu.Item>
        <DropdownMenu.Item>WhatsApp</DropdownMenu.Item>
        <DropdownMenu.Item>Email</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>More...</DropdownMenu.Item>
    </DropdownMenu.SubContent>
    </DropdownMenu.Sub>
    <DropdownMenu.Item>GitHub</DropdownMenu.Item>
    <DropdownMenu.Item>Support Me</DropdownMenu.Item>
    <DropdownMenu.Item>Feedback</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>
        Log out
        <!-- <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut> -->
    </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>