<script>
    import Input from "$lib/components/ui/input/input.svelte";
    import {Separator} from "$lib/components/ui/separator/index"
    import { MagnifyingGlass } from "svelte-radix"
    import { onDestroy, onMount } from "svelte"
    import Button from "$lib/components/ui/button/button.svelte";
    import Settings from "./settings.svelte";
  import { basic } from "../../../stores/basic";

    let loggedinFlag = $basic.sameUser === 3
    $: loggedinFlag = $basic.sameUser !== 3

    let searchQuery = ""
    let searchResults = []
    let debounceTimeout
    const search = async () => {
        if (debounceTimeout){
            clearTimeout(debounceTimeout)
        }
        
        debounceTimeout = setTimeout(async () => {
            if (searchQuery === "" || searchQuery.length < 3) {
                searchResults = []
                return
            }
            
            try {
                const req = await fetch(`/api/v1/search?searchQuery=${searchQuery}`)
                if (req.ok) {
                    const data = await req.json()
                    searchResults = data.data.users
                    console.log(searchResults)
                }
            } catch (error) {
                console.error("Fetch error:", error)
            }
        }, 600)
    }

    onDestroy(() => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout)
        }
    })
</script>

<div class="flex flex-row items-center w-full">
    <h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        SimpliBlog
    </h1>
    <div class="w-4"></div>

    <div class="max-md:hidden flex-row flex items-center w-full gap-2">
        <div class="flex flex-col items-center w-full">




            <div class="flex flex-row items-center w-full">
                <div class="h-10 flex justify-center items-center bg-black rounded-es-xl rounded-ss-xl aspect-square border-[1px] border-r-0">
                    <MagnifyingGlass size="30"></MagnifyingGlass>
                </div>
                <Input on:input={search} bind:value={searchQuery} class="w-full rounded-none rounded-ee-xl rounded-se-xl" placeholder="Search Users"/>
            </div>


            
            <div class="relative w-full">
                {#if searchQuery.length >= 3}
                <div class="absolute top-0 left-1/2 -translate-x-1/2 h-fit w-full bg-zinc-950 my-2 border-[1px] rounded-lg flex flex-col p-2 z-20">
                    {#if searchResults.length === 0}
                    <h3 class="w-full text-center">No results</h3>
                    {:else}
                        {#each searchResults as user}
                        <div class="flex flex-row gap-2 w-full items-center">
                            <div class="h-10 aspect-square rounded-full bg-white"></div>

                            <div class="flex flex-col w-full justify-center">
                                <button class="text-md hover:underline cursor-pointer w-fit" on:click={() => window.open(`/user/${user.username}`, "_self")}>{user.fullname}</button>
                                <button class="text-sm hover:underline cursor-pointer w-fit" on:click={() => window.open(`/user/${user.username}`, "_self")}>@{user.username}</button>
                            </div>
                        </div>
                        <Separator class="my-2 w-full"></Separator>
                        {/each}
                        <h3 class="w-full text-center text-sm">Found results</h3>
                    {/if}
                </div>
                {/if}
            </div>
        </div>







        {#if !loggedinFlag}
            <Button variant="secondary" on:click={() => {window.open("/login", "_self")}}>Login</Button>
        {/if}

    </div>

    <div class="md:hidden flex-row flex grow items-center w-full gap-2">
        <div class="flex flex-nowrap w-full justify-end">
            <button on:click={() => {}} class="h-10 flex justify-center items-center bg-black rounded-es-xl rounded-ss-xl max-[580px]:rounded-xl aspect-square border-[1px]">
                <MagnifyingGlass size="25"></MagnifyingGlass>
            </button>
            <Input class="w-full rounded-none rounded-ee-xl rounded-se-xl max-[580px]:hidden" placeholder="Search (Coming Soon)"/>
        </div>

        {#if !loggedinFlag}
            <Button variant="secondary" on:click={() => {window.open("/login", "_self")}}>Login</Button>
        {/if}
    </div>

    <div class="min-w-1"></div>
    <Settings></Settings>
</div>