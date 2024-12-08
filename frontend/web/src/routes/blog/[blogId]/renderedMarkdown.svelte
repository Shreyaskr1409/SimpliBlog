<script>
    export let markdownHTML
</script>

<div class="blog-content" >{@html markdownHTML}</div>

<style>
    :global(.blog-content p) {
        @apply text-base mb-6;
    }
    :global(.blog-content h1) {
        @apply text-2xl underline underline-offset-2 mb-4;
    }
    :global(.blog-content h2) {
        @apply text-xl mb-3;
    }
    :global(.blog-content h3) {
        @apply text-xl mb-3;
    }
    :global(.blog-content h4) {
        @apply mb-3;
    }
    :global(.blog-content h5) {
        @apply mb-3;
    }
    :global(.blog-content h6) {
        @apply mb-3;
    }


    :global(.blog-content ul) {
        @apply list-disc pl-5 mb-6;
    }
    :global(.blog-content ol) {
        @apply list-decimal pl-5 mb-6;
    }
    :global(.blog-content blockquote) {
        @apply border-l-4 border-zinc-300 pl-4 italic text-zinc-400 mb-6;
    }
    :global(.blog-content pre) {
        @apply bg-zinc-800 text-white p-4 rounded mb-6;
    }
    :global(.blog-content code) {
        @apply text-white p-1 rounded text-wrap;
    }
    :global(.blog-content hr) {
        @apply mb-3;
    }
</style>