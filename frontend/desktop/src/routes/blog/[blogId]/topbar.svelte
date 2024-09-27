<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar";
    import { Input } from "$lib/components/ui/input/index.js";
    import Settings from "./settings.svelte";
    import Username from "./username.svelte";
    import Usertitle from "./usertitle.svelte";
</script>

<div class="h-fit flex flex-row items-center justify-between">
    <div id="Account" class="flex items-center">
        
        <Avatar.Root>
            <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
            <Avatar.Fallback>SK</Avatar.Fallback>
        </Avatar.Root>


        <div id="spacer"></div>


        <div id="AccountInfoSet" class="flex flex-col">
            <Usertitle></Usertitle>
            <Username></Username>
        </div>

    </div>

    <div class="flex flex-row justify-center items-center">
        <Input type="Search" placeholder="Search" class=" max-w-60" />

        <div id="spacer2"></div>

        <Settings></Settings>

        <div id="spacer2"></div>
    </div>
</div>

<style>
    #spacer{
        min-width: 10px;
    }
    #spacer2{
        min-width: 10px;
    }
</style>