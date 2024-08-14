<script>
    let filesArray = [];
  
    function handleFileChange(event) {
      let newFiles = Array.from(event.target.files);
      // Log new files and the updated filesArray
      console.log('New files:', newFiles);
      filesArray = [...filesArray, ...newFiles];
      console.log('Updated filesArray:', filesArray);
    }
  </script>
  
  <div class="flex items-center justify-center w-full">
      <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-40 border-[1px] border-zinc-300 border-dashed rounded-sm cursor-pointer dark:hover:bg-zinc-800 dark:bg-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-800">
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg class="w-8 h-8 mb-1 text-zinc-500 dark:text-zinc-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p class="mb-2 text-sm text-zinc-500 dark:text-zinc-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
              <p class="text-xs text-zinc-500 dark:text-zinc-400">SVG, PNG, JPG or GIF</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" multiple on:change="{handleFileChange}" />
      </label>
  </div>
  
  <!-- Display the list of selected files -->
  <div class="mt-4">
      <ul>
          {#each filesArray as file (file.name)}
              <li class="text-sm">{file.name}</li>
          {/each}
      </ul>
  </div>
  