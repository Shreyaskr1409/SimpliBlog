<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
  import { Button } from '@/components/ui/button';
  import { ModeWatcher } from 'mode-watcher';

    let disp = "Processing your Google login..."

    async function handleAuthCode(authCode) {
        try {
            const response = await fetch('/api/v2/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ authorizationCode: authCode }),
                credentials: 'include', // Send and receive cookies
            });

            if (response.ok) {
                disp = "Logged in successfully"
                const data = await response.json();
                console.log('User logged in:', data);
                goto(`/user/${data.data.user.username}`)
            } else {
                const data = await response.json()
                console.error('Error logging in:', data)
                disp = "Login again"
            }
        } catch (err) {
            console.error('Network error:', err);
            disp = `Login failed with error: ${err}`
        }
    }

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get('code');
        if (authCode) {
            handleAuthCode(authCode);
        } else {
            goto('/login')
        }
    });
</script>

<div class="flex flex-col justify-center items-center w-full h-screen">
    <div class="flex flex-col justify-center items-center border-2 bg-zinc-900 p-8 rounded-xl">
        <ModeWatcher defaultMode="dark"/>
        <h1 class="mb-2 font-bold tracking-tight text-2xl">
            {@html disp}
        </h1>
        <Button>Go to login page</Button>
    </div>
</div>