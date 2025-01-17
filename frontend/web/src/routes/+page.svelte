<script>
  import { ModeWatcher } from "mode-watcher";
import Features from "./landing-page-components/features.svelte";
  import Footer from "./landing-page-components/footer.svelte";
  import Hero from "./landing-page-components/hero.svelte";
  import PopularBlogs from "./landing-page-components/popularBlogs.svelte";
  import PopularUsers from "./landing-page-components/popularUsers.svelte";
  import ContactUs from "./landing-page-components/contactUs.svelte";

    const features = [
    {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>`,
        title: "Intuitive Design",
        description: "A seamless interface designed for creators.",
    },
    {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h18M9 6v12M15 6v12" /></svg>`,
        title: "Custom Themes",
        description: "Choose from various beautiful dark themes.",
    },
    {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4m16 0L12 4m8 8L12 20" /></svg>`,
        title: "Fast Performance",
        description: "Optimized for speed and scalability.",
    },
    ];

    const blogs = [
    { title: "Basics of Network Programming", author: "Shreyas Kumar", image: "https://source.unsplash.com/400x300/?minimalism" },
    { title: "How TCP works", author: "Shreyas Kumar", image: "https://source.unsplash.com/400x300/?blog" },
    { title: "Boards of Canada", author: "Shreyas Kumar", image: "https://source.unsplash.com/400x300/?crowd" },
    ];

    const users = [
    { name: "Jane Doe", avatar: "https://source.unsplash.com/96x96/?woman" },
    { name: "Shreyas Kumar", avatar: "https://source.unsplash.com/96x96/?man" },
    { name: "Alice Johnson", avatar: "https://source.unsplash.com/96x96/?woman,professional" },
    ];
</script>

<ModeWatcher defaultMode="dark"/>
<div class="bg-zinc-950 text-zinc-100">
    <Hero />
    <!-- <PopularBlogs {blogs} />
    <PopularUsers {users} />
    <Features {features} />
    <ContactUs />
    <Footer /> -->
</div>
