<script>
    import {list} from "../../../stores/list.js";
    import {onMount} from "svelte";
    import Skeleton from '../../../lib/components/ui/skeleton/skeleton.svelte';
    import Separator from "../../../lib/components/ui/separator/separator.svelte";
    import {formatDate} from "$lib/util/dateFormat.js";

    let errorMessage = ""
    let loading = true
    onMount(async() => {
        try {
            const url = new URL(window.location.href);
            const listId = url.pathname.split('/').pop(); // Get the last part of the URL
            const listRes = await fetch(`/api/v2/lists/get-list/${listId}`)
            const data = await listRes.json()
            console.log(data)
            if (listRes.ok) {
                list.set(data.data)
            } else {
                errorMessage = data.message
            }
        } catch (error) {
            console.log(error)
        } finally {
            loading = false
        }
    })
</script>

<div class="flex flex-col">
    {#if $list.title}
        <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
            {$list.title}
        </h1>
    {/if}
    {#if loading}
        <span class="flex gap-2">
        <Skeleton class="w-32 h-9"></Skeleton>
        <Skeleton class="w-12 h-9"></Skeleton>
        <Skeleton class="w-20 h-9"></Skeleton>
        </span>
    {/if}
    {#if $list.description}
        <p class="mt-1">
            {$list.description}
        </p>
    {/if}
    {#if loading}
        <div class="flex flex-col mt-2">
            <Skeleton class="w-full h-5 my-0.5 rounded-md"></Skeleton>
            <Skeleton class="w-full h-5 my-0.5 rounded-md"></Skeleton>
            <Skeleton class="w-full h-5 my-0.5 rounded-md"></Skeleton>
            <Skeleton class="w-full h-5 my-0.5 rounded-md"></Skeleton>
            <Skeleton class="w-full h-5 my-0.5 rounded-md"></Skeleton>
            <Skeleton class="w-full h-5 my-0.5 rounded-md"></Skeleton>
        </div>
    {/if}

    <Separator class="my-4"></Separator>

    <div class="flex flex-col items-end">
        {#if $list.createdAt}
            <p class="text-right text-sm">
                Created on <span class="font-semibold">{formatDate($list.createdAt)}</span>
            </p>
        {/if}

        {#if $list.updatedAt}
            <p class="text-right text-sm">
                Updated on <span class="font-semibold">{formatDate($list.updatedAt)}</span>
            </p>
        {/if}

        {#if loading}
            <div class="flex w-fit gap-1">
                <Skeleton class="w-16 h-3.5 my-0.5 rounded-md"></Skeleton>
                <Skeleton class="w-4 h-3.5 my-0.5 rounded-md"></Skeleton>
                <Skeleton class="w-32 h-3.5 my-0.5 rounded-md"></Skeleton>
            </div>
            <div class="flex w-fit gap-1">
                <Skeleton class="w-16 h-3.5 my-0.5 rounded-md"></Skeleton>
                <Skeleton class="w-4 h-3.5 my-0.5 rounded-md"></Skeleton>
                <Skeleton class="w-32 h-3.5 my-0.5 rounded-md"></Skeleton>
            </div>
        {/if}
    </div>

    <Separator class="my-4"></Separator>
</div>