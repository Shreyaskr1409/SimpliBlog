<script>
  import { Button } from "@/components/ui/button";


</script>
<section class="py-16 bg-zinc-950">
    <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-center text-zinc-100 mb-6">Get in Touch</h2>
        <p class="text-center text-zinc-400 mb-12">
            Have questions or feedback? We'd love to hear from you.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form class="bg-zinc-900 p-4 rounded-lg shadow-lg">
            <div class="mb-4">
                <label class="block text-zinc-100 text-md font-semibold mb-2">Your Name</label>
                <input type="text" placeholder="Enter your name" class="input bg-zinc-800 border border-zinc-700 text-zinc-100 w-full px-4 py-2 rounded-lg" />
            </div>
            <div class="mb-4">
                <label class="block text-zinc-100 text-md font-semibold mb-2">Your Email</label>
                <input type="email" placeholder="Enter your email" class="input bg-zinc-800 border border-zinc-700 text-zinc-100 w-full px-4 py-2 rounded-lg" />
            </div>
            <div class="mb-4">
                <label class="block text-zinc-100 text-md font-semibold mb-2">Your Message</label>
                <textarea rows="4" placeholder="Type your message" class="textarea bg-zinc-800 border border-zinc-700 text-zinc-100 w-full px-4 py-2 rounded-lg"></textarea>
            </div>
            <Button type="submit" variant="outline" class="w-full">
                Send Message
            </Button>
            </form>
            <div class="flex flex-col justify-center items-start space-y-4">
                <p class="text-zinc-400">
                    <strong class="text-zinc-100">Email:</strong> support@yourblogplatform.com
                </p>
                <p class="text-zinc-400">
                    <strong class="text-zinc-100">Phone:</strong> +1 (123) 456-7890
                </p>
                <p class="text-zinc-400">
                    <strong class="text-zinc-100">Address:</strong> 123 Blog Street, Content City, Blogland
                </p>
            </div>
        </div>
    </div>
</section>
