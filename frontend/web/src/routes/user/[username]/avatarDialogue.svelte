<script lang="ts">
    import FileInput from "$lib/components/my_components/fileInput.svelte";
    import {
            Button,
            buttonVariants
        } from "$lib/components/ui/button/index.js";
        import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { user } from "../../../stores/user";
    import { basic } from "../../../stores/basic";
    import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
    import Reload from "svelte-radix/Reload.svelte";

    let editImageContent = false
    let dialogOpen = false
    $: if (dialogOpen) {
        editImageContent = false;
    }
    

    let selectedFiles: any = [];

    // YET TO IMPLEMENT LOADING ANIMATION

    let loading = false
    let disabled = ""
    $: if (loading) {
        disabled = "disabled"
    } else {
        disabled = ""
    }
    async function removeImage() {
        loading = true
        try {
            const res = await fetch("/api/v1/users/remove-avatar", {
                method: "POST"
            })
            const data = await res.json();
            console.log("Removal successful:", data);
            user.set(data.data)
            editImageContent = false
        } catch (error) {
            console.error("Error removing image:", error);
            alert("Failed to upload avatar.");
            editImageContent = false
        } finally {
            loading= false
        }
    }

    async function saveImage() {
        loading = true
        if (selectedFiles.length === 0) {
            alert("No file selected.");
            return;
        }

        const formData = new FormData();
        formData.append("avatar", selectedFiles[0]);

        try {
            const res = await fetch("/api/v1/users/update-avatar", {
                method: "POST",
                body: formData,
            });
            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }

            const data = await res.json();
            console.log("Upload successful:", data);

            user.set(data.data)
            editImageContent = false
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload avatar.");
            editImageContent = false
        } finally {
            loading= false
        }
    }
</script>

<Dialog.Root bind:open={dialogOpen}>
    <Dialog.Trigger
    >
        {#if $user.avatar !== ""}
            <img id="avatar" src={$user.avatar} alt="avatar">
        {:else}
            <Skeleton class="w-[150px] h-[150px] rounded-xl"></Skeleton>
        {/if}
    </Dialog.Trigger
    >
    <Dialog.Content class="sm:max-w-[425px]">
        {#if !editImageContent}
            <Dialog.Header>
                <Dialog.Title>Profile Picture</Dialog.Title>
                <Dialog.Description>
                    Functionality to edit this image will be added soon enough
                </Dialog.Description>
            </Dialog.Header>
            <div class="grid gap-4 py-4">
                {#if $user.avatar !== ""}
                <img id="avatarDisplay" src={$user.avatar} alt="avatarDisplay">
                {:else}
                <Skeleton class="w-full aspect-square"></Skeleton>
                {/if}
            </div>

            {#if $basic.sameUser === 1}
            <Dialog.Footer>
                <Button type="submit" variant="outline" on:click={removeImage} {disabled}>
                    {#if loading}
                        <Reload class="mr-2 h-4 w-4 animate-spin" ></Reload>
                    {/if}
                    Remove Image
                </Button>
                <Button type="submit" on:click={() => {editImageContent = true}} {disabled}>Edit Image</Button>
            </Dialog.Footer>
            {/if}
        {:else}
            <Dialog.Header>
                <Dialog.Title>Profile Picture</Dialog.Title>
                <Dialog.Description>
                    Functionality to edit this image will be added soon enough
                </Dialog.Description>
            </Dialog.Header>
            <FileInput on:filechange={(event) => (selectedFiles = event.detail.files)} />
            <Dialog.Footer>
                <Button type="submit" on:click={() => {editImageContent = false}} variant="outline" {disabled}>Cancel</Button>
                <Button type="submit" on:click={saveImage} {disabled}>
                    {#if loading}
                        <Reload class="mr-2 h-4 w-4 animate-spin" ></Reload>
                    {/if}
                    Save Image
                </Button>
            </Dialog.Footer>
        {/if}
    </Dialog.Content>
</Dialog.Root>

<style>
    #avatar{
        min-height: 150px;
        height: 150px;
        width: 150px;
        border-radius: 20px;
        object-fit: cover;
        transition: 100ms linear;
        border-width: 2px;
    }
    #avatarDisplay{
        width: 100%;
        aspect-ratio: 1/1;
        border-radius: 10%;
        object-fit: cover;
        transition: 100ms linear;
    }
</style>