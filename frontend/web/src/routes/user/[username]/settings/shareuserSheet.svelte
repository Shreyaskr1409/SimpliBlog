<script>
    import Badge from "$lib/components/ui/badge/badge.svelte";
    import { Button } from "$lib/components/ui/button";
    import Input from "$lib/components/ui/input/input.svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import * as Sheet from '$lib/components/ui/sheet/index';
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import { settingSheet } from "../../../../stores/sheets";

</script>

<Sheet.Root bind:open={$settingSheet.openShareUsr}>

            <Sheet.Content side="right">
                <Sheet.Header>
                <Sheet.Title>Share User</Sheet.Title>
                <Sheet.Description>Share the current user from here.</Sheet.Description>
                </Sheet.Header>
            
                <div class="p-4">
                <p>Here you can add your form or information fields to edit user data.</p>
                </div>
            
                <Sheet.Footer>
                <Button variant="outline" on:click={() => settingSheet.set({openShareUsr: false})}>Cancel</Button>
                <Button>Save</Button>
                </Sheet.Footer>
            </Sheet.Content>



</Sheet.Root>