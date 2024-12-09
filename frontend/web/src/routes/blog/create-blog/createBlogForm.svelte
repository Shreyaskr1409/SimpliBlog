<script lang="ts">

    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import FileInput from "../../../lib/components/my_components/fileInput.svelte";
    import Reload from "svelte-radix/Reload.svelte";

    let blogTitle = ""
    let blogSubtitle = ""
    let blogContent = ""
    let blogCreatedSuccessfully = false
    let errorMessage = ""
    let data

    let loading = false
    let disabled = ""
    $: disabled = loading ? "disabled" : "";

    let selectedFiles: any = [];
    let imageTitles: any = []

    function createBlog() {( async() => {
        loading = true
        try {
            const res = await fetch(`/api/v1/blogs/upload-blog`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: blogTitle,
                    subtitle: blogSubtitle,
                    body: blogContent
                })
            })
            data = await res.json()
            console.log(data)
            if (res.ok) {
                console.log("Blog texts uploaded");
            } else {
                blogCreatedSuccessfully = false
                errorMessage = data.message
                console.log("Blog not created");
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
        } catch (error) {
            loading = false
            console.error("Error encountered: ", error);
            return
        }

        // uploading images later because images need blogid to attach to the blogs
        try {
            if (!selectedFiles[0]) {
                blogCreatedSuccessfully = true
                loading = false
                return
            }
            console.log(data.data._id)
            imageTitles = selectedFiles.map((files) => files.name)

            // Create a FormData object
            const formData = new FormData();
            console.log(imageTitles)

            // Append each file and its title to the FormData object
            // const filesArray = Array.isArray(selectedFiles) ? selectedFiles : [selectedFiles];
            selectedFiles.forEach((file, index) => {
                formData.append('images', file); // Add the file
                formData.append('titles', imageTitles[index]); // Add the corresponding title
            });
            

            const res = await fetch(`/api/v1/blogs/update-blog-images?blogid=${data.data._id}`, {
                method: "POST",
                body: formData
            })
            const data2 = await res.json()
            console.log(data2)
            if (res.ok) {
                console.log("Blog Created");
                blogCreatedSuccessfully = true
                window.open(`/blog/${data2.data._id}`, "_self")
            } else {
                blogCreatedSuccessfully = false

                // deleting the uploaded blog if images are not uploaded successfully
                let res1 = await fetch(`/api/v1/blogs/delete-blog/${data.data._id}`)

                errorMessage = data2.message
                console.log("Blog not created");
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
        } catch (error) {
            loading = false
            console.error("Error encountered: ", error);
            return
        } finally {
            loading = false
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
            <Input bind:value={blogTitle} id="blogTitle" placeholder="Enter title for your blog" {disabled}/>
            </div>
            <div class="flex flex-col space-y-1.5">
            <Label for="blogSubtitle">Subtitle</Label>
            <Input bind:value={blogSubtitle} id="blogSubtitle" placeholder="Enter subtitle for your blog" {disabled}/>
            </div>
            <div class="flex flex-col space-y-1.5">
                <Label for="blogContent">Content</Label>
                <Textarea bind:value={blogContent} class="h-40" placeholder="Enter Content for your blog" {disabled}></Textarea>
            </div>
            <div class="flex flex-col space-y-1.5">
            <Label for="blogImages">Images</Label>
            <FileInput on:filechange={(event) => (selectedFiles = event.detail.files)} />
            </div>
        </div>
        </form>
    </Card.Content>
    <Card.Footer class="flex justify-between">
        <Button on:click={clearAll} variant="outline" {disabled}>Clear All</Button>
        <Button on:click={createBlog} {disabled}>
            {#if loading}
                <Reload class="mr-2 h-4 w-4 animate-spin" ></Reload>
            {/if}
            Create Blog
        </Button>
    </Card.Footer>
</Card.Root>