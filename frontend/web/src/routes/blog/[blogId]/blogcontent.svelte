<script>
    import { formatDate } from "$lib/util/dateFormat.js";
    import { blog } from "../../../stores/blog.js";
    import { marked } from 'marked';
    import DOMPurify from 'dompurify';
    import RenderedMarkdown from "./renderedMarkdown.svelte";
  import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";

    let date = "20 July 2024";


    function renderMarkdown(content) {
        return DOMPurify.sanitize(marked(content));
    }
</script>

<div class="w-full grow">
    <div id="textArea" class="w-full h-full bg-zinc-950">
        
        <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
            {#if $blog.subtitle}
                {$blog.subtitle}
            {:else}
                <Skeleton class="h-8 w-80"></Skeleton>
            {/if}
        </h2>

        <p class="text-sm">
            {#if $blog.createdAt}
                {formatDate($blog.createdAt)}
            {:else}
                <Skeleton class="h-3 my-1 w-40"></Skeleton>
            {/if}
        </p>

        <br>
        <hr>
        <br>

        <div class="prose prose-zinc max-w-none blog-content">
            {#if $blog.body}
                <RenderedMarkdown markdownHTML={renderMarkdown($blog.body)}></RenderedMarkdown>
            {:else}
                <Skeleton class="w-full h-[600px]"></Skeleton>
            {/if}
        </div>

    </div>
</div>

<style>
    #textArea {
        box-sizing: border-box;
        padding: 20px;
        border-radius: 20px;
        border-width: 2px;
    }
    .blog-content {
        line-height: 1.6;
    }
</style>
