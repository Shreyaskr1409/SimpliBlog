<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

    // variables to alter UI elements
    let follow = true
    let loggedIn = false
    

    // function requests for logout when the logout button is clicked
    function logoutReq() {(
        async() => {
            try {
                const res = await fetch(`/api/v1/users/logout`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' }
                })
                if (res.ok) {
                    console.log("Logged Out");
                    loggedIn = false
                } else {
                    loggedIn = true
                    console.log("Could not logout, retry");
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
            } catch (error) {
                console.error("Error encountered: ", error);
            }
        }
    )()}
</script>



<DropdownMenu.Root>

    <DropdownMenu.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline">More...</Button>
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
        

        <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>Add to list</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
                
                <DropdownMenu.Item>New List</DropdownMenu.Item>
    
                <DropdownMenu.Separator />
    
                <DropdownMenu.Item>List 1</DropdownMenu.Item>
                <DropdownMenu.Item>List 2</DropdownMenu.Item>
                <DropdownMenu.Item>List 3</DropdownMenu.Item>
    
            </DropdownMenu.SubContent>
        </DropdownMenu.Sub>


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

    {#if loggedIn}
    <DropdownMenu.Item on:click={logoutReq}>
        Log out
    </DropdownMenu.Item>
    {:else}
    <DropdownMenu.Item on:click={() => (window.location.href = "/login")}>
        Log in
    </DropdownMenu.Item>
    {/if}

    
    </DropdownMenu.Content>
</DropdownMenu.Root>