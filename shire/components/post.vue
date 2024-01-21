<template>
    <div class="p-4 rounded-lg bg-base shadow-lg"> 
        <UserCard :user="poster" />
        <img class="mt-4 w-full rounded" :src="source" alt="nada" />
        <div class="mt-4 p-2 flex items-center justify-between rounded">
            <div>
                {{ description }}
            </div>
            <div>
                <button class="bg-mauve text-sm font-bold tracking-tight text-white px-2 py-1 rounded"> {{ likeCount }}   👍 </button>
            </div>
        </div>
        <div class="flex flex-col mt-4 gap-4">
            
            <Comment v-for="comment in comments"
             :key="comment.id" 
             :comment="comment"
            />
            
        </div>
    </div>
</template>

<script setup lang="js">
    const source = ref("/img/cat.webp"); 
    const likeCount = 3_000; 
    const description= "gato lindo"; 
    const poster = 
    { 
        name: "Ze Falacio",
        img : "cat.webp"
    } 
    const comments = [
        {   id:"0",
            message: "miaaaaaaaaaaaaaaaaaaau que gato",
            likes: 23,
            commenter: {
                name: "Ze das couves",
                img: "cat.webp"
            },
        },
        {   id:"1",
            message: "miaaaaaaaaaaaaaaaaaaau que gatão",
            likes: 420,
            commenter: {
                name: "Ze das couves",
                img: "cat.webp"
            },
        },
    ];
</script>
