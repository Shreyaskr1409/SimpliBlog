<script>
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import { Button } from "$lib/components/ui/button";
    import Input from "$lib/components/ui/input/input.svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import * as Sheet from '$lib/components/ui/sheet/index';
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import { writable } from "svelte/store";
    import { settingSheet } from "../../../../stores/sheets";
  import { onMount } from "svelte";

    const currentUser = writable({
        data: {
            username: "",
            fullname: "",
            email: "",
            id: "",
            avatar: "",
            aboutme: "",
            socials: [
                {
                    platform: "",
                    username: "",
                    url: "",
                    _id: "",
                },
            ],
            personalWebsiteUrl: "",
            interests: []
        },
    });

    onMount(async () => {
        try {
            const res1 = await fetch(`/api/v1/users/get-currentuser`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (res1.ok) {
                const data = await res1.json();
                console.log("Current user data:", data);
                currentUser.set(data);
            } else {
                console.error("Failed to fetch current user");
                return;
            }

            let currentUserData;
            currentUser.subscribe((value) => {
                currentUserData = value;
            });

            const res2 = await fetch(`/api/v1/users/get-user-info/${currentUserData.data.username}`);
            if (res2.ok) {
                const additionalData = await res2.json();
                console.log("Additional user info:", additionalData);

                // Merge additional data into the current user store
                currentUser.update((current) => ({
                    ...current,
                    data: {
                        ...current.data,
                        ...additionalData.data,
                    },
                }));
                
            } else {
                console.error("Failed to fetch additional user info");
            }
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    });

    $: console.log("Current User: \n", $currentUser);
    

    let interestsList = []
    let removedInterestsList = []

    $: {
        if ($currentUser.data?.interests?.length > 0) {
            interestsList = [...$currentUser.data.interests];
        }
    }
    // $: console.log(interestsList);
    // $: console.log(removedInterestsList);
    
    function addInterest(interest) {
        if (!interest || interest === "") {
            console.log("no addingInterest", interest);
            return
        }
        interestsList = [...interestsList, interest]
    }

    function handleAddInterests(addingInterest) {
        if (!addingInterest || addingInterest === "") {
            console.log("no addingInterest", addingInterest);
            return
        }
        interestsList = [...interestsList, addingInterest]

        const index = removedInterestsList.indexOf(addingInterest)
        removedInterestsList = [
            ...removedInterestsList.slice(0, index), 
            ...removedInterestsList.slice(index + 1)
        ]
        addingInterest = ""
    }

    function handleRemoveInterests(removingInterest) {
        if (!removingInterest || removingInterest === "") {
            console.log("no removingInterest", removingInterest);
            return
        }
        removedInterestsList = [...removedInterestsList, removingInterest]
        console.log(removedInterestsList);
        
        const index = interestsList.indexOf(removingInterest)
        if (index !== -1) {
            interestsList = [
                ...interestsList.slice(0, index),
                ...interestsList.slice(index+1)
            ]
        }
        
        removingInterest = ""
    }

</script>

<Sheet.Root bind:open={$settingSheet.openEditInfo}>




            {#if $currentUser.data.username != ""}
            <Sheet.Content side="right" class="min-w-[500px] overflow-y-scroll">
                <Sheet.Header>
                <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Edit Account Information</h3>
                <p class="text-muted-foreground text-sm mt-0">You can edit most of your informations here</p>
                </Sheet.Header>

                <div class="my-4 p-4 bg-zinc-900 rounded-lg grid gap-2">

                    <p class="text-muted-foreground text-sm mt-0">You will be asked to enter password in order to change these fields</p>

                    <div class="grid grid-cols-4 items-center">
                        <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">Username</h4>
                        <Input value={$currentUser.data.username} class="col-span-3"/>
                    </div>


                    <div class="grid grid-cols-4 items-center">
                        <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">Full Name</h4>
                        <Input value={$currentUser.data.fullname} class="col-span-3"/>
                    </div>


                    <div class="grid grid-cols-4 items-center">
                        <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">Email</h4>
                        <Input value={$currentUser.data.email} class="col-span-3"/>
                    </div>
                </div>

                <div class="my-4 p-4 bg-zinc-900 rounded-lg flex flex-col">
                    <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">About</h4>
                    <Textarea class="bg-black min-h-40" value={$currentUser.data.aboutme}></Textarea>

                    <div class="mt-4"></div>

                    <div class="rounded-lg w-full h-fit p-2 bg-black">
                        <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">Interests</h4>
                        <h6 class=" ml-1 text-sm text-muted-foreground">CLICK on the interest badges to remove them and CLICK on badges from removed section to UNDO changes</h6>
                        <div class="h-4"></div>
                        <h4 class=" ml-1 text-base scroll-m-20 font-normal tracking-tight">Add Interests</h4>
                        <Input placeholder="Interests"/>
                        <div class="flex flex-row justify-center flex-wrap gap-1 pt-2">
                            {#each interestsList ?? [] as interest, index}
                                <Badge variant={index % 2 === 0 ? "secondary" : "outline"}>
                                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <span class="hover:underline cursor-pointer" on:click={() => {handleRemoveInterests(interest)}}>{interest}</span>
                                </Badge>
                            {/each}
                        </div>
                        <div class="h-4"></div>
                        <Separator></Separator>
                        <div class="h-2"></div>
                        <h4 class=" ml-1 text-base scroll-m-20 font-normal tracking-tight">Removed Interests</h4>
                        <div class="flex flex-row justify-center flex-wrap gap-1">
                            {#if removedInterestsList.length === 0}
                                <p class=" ml-1 text-sm text-muted-foreground">No removed interests</p>
                            {:else}
                            {#each removedInterestsList ?? [] as interest, index}
                                <Badge variant={index % 2 === 0 ? "secondary" : "outline"}>
                                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <span class="hover:underline cursor-pointer" on:click={() => {handleAddInterests(interest)}}>{interest}</span>
                                </Badge>
                            {/each}
                            {/if}
                        </div>
                    </div>
                </div>

                <div class="my-4 p-4 bg-zinc-900 rounded-lg flex flex-col">

                    <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">Personal Website</h4>
                    <Input value={$currentUser.data.personalWebsiteUrl}/>
                    <div class="my-2 bg-zinc-900 rounded-lg grid gap-2">
                        <div class="grid grid-cols-4 items-center">
                            <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">Instagram</h4>
                            <Input value="shreyaskr.1409" class="col-span-3"/>
                        </div>


                        <div class="grid grid-cols-4 items-center">
                            <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">Github</h4>
                            <Input value="Shreyaskr1409" class="col-span-3"/>
                        </div>


                        <div class="grid grid-cols-4 items-center">
                            <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">Facebook</h4>
                            <Input value="Shreyaskr1409" class="col-span-3"/>
                        </div>


                        <div class="grid grid-cols-4 items-center">
                            <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">LinkedIn</h4>
                            <Input value="https://www.linkedin.com/in/shreyas-kumar-164482298/" class="col-span-3"/>
                        </div>
                    </div>

                </div>

                <Sheet.Footer>
                <Button variant="outline" on:click={() => settingSheet.set({openShareUsr: false})}>Cancel</Button>
                <Button>Save</Button>
                </Sheet.Footer>
            </Sheet.Content>
            {/if}





</Sheet.Root>