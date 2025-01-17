<script>
    import { Button } from "@/components/ui/button";

    </script>

<section class="relative flex flex-col items-start justify-end min-h-screen">
    <div class="absolute inset-0 w-full flex justify-end">
        <img
            src="/assets/screencapture-simpliblog-site-user-lua-2025-01-17-20_38_50.png"
            alt="Hero Background"
            class="w-full h-full object-contain object-right-top opacity-20"
        />
    </div>
    <div class="p-8 text-left z-10">
        <h1 class="text-7xl font-extrabold max-[500px]:text-5xl text-zinc-100">
            SimpliBlog
        </h1>
        <p class="mt-4 text-lg max-lg:text-base text-zinc-400 max-w-xl">
            A platform designed for passionate bloggers and creators. Share your ideas and connect with a thriving community.
        </p>
        <div class="flex max-sm:flex-col gap-4 mt-6">
            <Button variant="default" size="lg" on:click={()=>{window.open("/login", "_self")}}>Start Writing</Button>
            <Button variant="outline" size="lg" on:click={()=>{window.open("/user/lua", "_self")}}>Explore</Button>
        </div>
    </div>
</section>
  