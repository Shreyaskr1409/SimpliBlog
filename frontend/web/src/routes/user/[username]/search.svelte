<script>
    import Input from "$lib/components/ui/input/input.svelte";
    import {Separator} from "$lib/components/ui/separator/index"
    import { MagnifyingGlass } from "svelte-radix"
    import { user } from "../../../stores/user"
    import { onMount } from "svelte"
    import Button from "$lib/components/ui/button/button.svelte";
    import {Person} from "svelte-radix"
  import Settings from "./settings.svelte";

    let loggedinFlag = false

    onMount(async () => {
        loggedinFlag = false
        try {
            const res = await fetch(`/api/v1/users/loggedin-confirm`, {
                    method:  "GET",
                    headers: { 'Content-Type': 'application/json' }
                });
            const data = await res.json();
            console.log(data)
            if (data.data._id == $user.data._id) {
                loggedinFlag = true
            }
        } catch (error) {
            loggedinFlag = false
        }
    });
</script>

<div class="flex flex-row items-center w-full">
    <h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        SimpliBlog
    </h1>
    <div class="w-4"></div>

    <div class="h-10 flex justify-center items-center bg-black rounded-es-xl rounded-ss-xl aspect-square border-[1px] border-r-0">
        <MagnifyingGlass size="30"></MagnifyingGlass>
    </div>
    <Input class="w-full rounded-none rounded-ee-xl rounded-se-xl" placeholder="Search"/>
    <div class="w-4"></div>

    {#if loggedinFlag}
        <div class=" aspect-square h-10 bg-zinc-950 border-[1px] rounded-full flex justify-center items-center">
            <Person></Person>
        </div>
    {:else}
        <Button variant="secondary">Login</Button>
    {/if}
    <div class="w-4"></div>
    
    <Settings sameUser={loggedinFlag}></Settings>
</div>