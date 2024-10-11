<script lang="ts">
	import * as Select from "$lib/components/ui/select/index.js";
	import Separator from "$lib/components/ui/separator/separator.svelte";
	

	// filter options for blogs and comments
	const blogOptions = [
			{ value: "userBlogs", label: "User Blogs" },
			{ value: "similarBlogs", label: "Similar Blogs" },
			{ value: "topBlogs", label: "Top Blogs" },
			{ value: "latestBlogs", label: "Latest Blogs" }
	];
	const commentOptions = [
			{ value: "topComments", label: "Top Comments" },
			{ value: "latestComments", label: "Latest Comments" }
	];
</script>
	
<Select.Root>

	<Select.Trigger class="w-[240px]">
		<Select.Value placeholder="User Blogs" />
	</Select.Trigger>


	<Select.Content>

		<Select.Group>


			<Select.Label>This feature will be functional soon</Select.Label>

		</Select.Group>
		
		<Separator></Separator>

		<Select.Group>


			<Select.Label>Blogs</Select.Label>
			{#each blogOptions as option}
				<Select.Item value={option.value} label={option.label}>
					{option.label}
				</Select.Item>
			{/each}


		</Select.Group>
		
		<Separator></Separator>

		<Select.Group>


			<Select.Label>Comments</Select.Label>
			{#each commentOptions as option}
				<Select.Item value={option.value} label={option.label}>
					{option.label}
				</Select.Item>
			{/each}


		</Select.Group>

	</Select.Content>

	<Select.Input name="Select Options" />

</Select.Root>