<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    let registerEmail =           ""
    let registerUsername =        ""
    let registerFullname =        ""
    let registerPassword =        ""
    let registerConfirmPassword = ""
    let passwordMatch =         true
    let registeredSuccessfully =  false

    function registerInfo() {
        (async () => {
            try {
                passwordMatch = (registerPassword === registerConfirmPassword) ? true : false
                if (!passwordMatch) {
                    throw new Error("Passwords don't match")
                }


                const res = await fetch("/api/v1/users/register", {
                    method:  "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body:    JSON.stringify({
                        email:    registerEmail,
                        username: registerUsername,
                        fullname: registerFullname,
                        password: registerPassword
                    })
                })
                if (res.ok) {
                    registeredSuccessfully = true
                    console.log("registered");
                    window.location.href = '/user';
                } else {
                    registeredSuccessfully = false
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
        <Card.Title>Welcome to Simpliblog!</Card.Title>
        <Card.Description>Create a Simpliblog account</Card.Description>

        {#if registeredSuccessfully}
            <Card.Description class="text-green-500">Registered Successfully!!!</Card.Description>
        {/if}
        {#if !passwordMatch}
            <Card.Description class="text-red-500">Password and Confirm password do not match!</Card.Description>
        {/if}
    </Card.Header>
    <Card.Content>
        <form>
        <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
                <Label for="email">Email</Label>
                <Input bind:value={registerEmail} id="email" placeholder="Enter your email" />
            </div>
            <div class="flex flex-row items-center justify-center">    
                <div class="flex flex-col space-y-1.5">
                    <Label for="username">Username</Label>
                    <Input bind:value={registerUsername} id="username" placeholder="Enter a username" />
                </div>
                <div class=" w-4"></div>
                <div class="flex flex-col space-y-1.5">
                    <Label for="fullname">Full Name</Label>
                    <Input bind:value={registerFullname} id="fullname" placeholder="Enter your fullname" />
                </div>
            </div>
            <div class="flex flex-col space-y-1.5">
                <Label for="password">Password</Label>
                <Input bind:value={registerPassword} id="password" type="password" placeholder="Enter a password" />
            </div>
            <div class="flex flex-col space-y-1.5">
                <Label for="confirmPassword">Confirm Password</Label>
                <Input bind:value={registerConfirmPassword} id="confirmPassword" type="password" placeholder="Enter your password again" />
            </div>
        </div>
        </form>
    </Card.Content>
    <Card.Footer class="flex justify-between">
        <Button variant="outline">Back</Button>
        <Button on:click={registerInfo}>Register</Button>
    </Card.Footer>
    <Card.Footer>
        <Card.Description class="grow">Already have an account?</Card.Description>
        <Button variant="outline">Login</Button>
    </Card.Footer>
</Card.Root>