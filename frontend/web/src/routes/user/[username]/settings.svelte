<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { basic } from "../../../stores/basic";
  import { currentUser } from "../../../stores/currentUser";
    import { settingSheet } from "../../../stores/sheets";
    import EditinfoSheet from "./settings/editinfoSheet.svelte";
    import ShareuserSheet from "./settings/shareuserSheet.svelte";
    import {Gear, Person} from "svelte-radix";
  

    let sameUser = $basic.sameUser === 1
    $: sameUser = $basic.sameUser === 1
    settingSheet.set(
        {
            openEditInfo: false,
            openShareUsr: false,
            openEditImage: false,
        }
    );

    const openSheet = (option: string) => {
        switch (option) {
            case "EditInfo":
                console.log("Edit info")
                settingSheet.set({...$settingSheet, openEditInfo: true})
                break;

            case "ShareUsr":
                console.log("Share user")
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


<ShareuserSheet></ShareuserSheet>
<EditinfoSheet></EditinfoSheet>


{#if sameUser}
<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline" class="w-fit px-2 aspect-square rounded-xl">
        <Gear size="20"></Gear>
    </Button>
    <div class="min-w-1"></div>
    {#if $basic.sameUser !== 3}
        <div class="min-w-1"></div>
        {#if $currentUser.data.avatar}
            <a href={`/user/${$currentUser.data.username}`}>
                <img src={$currentUser.data.avatar} class=" aspect-square h-10 border rounded-xl hover:cursor-pointer" alt="">
            </a>
        {:else}
            <Button variant="outline" class="w-fit px-2 aspect-square rounded-xl" on:click={() => {window.open(`/user/${$currentUser.data.username}`)}}>
                <Person></Person>
            </Button>
        {/if}
    {/if}
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
    {#if $basic.sameUser !== 3}
        <div class="min-w-1"></div>
        {#if $currentUser.data.avatar}
            <a href={`/user/${$currentUser.data.username}`}>
                <img src={$currentUser.data.avatar} class=" aspect-square h-10 border rounded-xl hover:cursor-pointer" alt="">
            </a>
        {:else}
            <Button variant="outline" class="w-fit px-2 aspect-square rounded-xl" on:click={() => {window.open(`/user/${$currentUser.data.username}`)}}>
                <Person></Person>
            </Button>
        {/if}
    {/if}
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
    {#if $basic.sameUser !== 3}
        <DropdownMenu.Item on:click={logoutfunc}>
            Log out
            <!-- <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut> -->
        </DropdownMenu.Item>
    {:else}
        <DropdownMenu.Item on:click={() => {window.location.href = "/login"}}>
            Log In
        </DropdownMenu.Item>
        <DropdownMenu.Item on:click={() => {window.location.href = "/register"}}>
            Sign up
        </DropdownMenu.Item>
    {/if}
    </DropdownMenu.Content>
</DropdownMenu.Root>
{/if}