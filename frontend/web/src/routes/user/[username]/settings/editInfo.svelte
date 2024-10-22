<script type="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Sheet from '$lib/components/ui/sheet/index';
    import { settingSheet } from "../../../../stores/sheets";

</script>

<Sheet.Root bind:open={$settingSheet.open}>



    <Sheet.Content side="right">


        {#if $settingSheet.option === "EditInfo"}
            <Sheet.Header>
            <Sheet.Title>Edit Information</Sheet.Title>
            <Sheet.Description>Update your profile information here.</Sheet.Description>
            </Sheet.Header>
        
            <div class="p-4">
            <p>Here you can add your form or information fields to edit user data.</p>
            </div>
        
            <Sheet.Footer>
            <Button variant="outline" on:click={() => settingSheet.set({ option: "" ,open: false})}>Cancel</Button>
            <Button>Save</Button>
            </Sheet.Footer>
        {/if}

        
        {#if $settingSheet.option === "ShareUsr"}
            <Sheet.Header>
            <Sheet.Title>Share User</Sheet.Title>
            <Sheet.Description>Share the current user from here.</Sheet.Description>
            </Sheet.Header>
        
            <div class="p-4">
            <p>Here you can add your form or information fields to edit user data.</p>
            </div>
        
            <Sheet.Footer>
            <Button variant="outline" on:click={() => settingSheet.set({ option: "" ,open: false})}>Cancel</Button>
            <Button>Save</Button>
            </Sheet.Footer>
        {/if}


    </Sheet.Content>



</Sheet.Root>