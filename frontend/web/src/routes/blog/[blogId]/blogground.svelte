<script lang="ts">
    import { blog } from "../../../stores/blog.js";
    import * as Carousel from "$lib/components/ui/carousel/index.js";    
</script>

<div class="relative flex flex-col">

    {#if $blog.data.blogImage[0]}
    <Carousel.Root class="w-full">
        <Carousel.Content>
        {#each $blog.data.blogImage as image, i (image.imageurl)}
            <Carousel.Item>
                <div
                    class="relative w-full h-[400px] rounded-[20px] border-2 flex justify-center items-center overflow-hidden"
                >
                    <!-- Blurred Background -->
                    <div
                        class="absolute inset-0 bg-center bg-cover filter blur-sm opacity-50"
                        style="background-image: url({image.imageurl});"
                    ></div>
                
                    <!-- Main Image -->
                    <img
                        id="bg1"
                        src={image.imageurl}
                        alt={image.imageTitle}
                        loading="lazy"
                        class="relative z-10 bg-transparent object-contain object-center h-full"
                    />
                </div>
            </Carousel.Item>
        {/each}
        </Carousel.Content>
        <Carousel.Previous variant="default" class="absolute top-1/2 left-2 border-2" />
        <Carousel.Next variant="default" class="absolute top-1/2 right-2 border-2" />
    </Carousel.Root>
    {:else}
        <img id="bg1"
            src="https://wallpaperwaifu.com/wp-content/uploads/2019/11/minecraft-thumb-1500x844.jpg"
            alt="Banner" 
            loading="lazy"
            class=" bg-zinc-900 w-full grow rounded-[20px] border-2 object-cover object-center h-[400px]"
        />
    {/if}

    <!-- Views and shares count -->
    <div class="absolute ml-2 mt-2 px-2 bg-zinc-900 rounded-[12px] border-2">
        {#if $blog}


            <p class="underline underline-offset-2 text-nowrap">
                <span class="cursor-pointer">
                    <span class=" text-2xl">{$blog.data.readerCount}</span> views
                </span>
            </p>


            <p class="underline underline-offset-2">
                <span class="cursor-pointer">
                    <span class=" text-2xl">{$blog.data.shareCount}</span> shares
                </span>
            </p>

            
        {:else}
            <div></div>
        {/if}
    </div>


</div>