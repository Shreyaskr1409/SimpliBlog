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
    import { user } from "../../../../stores/user";
    import Reload from "svelte-radix/Reload.svelte";

    const currentUser = writable({
        data: {
            username: "",
            fullname: "",
            email: "",
            _id: "",
            avatar: "",
            aboutMe: "",
            socials: [
                {
                    platform: "",
                    username: "",
                    url: "",
                },
            ],
            personalWebsiteUrl: "",
            interests: []
        },
    });

    let loading = false
    let disabled = ""
    let errormessage = ""

    $: if (loading) {
        disabled = "disabled"
    } else {
        disabled = ""
    }
    let successmessage = ""
    
    let interestInput
    let usernameInput
    let fullnameInput
    let emailInput
    let aboutMeInput
    let personalWebsiteUrlInput
    let instagramInput
    let githubInput
    let linkedInInput
    let facebookInput


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
                console.log("$currentUser:", $currentUser);
                
                
    
                interestInput = ""
                usernameInput = $currentUser.data.username
                fullnameInput = $currentUser.data.fullname
                emailInput = $currentUser.data.email
                aboutMeInput = $currentUser.data.aboutMe
                personalWebsiteUrlInput = $currentUser.data.personalWebsiteUrl
                instagramInput = $currentUser.data.socials?.filter((social) => social.platform==="instagram")[0]?.username
                githubInput = $currentUser.data.socials?.filter((social) => social.platform==="github")[0]?.username
                linkedInInput = $currentUser.data.socials?.filter((social) => social.platform==="linkedIn")[0]?.url
                facebookInput = $currentUser.data.socials?.filter((social) => social.platform==="facebook")[0]?.username
            } else {
                console.error("Failed to fetch current user");
                return;
            }
        } catch (error) {
            console.error("Error during fetch:", error);
        }
    });
    

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
        interestInput = ""
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

    async function uploadNewInfo() {
        console.log("uploading");
        
        errormessage = ""
        loading= true
        try {
            let socialsList = []
            if (githubInput) {
                socialsList = [...socialsList, {
                    platform: "github",
                    username: githubInput
                }]
            }
            if (instagramInput) {
                socialsList = [...socialsList, {
                    platform: "instagram",
                    username: instagramInput
                }]
            }
            if (linkedInInput) {
                socialsList = [...socialsList, {
                    platform: "linkedIn",
                    username: linkedInInput
                }]
            }
            if (facebookInput) {
                socialsList = [...socialsList, {
                    platform: "facebook",
                    username: facebookInput
                }]
            }
            console.log(socialsList);
            

            const updatedUser = {
                username: usernameInput,
                fullname: fullnameInput,
                email: emailInput,
                aboutme: aboutMeInput,
                socials: socialsList,
                personalWebsiteUrl: personalWebsiteUrlInput,
                interests: interestsList
            }
            console.log(updatedUser);
            

            const res = await fetch("/api/v2/users/update-all-user-details", {
                method:  "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser)
            })
            const data = await res.json()
            console.log(data);
            
            if (res.ok) {
                successmessage = "Successfully Updated information"
                user.set(data.data)
            } else {
                errormessage = data.message
            }
        } catch (error) {
            errormessage = error
            console.log(error);
        } finally {
            loading = false
        }
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
                        <Input bind:value={usernameInput} class="col-span-3" {disabled}/>
                    </div>


                    <div class="grid grid-cols-4 items-center">
                        <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">Full Name</h4>
                        <Input bind:value={fullnameInput} class="col-span-3" {disabled}/>
                    </div>


                    <div class="grid grid-cols-4 items-center">
                        <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">Email</h4>
                        <Input bind:value={emailInput} class="col-span-3" {disabled}/>
                    </div>
                </div>

                <div class="my-4 p-4 bg-zinc-900 rounded-lg flex flex-col">
                    <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">About</h4>
                    <Textarea class="bg-black min-h-40" bind:value={aboutMeInput} {disabled}></Textarea>

                    <div class="mt-4"></div>

                    <div class="rounded-lg w-full h-fit p-2 bg-black">
                        <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">Interests</h4>
                        <h6 class=" ml-1 text-sm text-muted-foreground">CLICK on the interest badges to remove them and CLICK on badges from removed section to UNDO changes</h6>
                        <div class="h-4"></div>
                        <h4 class=" ml-1 text-base scroll-m-20 font-normal tracking-tight">Add Interests</h4>
                        <div class="flex w-full gap-2">
                            <Input placeholder="Interests" bind:value={interestInput} {disabled}/>
                            <Button variant="secondary" on:click={() => addInterest(interestInput)} {disabled}>Add</Button>
                        </div>
                        <div class="flex flex-row justify-center flex-wrap gap-1 pt-2">
                            {#each interestsList ?? [] as interest, index}
                                <Badge variant={index % 2 === 0 ? "secondary" : "outline"} {disabled}>
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
                                <Badge variant={index % 2 === 0 ? "secondary" : "outline"} {disabled}>
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
                    <Input bind:value={personalWebsiteUrlInput} {disabled}/>
                    <div class="my-2 bg-zinc-900 rounded-lg grid gap-2">

                        <div class="grid grid-cols-4 items-center">
                            <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">Instagram</h4>
                            <Input bind:value={instagramInput} class="col-span-3" {disabled}/>
                        </div>

                        <div class="grid grid-cols-4 items-center">
                            <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">Github</h4>
                            <Input bind:value={githubInput} class="col-span-3" {disabled}/>
                        </div>

                        <div class="grid grid-cols-4 items-center">
                            <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">LinkedIn url</h4>
                            <Input bind:value={linkedInInput} class="col-span-3" {disabled}/>
                        </div>

                        <div class="grid grid-cols-4 items-center">
                            <h4 class=" ml-1 text-lg scroll-m-20 font-normal tracking-tight">Facebook</h4>
                            <Input bind:value={facebookInput} class="col-span-3" {disabled}/>
                        </div>
                    </div>

                </div>

                <Sheet.Footer>
                <Button variant="outline" on:click={() => settingSheet.set({openShareUsr: false})} {disabled}>Cancel</Button>
                <p class="text-sm mt-0 text-green-500" >{successmessage}</p>
                <p class="text-sm mt-0 text-red-500" >{errormessage}</p>
                <Button on:click={uploadNewInfo} {disabled}>
                    {#if loading}
                        <Reload class="mr-2 h-4 w-4 animate-spin" ></Reload>
                    {/if}
                    Save
                </Button>
                </Sheet.Footer>
            </Sheet.Content>
            {/if}





</Sheet.Root>