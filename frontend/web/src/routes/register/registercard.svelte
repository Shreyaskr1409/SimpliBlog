<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
</script>

<Card.Root class="w-[500px] bg-zinc-900">
    <Card.Header>
        <Card.Title>Welcome to Simpliblog!</Card.Title>
        <Card.Description>Create a Simpliblog account</Card.Description>
    </Card.Header>
    <Card.Content>
        <form>
        <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
                <Label for="name">Email</Label>
                <Input id="name" placeholder="Enter your email" />
            </div>
            <div class="flex flex-row items-center justify-center">    
                <div class="flex flex-col space-y-1.5">
                    <Label for="name">Username</Label>
                    <Input id="name" placeholder="Enter a username" />
                </div>
                <div class=" w-4"></div>
                <div class="flex flex-col space-y-1.5">
                    <Label for="name">Fullnname</Label>
                    <Input id="name" placeholder="Enter your fullname" />
                </div>
            </div>
            <div class="flex flex-col space-y-1.5">
                <Label for="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter a password" />
            </div>
            <div class="flex flex-col space-y-1.5">
                <Label for="password">Confirm Password</Label>
                <Input id="password" type="password" placeholder="Enter your password again" />
            </div>
        </div>
        </form>
    </Card.Content>
    <Card.Footer class="flex justify-between">
        <Button variant="outline">Back</Button>
        <Button>Register</Button>
    </Card.Footer>
    <Card.Footer>
        <Card.Description class="grow">Already have an account?</Card.Description>
        <Button variant="outline">Login</Button>
    </Card.Footer>
</Card.Root>