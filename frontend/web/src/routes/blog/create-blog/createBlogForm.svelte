<script lang="ts">

    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import FileInput from "./fileInput.svelte";

    let blogTitle = ""
    let blogSubtitle = ""
    let blogContent = ""
    let blogCreatedSuccessfully = false
    let errorMessage = ""

    function createBlog() {( async() => {
        try {
            console.log(blogTitle);
            
            const res = await fetch(`/api/v1/blogs/upload-blog`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: blogTitle,
                    subtitle: blogSubtitle,
                    body: blogContent
                })
            })
            const data = await res.json()
            if (res.ok) {
                console.log("Blog Created");
                blogCreatedSuccessfully = true
            } else {
                blogCreatedSuccessfully = false
                errorMessage = data.message
                console.log("Blog not created");
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
        } catch (error) {
            console.error("Error encountered: ", error);
        }
    })()}

    function clearAll() {
        blogTitle = ""
        blogSubtitle = ""
        blogContent = ""
    }
</script>

<Card.Root class="2xl:w-[750px] xl:w-[600px] lg:min-w-[500px] lg:w-[500px] md:w-[700px] sm:w-[630px] min-w-[400px] bg-zinc-900">
    <Card.Header>
        <Card.Title>Enter following fields to create a blog</Card.Title>
        <Card.Description>All fields marked with * are compulsory</Card.Description>
        {#if blogCreatedSuccessfully}
            <Card.Description class="text-green-500">Blog created Successfully!!!</Card.Description>
        {:else}
            <Card.Description class="text-red-500">{errorMessage}</Card.Description>
        {/if}
    </Card.Header>
    <Card.Content>
        <form>
        <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
            <Label for="blogTitle">Title</Label>
            <Input bind:value={blogTitle} id="blogTitle" placeholder="Enter title for your blog" />
            </div>
            <div class="flex flex-col space-y-1.5">
            <Label for="blogSubtitle">Subtitle</Label>
            <Input bind:value={blogSubtitle} id="blogSubtitle" placeholder="Enter subtitle for your blog" />
            </div>
            <div class="flex flex-col space-y-1.5">
                <Label for="blogContent">Content</Label>
                <Textarea bind:value={blogContent} class="h-60" placeholder="Enter Content for your blog"></Textarea>
            </div>
            <div class="flex flex-col space-y-1.5">
            <Label for="blogImages">Images</Label>
            <FileInput></FileInput>
            </div>
        </div>
        </form>
    </Card.Content>
    <Card.Footer class="flex justify-between">
        <Button on:click={clearAll} variant="outline">Clear All</Button>
        <Button on:click={createBlog}>Create Blog</Button>
    </Card.Footer>
</Card.Root>