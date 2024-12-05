<script>
    import { createEventDispatcher } from "svelte";
    let filesArray = [];
    const dispatch = createEventDispatcher();

    function handleFileChange(event) {
        let newFiles = Array.from(event.target.files);
        filesArray = [...filesArray, ...newFiles];
        dispatch("filechange", { files: filesArray });
    }
</script>

<div class="flex flex-col items-center justify-center w-full">
    <label
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-40 border-[1px] border-zinc-300 border-dashed rounded-sm cursor-pointer dark:bg-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
    >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
                class="w-8 h-8 mb-1 text-zinc-500 dark:text-zinc-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
                aria-hidden="true"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
            </svg>
            <p class="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                <span class="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-zinc-500 dark:text-zinc-400">SVG, PNG, JPG or GIF</p>
        </div>
        <input id="dropzone-file" type="file" class="hidden" multiple on:change="{handleFileChange}" />
    </label>
</div>

<div class="mt-4">
    <ul>
        {#each filesArray as file (file.name)}
            <li class="text-sm">{file.name}</li>
        {/each}
    </ul>
</div>
