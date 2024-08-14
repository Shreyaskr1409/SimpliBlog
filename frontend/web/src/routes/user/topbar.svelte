<script>
  import Button from "$lib/components/ui/button/button.svelte";
import AvatarDialogue from "./avatarDialogue.svelte";
  import Settings from "./settings.svelte";

</script>
<div id="big_container" class="flex items-center">
    <div id="left_container" class="flex items-center">
        <AvatarDialogue></AvatarDialogue>
        <div id="spacer_2" class=""></div>
    </div>

    <div id="right_container" class="flex items-center grow">
        <div id="names_container">
            <h2 class="scroll-m-20 text-3xl font-semibold tracking-tight">Shreyas Kumar</h2>
            <p>
                @shreyaskr.1409
            </p>
            <div class="h-4"></div>
            <p class="underline underline-offset-2"><span class="cursor-pointer"><span class=" text-2xl">122</span> Subscribers</span></p>
            <p class="underline underline-offset-2"><span class="cursor-pointer"><span class=" text-2xl">5</span> Blogs</span></p>
        </div>
        <!-- <div id="info_container" class="flex grow justify-center gap-4">
            <div id="infotext1" class="flex flex-col justify-center items-center">
                <h3 class="scroll-m-20 text-xl font-semibold tracking-tight">Blogs</h3>
                <p>
                    5
                </p>
            </div>
            <div id="infotext2" class="flex flex-col justify-center items-center">
                <h3 class="scroll-m-20 text-xl font-semibold tracking-tight">Subscribers</h3>
                <p>
                    122
                </p>
            </div>
        </div> -->
        <div class="grow"></div>
        <div class="flex flex-col justify-center items-center">
            <Button variant="default" class="w-24">Follow</Button>
            <div class="min-h-1"></div>
            <Settings></Settings>
        </div>
    </div>
</div>

<style>
    #spacer_2{
        min-width: 15px;
    }
</style>