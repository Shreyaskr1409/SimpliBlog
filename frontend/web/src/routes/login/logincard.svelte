<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import Reload from "svelte-radix/Reload.svelte";

    import { PUBLIC_GOOGLE_CLIENT_ID, PUBLIC_REDIRECT_URI } from '$env/static/public';

    let loginUserName =     ""
    let loginUserPassword = ""
    let userdoesnotexist =  false
    let wrongPassword = false
    let loggedInSuccessfully =  false
    let serverDown = false
    let loading = false
    let disabled = ""
    let errorMessage = ""

    $: if (loading) {
        disabled = "disabled"
    } else {
        disabled = ""
    }

    // Request to log in to the server
    function loginCall() {
        (async () => {
            loading = true
            try {
                const res = await fetch("/api/v1/users/login", {
                    method:  "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body:    JSON.stringify({
                        usernameOrEmail: loginUserName,
                        password:        loginUserPassword
                    })
                })
                const res_data = await res.json()
                console.log(res_data.data);


                if (res.ok) {
                    loggedInSuccessfully = true
                    userdoesnotexist = false
                    wrongPassword = false
                    window.location.href = `/user/${res_data.data.user.username}`
                } else if (res.status >= 500) {
                    serverDown = true
                    userdoesnotexist = false
                    wrongPassword = false
                    errorMessage = res_data.message
                } else {
                    loggedInSuccessfully = false
                    errorMessage = res_data.message

                    if (res.status == 404) {
                        userdoesnotexist = true
                    } else if (res.status == 401) {
                        wrongPassword = true
                    }
                }
            } catch (error) {
                errorMessage = error
                console.error("Error encountered: ", error);
            } finally {
                loading = false
            }
        })()
    }

    const googleClientId = PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = PUBLIC_REDIRECT_URI

    function handleGoogleLogin() {
        const oauthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile`;
        window.location.href = oauthUrl;
    }

</script>

<Card.Root class="w-[350px] md:w-[500px] bg-zinc-900">
    <Card.Header>
        <Card.Title>Welcome back to Simpliblog!</Card.Title>
        <Card.Description>Login into your Simpliblog account</Card.Description>
        {#if loggedInSuccessfully}
        <Card.Description class="text-green-500">Logged in Successfully!!!</Card.Description>
        {/if}
        {#if userdoesnotexist}
            <Card.Description class="text-red-500">User with given username or email does not exist</Card.Description>
        {/if}
        {#if wrongPassword}
            <Card.Description class="text-red-500">Wrong Password</Card.Description>
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
            <Label for="name">Username or email</Label>
            <Input bind:value={loginUserName} id="name" placeholder="Enter your username or email" {disabled} />
            </div>


            <div class="flex flex-col space-y-1.5">
            <Label for="password">Password</Label>
            <Input bind:value={loginUserPassword} id="password" type="password" placeholder="Enter your password" {disabled} />
            </div>


        </div>
        </form>
    </Card.Content>
    <Card.Footer class="flex justify-between">

        <Button variant="outline" {disabled} on:click={() => window.history.back()}>Cancel</Button>
        <Button variant="outline" on:click={handleGoogleLogin}>
            <img
                class="w-5 h-5 mr-2"
                src="https://upload.wikimedia.org/wikipedia/commons/archive/c/c1/20230822192910%21Google_%22G%22_logo.svg"
                alt="Google Icon"
            />
            Login with Google
        </Button>
        <Button on:click={loginCall} {disabled}>
            {#if loading}
                <Reload class="mr-2 h-4 w-4 animate-spin" ></Reload>
            {/if}
            Login
        </Button>
    </Card.Footer>
    <Card.Footer>
        <Card.Description class="grow">Do not have an account?</Card.Description>
        <Button variant="outline" on:click={() => {window.location.href = '/register'}} {disabled}>Sign Up</Button>
    </Card.Footer>
</Card.Root>