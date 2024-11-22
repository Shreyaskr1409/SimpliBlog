<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { settingSheet } from "../../../stores/sheets";
    import EditinfoSheet from "./settings/editinfoSheet.svelte";
    import ShareuserSheet from "./settings/shareuserSheet.svelte";
    import {Gear, Person} from "svelte-radix";
  

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
    <Button builders={[builder]} variant="outline" class="w-fit px-2 aspect-square rounded-xl">
        <Gear size="20"></Gear>
    </Button>
    <Button variant="outline" class="w-fit px-2 aspect-square rounded-xl">
        <Person></Person>
    </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56">
    <DropdownMenu.Label>Options</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
        <DropdownMenu.Item   on:click={() => {openSheet("ShareUsr")}}   >Share user</DropdownMenu.Item>
        <DropdownMenu.Item   on:click={() => {openSheet("EditInfo")}}   >Edit information</DropdownMenu.Item>
        <DropdownMenu.Item   on:click={() => {openSheet("Notifica")}}        disabled={true}>Notifications</DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
        <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
            <DropdownMenu.Item     disabled={true}>LinkedIn</DropdownMenu.Item>
            <DropdownMenu.Item     disabled={true}>Instagram</DropdownMenu.Item>
            <DropdownMenu.Item     disabled={true}>X</DropdownMenu.Item>
            <DropdownMenu.Item     disabled={true}>WhatsApp</DropdownMenu.Item>
            <DropdownMenu.Item     disabled={true}>Email</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item     disabled={true}>More...</DropdownMenu.Item>
        </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item on:click={()=> { window.open("https://github.com/Shreyaskr1409/SimpliBlog", "_blank")}}>GitHub</DropdownMenu.Item>
    <DropdownMenu.Item     disabled={true}>Help</DropdownMenu.Item>
    <DropdownMenu.Item     disabled={true}>Support Me</DropdownMenu.Item>
    <DropdownMenu.Item     disabled={true}>Feedback</DropdownMenu.Item>
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
    <Button builders={[builder]} variant="outline" class="w-fit px-2 aspect-square rounded-xl">
        <Gear size="20"></Gear>
    </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56">
    <DropdownMenu.Label>Options</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
        <DropdownMenu.Item   on:click={() => {openSheet("ShareUsr")}}   >Share user</DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
        <DropdownMenu.Item     disabled={true}>Report user</DropdownMenu.Item>
        <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
            <DropdownMenu.Item     disabled={true}>LinkedIn</DropdownMenu.Item>
            <DropdownMenu.Item     disabled={true}>Instagram</DropdownMenu.Item>
            <DropdownMenu.Item     disabled={true}>X</DropdownMenu.Item>
            <DropdownMenu.Item     disabled={true}>WhatsApp</DropdownMenu.Item>
            <DropdownMenu.Item     disabled={true}>Email</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item     disabled={true}>More...</DropdownMenu.Item>
        </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item on:click={()=> { window.open("https://github.com/Shreyaskr1409/SimpliBlog", "_blank")}}>GitHub</DropdownMenu.Item>
    <DropdownMenu.Item     disabled={true}>Help</DropdownMenu.Item>
    <DropdownMenu.Item     disabled={true}>Support Me</DropdownMenu.Item>
    <DropdownMenu.Item     disabled={true}>Feedback</DropdownMenu.Item>
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