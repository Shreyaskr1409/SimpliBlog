<script lang="ts">
    import {
        Button,
        buttonVariants
    } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
</script>

<Dialog.Root>
    <Dialog.Trigger
    >
    <img id="avatar" src="https://github.com/shadcn.png" alt="avatar">
    </Dialog.Trigger
    >
    <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
        <Dialog.Title>Shreyas Kumar</Dialog.Title>
        <Dialog.Description>
            @shreyaskr.1409
        </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-4 py-4">
        <img id="avatarDisplay" src="https://github.com/shadcn.png" alt="avatarDisplay">
    </div>
    <Dialog.Footer>
        <Button type="submit" variant="outline">Remove Image</Button>
        <Button type="submit">Edit Image</Button>
    </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>

<style>
    #avatar{
        min-height: 150px;
        min-width: 150px;
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