<script lang="ts">
	import Check from "svelte-radix/Check.svelte";
	import CaretSort from "svelte-radix/CaretSort.svelte";
	import { tick } from "svelte";
	import * as Command from "$lib/components/ui/command/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { blog } from "../../../stores/blog";


	// Platforms which will contain links for the websites
	const platforms = [
		{
			value: "discord",
			label: "Discord"
		},
		{
			value: "linkedin",
			label: "LinkedIn"
		},
		{
			value: "instagram",
			label: "Instagram"
		},
		{
			value: "twitter",
			label: "Twitter"
		},
	];

	// a weird typechecking i had to do as i was using ts,
	// because i was facing trouble importing a ts file
	const platforms1 = ($blog as any)?.data?.blogLink || []

	let open = false;
	let value = "";


 
	// i do not know what this does honestly, i copied this from shadcn website
	$: selectedValue =
		platforms.find((f) => f.value === value)?.label ?? "Author's links...";
 


	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>


 
<div class="flex flex-nowrap items-center">
	<Popover.Root bind:open let:ids>


		<Popover.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="secondary"
				role="combobox"
				aria-expanded={open}
				class="w-[200px] justify-between"
			>
				{selectedValue}
				<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</Popover.Trigger>


		<Popover.Content class="w-[200px] p-0 mt-[10px]">
			<Command.Root>

				<Command.Input placeholder="Search platforms..." class="h-9" />
				<Command.Empty>No platform found.</Command.Empty>

				<Command.Group>
					{#if platforms1.length != 0}


						{#each platforms1 as platform}
							<Command.Item
								value={platform.value}
								onSelect={(currentValue) => {
									value = currentValue;
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								<Check
									class={cn(
										"mr-2 h-4 w-4",
										value !== platform.value && "text-transparent"
									)}
								/>
								{platform.label}
							</Command.Item>
						{/each}


					{:else}


						{#each platforms as platform}
							<Command.Item
								value={platform.value}
								onSelect={(currentValue) => {
									value = currentValue;
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								<Check
									class={cn(
										"mr-2 h-4 w-4",
										value !== platform.value && "text-transparent"
									)}
								/>
								{platform.label}
							</Command.Item>
						{/each}


					{/if}
				</Command.Group>

			</Command.Root>
		</Popover.Content>
	</Popover.Root>
	
	<div id="spacer"></div>

	<Button>Go</Button>
</div>

<style>
	#spacer{
		width: 10px;
	}
</style>