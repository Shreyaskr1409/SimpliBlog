<script>
  import Socialslist from "$lib/components/my_components/socialslist.svelte";


</script>
<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
    About me:
</h1>
<p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, esse cupiditate? Nobis quae voluptatum ab facere ratione. Est, reprehenderit similique aliquid, recusandae et veritatis harum quod quidem eaque maiores error.
    Autem vero pariatur quidem ipsa expedita laboriosam illum debitis nobis animi! Modi ea, itaque corrupti vero corporis nisi. Amet soluta possimus facere minus eum error sed quasi nisi beatae aspernatur!
</p>
<br>
<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
    Socials:
</h1>
<div class="flex gap-[8px] py-2 overflow-x-scroll">
    <Socialslist title={"Instagram"} socialId={"shreyaskr.1409"} imagePath={"/src/routes/user/assets/instagram_logo.png"}></Socialslist>
    <Socialslist title={"LinkedIn"} socialId={"Shreyas Kumar"} imagePath={"/src/routes/user/assets/linkedin_logo.png"}></Socialslist>
    <Socialslist title={"Facebook"} socialId={"shreyaskr.1409"} imagePath={"/src/routes/user/assets/facebook_logo.png"}></Socialslist>
</div>