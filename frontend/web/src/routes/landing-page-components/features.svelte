<script>
    export let features = [];
</script>

<section class="py-16 bg-zinc-900">
    <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-center text-zinc-100 mb-12">
        Why Choose Us?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each features as { icon, title, description }}
            <div class="text-center flex flex-col items-center">
                <div class="flex justify-center items-center w-16 h-16 mb-4 bg-zinc-800 rounded-full">
                    {@html icon}
                </div>
                <h3 class="text-xl font-semibold text-zinc-100">{title}</h3>
                <p class="text-zinc-400 mt-2">{description}</p>
            </div>
        {/each}
        </div>
    </div>
</section>
