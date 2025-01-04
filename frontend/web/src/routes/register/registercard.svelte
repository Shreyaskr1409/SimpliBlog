<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import Reload from "svelte-radix/Reload.svelte";

    import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';


    let registerEmail =           ""
    let registerUsername =        ""
    let registerFullname =        ""
    let registerPassword =        ""
    let registerConfirmPassword = ""
    let passwordMatch =         true
    let registeredSuccessfully =  false
    let serverDown = false
    let loading = false
    let disabled = ""
    let errorMessage = ""

    $: if (loading) {
        disabled = "disabled"
    } else {
        disabled = ""
    }


    // request to register to the server
    function registerInfo() {
        (async () => {
            errorMessage = ""
            loading = true
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
                let data = await res.json()
                console.log(data)
                if (res.ok) {
                    // registeredSuccessfully.set(true);
                    registeredSuccessfully = true
                    console.log("registered");
                    window.location.href = '/login';
                } else if (res.status >= 500) {
                    serverDown = true
                    errorMessage = data.message
                    registeredSuccessfully = false
                } else {
                    // registeredSuccessfully.set(false);
                    registeredSuccessfully = false
                    errorMessage = data.message
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }


            } catch (error) {
                console.error("Error encountered: ", error);
            } finally {
                loading = false
            }
        })()
    }

    const googleClientId = PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = "http://localhost:5173/login/redirect"; // Replace with your frontend redirect URI

    function handleGoogleLogin() {
        const oauthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile`;
        window.location.href = oauthUrl;
    }

</script>

<Card.Root class="w-[350px] md:w-[500px] bg-zinc-900">
    <Card.Header>
        <Card.Title>Welcome to Simpliblog!</Card.Title>
        <Card.Description>Create a Simpliblog account</Card.Description>

        {#if registeredSuccessfully}
        <!-- {#if $registeredSuccessfully} -->
            <Card.Description class="text-green-500">Registered Successfully!!!</Card.Description>
        {/if}
        {#if !passwordMatch}
            <Card.Description class="text-red-500">Password and Confirm password do not match!</Card.Description>
        {/if}
        {#if serverDown}
            <Card.Description class="text-pink-500">Sorry for the inconvenience, the server is down</Card.Description>
        {/if}
        {#if errorMessage}
            <Card.Description class="text-red-500">{errorMessage}</Card.Description>
        {/if}
    </Card.Header>
    <Card.Content>
        <form>
        <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
                <Label for="email">Email</Label>
                <Input bind:value={registerEmail} id="email" placeholder="Enter your email" {disabled}/>
            </div>
            <div class="flex flex-row items-center justify-center flex-wrap gap-4">    
                <div class="flex flex-col space-y-1.5 grow">
                    <Label for="username">Username</Label>
                    <Input bind:value={registerUsername} id="username" placeholder="Enter a username" {disabled}/>
                </div>
                <div class="flex flex-col space-y-1.5 grow">
                    <Label for="fullname">Full Name</Label>
                    <Input bind:value={registerFullname} id="fullname" placeholder="Enter your fullname" {disabled}/>
                </div>
            </div>
            <div class="flex flex-col space-y-1.5">
                <Label for="password">Password</Label>
                <Input bind:value={registerPassword} id="password" type="password" placeholder="Enter a password" {disabled}/>
            </div>
            <div class="flex flex-col space-y-1.5">
                <Label for="confirmPassword">Confirm Password</Label>
                <Input bind:value={registerConfirmPassword} id="confirmPassword" type="password" placeholder="Enter your password again" {disabled}/>
            </div>
        </div>
        </form>
    </Card.Content>
    <Card.Footer class="flex justify-between">
        <Button variant="outline" {disabled} on:click={() => window.history.back()}>Back</Button>
        <Button variant="outline" on:click={handleGoogleLogin}>
            <img
                class="w-5 h-5 mr-2"
                src="https://upload.wikimedia.org/wikipedia/commons/archive/c/c1/20230822192910%21Google_%22G%22_logo.svg"
                alt="Google Icon"
            />
            Sign Up with Google
        </Button>
        <Button on:click={registerInfo} {disabled}>
            {#if loading}
                <Reload class="mr-2 h-4 w-4 animate-spin" ></Reload>
            {/if}
            Register
        </Button>
    </Card.Footer>
    <Card.Footer>
        <Card.Description class="grow">Already have an account?</Card.Description>
        <Button variant="outline" on:click={() => {window.location.href = '/login'}} {disabled}>Login</Button>
    </Card.Footer>
</Card.Root>