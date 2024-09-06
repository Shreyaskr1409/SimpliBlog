<script>
    import { formatDate } from "$lib/util/dateFormat.js";
    import { blog } from "../../../stores/blog.js";
    import { marked } from 'marked';
    import DOMPurify from 'dompurify';
    import RenderedMarkdown from "./renderedMarkdown.svelte";

    let subtitle = "This is the subtitle";
    let date = "20 July 2024";


    function renderMarkdown(content) {
        return DOMPurify.sanitize(marked(content));
    }
</script>

<div class="w-full grow">
    <div id="textArea" class="w-full h-full bg-zinc-950">
        
        <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
            {#if $blog && $blog.data && $blog.data.subtitle}
                {$blog.data.subtitle}
            {:else}
                {subtitle}
            {/if}
        </h2>

        <p class="text-sm">
            {#if $blog && $blog.data && $blog.data.createdAt}
                {formatDate($blog.data.createdAt)}
            {:else}
                {date}
            {/if}
        </p>

        <br>
        <hr>
        <br>

        <div class="prose prose-zinc max-w-none blog-content">
            {#if $blog && $blog.data && $blog.data.body}
                <RenderedMarkdown markdownHTML={renderMarkdown($blog.data.body)}></RenderedMarkdown>
            {:else}
                <p>Loading...</p>
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
