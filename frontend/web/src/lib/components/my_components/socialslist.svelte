<script>
    export let title = "Instagram"
    export let socialId = "shreyaskr.1409"
    export let imagePath = ""

    let sociallink = ""
    switch (title) {
        case "Instagram":
            sociallink = `https://www.instagram.com/${socialId}/`
            break;
            
        case "Facebook":
            sociallink = `https://www.facebook.com/${socialId}/`
            break;
            
        case "Github":
            sociallink = `https://github.com/${socialId}`
            break;
            
        case "LinkedIn":
            sociallink = `https://${socialId}`
            break;
    
        default:
            break;
    }
</script>

<div id="contnr" class="w-full">
    <div id="row1" class=" bg-zinc-900 gap-2 flex flex-row items-center px-2 py-1 w-full hover:bg-zinc-800">
        <div id="box" style="background-image: url({imagePath});" class="min-h-10 min-w-10"></div>
        <div id="col1" class="overflow-hidden">
            <a class="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 hover:underline hover:cursor-pointer whitespace-nowrap" href={sociallink}>{title}</a>
            <p class="scroll-m-20 text-sm text-nowrap font-regular truncate block">{socialId}{socialId}</p>
        </div>
    </div>
</div>

<style>
    #row1{
        border-width: 2px;
        border-radius: 15px;
    }
    #box {
        background-size: contain;
        border-radius: 8px;
    }
</style>