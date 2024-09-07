<script>
  import { blog } from "../../../stores/blog";

    export let title = "Loading User Blogs"
    export let date = "20 July 2024"
    export let isActive = false
    export let blogUrl = "https://github.com/Shreyaskr1409/SimpliBlog"
    export let blogid = ""
    let bgclr = ""

    $: if ($blog?.data?._id && blogid === $blog.data._id) {
        isActive = true;
    } else {
        isActive = false;
    }

    // console.log(blogid)
    $: if (isActive) {
        bgclr = "bg-zinc-800"
    }

    let usedtitle = title;
    if (title.length>30) {
        usedtitle = title.substring(0, 30) + "..."
    }
</script>

<!--on:click={() => {window.open('https://github.com/Shreyaskr1409/SimpliBlog', '_blank')}}-->
<div id="contnr">
  <div id="row1" class="px-4 py-1 w-full {bgclr} hover:bg-zinc-800">
    <div id="col1">
      <a
        class="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 hover:underline hover:cursor-pointer truncate block w-full"
        href={blogUrl}
        target="_self"
        >{usedtitle}</a>
      <p class="text-sm">{date}</p>
    </div>
  </div>
</div>

<style>
    /* #contnr{
        padding: 5px 5px 0px 5px;
    } */
    #row1{
        border-width: 2px;
        border-radius: 15px;
    }
</style>