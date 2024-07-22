<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar";
    import { Input } from "$lib/components/ui/input/index.js";
</script>

<div class="h-fit flex flex-row items-center justify-between">
    <div id="Account" class="flex items-center">
        <Avatar.Root>
            <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
            <Avatar.Fallback>SK</Avatar.Fallback>
        </Avatar.Root>
        <div id="spacer"></div>
        <div id="AccountInfoSet" class="flex flex-col">
            <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
                Shreyas Kumar
            </h4>
            <p class="">
                @shreyaskr.1409
            </p>
        </div>
    </div>

    <div>
        <Input type="Search" placeholder="Search" class=" max-w-60" />
    </div>
</div>

<style>
    #spacer{
        min-width: 10px;
    }
</style>