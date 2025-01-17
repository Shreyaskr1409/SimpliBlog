<script>
    export let users = [];
</script>

<section class="py-16 bg-zinc-950">
    <div class="max-w-6xl mx-auto px-6">
    <h2 class="text-4xl font-bold text-center text-zinc-100 mb-12">
        Popular Users
    </h2>
    <div class="flex flex-wrap gap-6 justify-center">
        {#each users as { name, avatar }}
        <div class="flex flex-col items-center">
            <img src={avatar} alt={name} class="w-24 h-24 rounded-full bg-zinc-900" />
            <p class="text-zinc-100 mt-4">{name}</p>
        </div>
        {/each}
    </div>
    </div>
</section>
