<script>
    import { blog } from "../../stores/blog.js";
    let subtitle = "This is the subtitle"
    let date = "20 July 2024"
</script>

<div class="w-full grow">
    <div id="textArea" class="w-full h-full bg-zinc-950">
        {#if $blog}
        <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors first:mt-0">{$blog.data.subtitle}</h2>
        {:else}
        <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors first:mt-0">{subtitle}</h2>
        {/if}
        {#if $blog}
        <p>{$blog.data.createdAt}</p>
        {:else}
        <p class=" text-sm">{date}</p>
        {/if}
        <br>

        {#if $blog}
            <h1>{$blog.data.body}</h1>
        {:else}
            <p>Loading...</p>
        {/if}
        <br>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, quas fugiat dolore consectetur, odit explicabo qui repudiandae ab ut nisi ratione. Eius accusamus facilis earum? Magni repellendus omnis quibusdam accusamus.
        Obcaecati reprehenderit et consequuntur nam quibusdam vitae dicta? Provident, quod incidunt molestiae dolor sapiente rem. Unde placeat repellat nostrum natus nesciunt expedita soluta autem, magnam doloremque, ad at repudiandae ipsa.</p>
        <br>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae id commodi suscipit incidunt eveniet maxime ducimus praesentium sunt reprehenderit. Accusamus nisi repudiandae consequuntur expedita culpa vero repellendus tempora animi soluta.</p>
        <br>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, quas fugiat dolore consectetur, odit explicabo qui repudiandae ab ut nisi ratione. Eius accusamus facilis earum? Magni repellendus omnis quibusdam accusamus.
        Obcaecati reprehenderit et consequuntur nam quibusdam vitae dicta? Provident, quod incidunt molestiae dolor sapiente rem. Unde placeat repellat nostrum natus nesciunt expedita soluta autem, magnam doloremque, ad at repudiandae ipsa.</p>
        <br>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae id commodi suscipit incidunt eveniet maxime ducimus praesentium sunt reprehenderit. Accusamus nisi repudiandae consequuntur expedita culpa vero repellendus tempora animi soluta.</p>
    </div>
</div>

<style>
    #textArea{
        box-sizing: border-box;
        padding: 20px;
        border-radius: 20px;
        border-width: 2px;
    }
</style>