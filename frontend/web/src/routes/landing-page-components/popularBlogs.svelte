<script>
    export let blogs = [];
</script>

<section class="py-16 bg-zinc-900">
    <div class="max-w-6xl mx-auto px-6">
    <h2 class="text-4xl font-bold text-center text-zinc-100 mb-12">
        Popular Blogs
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each blogs as { title, author, image }}
        <div class="bg-zinc-800 flex flex-col rounded-lg overflow-hidden">
            <img src={image} alt={title} class="w-full h-48 object-cover" />
            <div class="p-4">
                <h3 class="text-lg font-bold text-zinc-100">{title}</h3>
                <p class="text-zinc-400 text-sm mt-2">By {author}</p>
            </div>
        </div>
        {/each}
    </div>
    </div>
</section>
