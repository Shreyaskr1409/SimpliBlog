<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { settingSheet } from "../../../stores/sheets";
    import EditinfoSheet from "./settings/editinfoSheet.svelte";
    import ShareuserSheet from "./settings/shareuserSheet.svelte";
  

    let follow = true
    export let sameUser = true

    const openSheet = (option: string) => {
        switch (option) {
            case "EditInfo":
                settingSheet.set({...$settingSheet, openEditInfo: true})
                break;

            case "ShareUsr":
                settingSheet.set({...$settingSheet, openShareUsr: true})
                break;
        
            default:
                break;
        }
    }

    const logoutfunc = async () => {
        const res = await fetch("/api/v1/users/logout", {
            method: 'POST'
        });
        if (res.ok) {
            console.log(res);
            
            window.location.reload();
        } else {
            console.error("Logout failed");
        }
    };

    
    
</script>


<EditinfoSheet></EditinfoSheet>
<ShareuserSheet></ShareuserSheet>


{#if sameUser}
<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline" class="w-24">Options</Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56">
    <DropdownMenu.Label>Options</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
        <DropdownMenu.Item   on:click={() => {openSheet("ShareUsr")}}   >Share user</DropdownMenu.Item>
        <DropdownMenu.Item   on:click={() => {openSheet("EditInfo")}}   >Edit information</DropdownMenu.Item>
        <DropdownMenu.Item   on:click={() => {openSheet("Notifica")}}   >Notifications</DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
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
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>GitHub</DropdownMenu.Item>
    <DropdownMenu.Item>Help</DropdownMenu.Item>
    <DropdownMenu.Item>Support Me</DropdownMenu.Item>
    <DropdownMenu.Item>Feedback</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item on:click={logoutfunc}>
        Log out
        <!-- <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut> -->
    </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>
{:else}
<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline" class="w-24">Settings</Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56">
    <DropdownMenu.Label>Options</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
        <DropdownMenu.Item   on:click={() => {openSheet("ShareUsr")}}   >Share user</DropdownMenu.Item>
        <DropdownMenu.Item   on:click={() => {openSheet("EditInfo")}}   >Edit information</DropdownMenu.Item>
        <DropdownMenu.Item   on:click={() => {openSheet("Notifica")}}   >Notifications</DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
        <DropdownMenu.Item>Report user</DropdownMenu.Item>
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
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>GitHub</DropdownMenu.Item>
    <DropdownMenu.Item>Help</DropdownMenu.Item>
    <DropdownMenu.Item>Support Me</DropdownMenu.Item>
    <DropdownMenu.Item>Feedback</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item on:click={() => {window.location.href = "/login"}}>
        Log In
    </DropdownMenu.Item>
    <DropdownMenu.Item on:click={() => {window.location.href = "/register"}}>
        Sign up
    </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>
{/if}