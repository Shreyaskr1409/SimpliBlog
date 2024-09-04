<script>
  import Badge from "$lib/components/ui/badge/badge.svelte";

</script>
<div class="flex flex-col bg-zinc-900 mt-2 w-full rounded-lg px-1 pb-2">
    <h1 class="scroll-m-20 text-2xl font-light tracking-tight lg:text-2xl">
        Interests:
    </h1>
    <div class="flex flex-row justify-center flex-wrap gap-1 pt-2">
        <Badge variant="secondary">Analog Electronics</Badge>
        <Badge variant="outline">Digital Electronics</Badge>
        <Badge variant="secondary">Music</Badge>
        <Badge variant="outline">Piano</Badge>
        <Badge variant="secondary">Backend Development</Badge>
        <Badge variant="outline">Golang</Badge>
        <Badge variant="secondary">Kotlin</Badge>
        <Badge variant="outline">Football</Badge>
    </div>
</div>