<script lang="ts">
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
  import { settingSheet } from "../../../../stores/sheets";
</script>

<Sheet.Root bind:open={$settingSheet.openEditImage}>
<Sheet.Content side="right">
    <Sheet.Header>
    <Sheet.Title>Edit Image</Sheet.Title>
    <Sheet.Description>
    Make changes to your profile picture here. Click save when you're done.
    </Sheet.Description>
    </Sheet.Header>
    <div>
        <img src="https://github.com/shadcn.png" alt="avatarDisplay">
    </div>
    <Sheet.Footer>
    <Sheet.Close asChild let:builder>
    <Button builders={[builder]} type="submit">Save changes</Button>
    </Sheet.Close>
    </Sheet.Footer>
</Sheet.Content>
</Sheet.Root>