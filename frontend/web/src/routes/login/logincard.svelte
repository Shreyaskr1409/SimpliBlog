<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    let loginUserName =     ""
    let loginUserPassword = ""
    let userdoesnotexist =  false
    let loggedInSuccessfully =  false

    // Request to log in to the server
    function logInfo() {
        (async () => {
            try {
                const res = await fetch("/api/v1/users/login", {
                    method:  "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body:    JSON.stringify({
                        usernameOrEmail: loginUserName,
                        password:        loginUserPassword
                    })
                })

                if (res.ok) {
                    loggedInSuccessfully = true
                    userdoesnotexist = false
                    console.log("logged in");
                    window.location.href = '/user';
                } else {
                    loggedInSuccessfully = false
                    userdoesnotexist = true
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
            } catch (error) {
                console.error("Error encountered: ", error);
            }
        })()
    }
</script>

<Card.Root class="w-[500px] bg-zinc-900">
    <Card.Header>
        <Card.Title>Welcome back to Simpliblog!</Card.Title>
        <Card.Description>Login into your Simpliblog account</Card.Description>
        {#if loggedInSuccessfully}
        <Card.Description class="text-green-500">Logged in Successfully!!!</Card.Description>
        {/if}
        {#if userdoesnotexist}
            <Card.Description class="text-red-500">User with given username or email does not exist</Card.Description>
        {/if}
    </Card.Header>
    <Card.Content>
        <form>
        <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
            <Label for="name">Username or email</Label>
            <Input bind:value={loginUserName} id="name" placeholder="Enter your username or email" />
            </div>
            <div class="flex flex-col space-y-1.5">
            <Label for="password">Password</Label>
            <Input bind:value={loginUserPassword} id="password" type="password" placeholder="Enter your password" />
            </div>
        </div>
        </form>
    </Card.Content>
    <Card.Footer class="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button on:click={logInfo}>Login</Button>
    </Card.Footer>
    <Card.Footer>
        <Card.Description class="grow">Do not have an account?</Card.Description>
        <Button variant="outline">Register</Button>
    </Card.Footer>
</Card.Root>