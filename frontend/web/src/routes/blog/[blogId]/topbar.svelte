<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar";
  import Searchbox from "./searchbox.svelte";
    import Settings from "./settings.svelte";
    import Username from "./username.svelte";
    import Usertitle from "./usertitle.svelte";
    import {user} from "../../../stores/user";
</script>

<div class="h-fit flex flex-row items-center justify-between">
    <div id="Account" class="flex items-center">
        
        <Avatar.Root>
            <Avatar.Image src={$user.avatar} alt="" />
            <Avatar.Fallback>{$user.fullname.charAt(0)}</Avatar.Fallback>
        </Avatar.Root>


        <div id="spacer"></div>


        <div id="AccountInfoSet" class="flex flex-col">
            <Usertitle></Usertitle>
            <Username></Username>
        </div>

    </div>

    <div class="flex flex-row justify-center items-center">
        <!-- <Input type="Search" placeholder="Search" class=" max-w-60" /> -->
        <Searchbox></Searchbox>

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