<template>
    <div class="flex items-center justify-between p-8 w-5/6 mx-auto">
        <div class="flex items-center">
            <img :src="`/img/${user.img}`" alt="name" class="rounded-full shadow-lg w-32 h-32" />
            <div class="ml-4">
                <h1 class="mb-1 font-bold tracking-tight text-2xl">
                    {{user.name}}
                </h1>
                <div class="text-sm">
                    <span class="font-bold">Phone:</span> {{ user.cellNumber }}
                </div>
                <div class="text-sm">
                    <span class="font-bold">Email:</span> {{ user.email }}
                </div>
            </div>
        </div>
        <button class="flex items-center gap-1 bg-green px-2 py-1 rounded-full text-white text-lime font-bold tracking-tight">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

            <a href="#" :title="`${user.morada}`">Follow</a>
        </button>    
    </div>
    <div class="mt-6 flex items-center flex-col w-3/4 mx-auto gap-6">
        <Post v-for="i in 10" :key="i" />
    </div>
</template>

<script setup>
    function getUser(id) {
        console.log(id)
        return {
            name:"Gervásio",
            img:"cat.webp",
            morada:"casa",
            cellNumber:"123-456-217",
            email:"email@mail.mail"
        };
    }
    const props = defineProps([
        'id',
    ]);
    const user = getUser(props.id)
</script>
