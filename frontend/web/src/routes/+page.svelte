<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import { onMount } from "svelte";
    import {ModeWatcher} from "mode-watcher";

    // onMount( async() => {
    //     window.location.href = '/user/lua';
    // })
</script>

<div class="h-screen w-screen bg-black flex flex-col items-center justify-center">
    <ModeWatcher></ModeWatcher>
    <h1 class="text-white text-lg">Welcome to Simpliblog</h1>
    <div class="h-2"></div>
    <Button variant="secondary" on:click={() => { window.open("/user/lua", "_self") }}>Check Website</Button>
</div>