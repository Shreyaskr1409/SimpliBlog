<script>
    import Input from "$lib/components/ui/input/input.svelte";
    import {Separator} from "$lib/components/ui/separator/index"
    import { MagnifyingGlass } from "svelte-radix"
</script>

<div class="flex flex-row items-center w-full">
    <h1 class="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        SimpliBlog
    </h1>
    <div class="w-4"></div>
    <div class="h-full flex justify-center items-center bg-black rounded-es-xl rounded-ss-xl aspect-square border-[1px] border-r-0">
        <MagnifyingGlass size="30"></MagnifyingGlass>
    </div>
    <Input class="w-full rounded-none rounded-ee-xl rounded-se-xl" placeholder="Search"/>
</div>
<div class="h-2"></div>
<Separator></Separator>
<div class="h-2"></div>