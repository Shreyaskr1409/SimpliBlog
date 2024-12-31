<script>
    import { marked } from 'marked';
    import DOMPurify from 'dompurify';
    import RenderedMarkdown from "./renderedMarkdown.svelte";
    import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";

    let date = "20 July 2024";
    export let body

    function renderMarkdown(content) {
        return DOMPurify.sanitize(marked(content));
    }
</script>


<div class="prose prose-zinc max-w-none blog-content">
    {#if body}
        <RenderedMarkdown markdownHTML={renderMarkdown(body)}></RenderedMarkdown>
    {:else}
        <Skeleton class="w-full h-[600px]"></Skeleton>
    {/if}
</div>