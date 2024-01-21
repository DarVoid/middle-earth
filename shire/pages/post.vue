<template>
    <div class="w-1/2 mx-auto border p-4 rounded-lg"> 
        <img class="w-full rounded" :src="source" alt="nada" />
        <div class="mt-2 p-2 border flex items-center justify-between rounded">
            <div>
                {{ description }}
            </div>
            <div>
                likes: {{ likeCount }} <button> 👍 </button>
            </div>
        </div>
        <div class="flex flex-col mt-4 gap-2">
            
            <div v-for="comment in comments" :key="comment.id" class="border rounded p-4">
               
                    <div class="flex gap-2">
                        <img class="w-12 h-12 rounded-full object-cover" :src="`/img/${comment.commenter}`" alt="dude"/>
                        {{ comment.message }}
                    </div>
                    
                    <div class="mt-2 flex items-center justify-end">
                        <button class="bg-blue text-white px-2 py-1 rounded"> {{ comment.likes }}   👍 </button>
                    </div>
                    
            </div>
            
        </div>
    </div>
</template>

<script setup lang="js">
    const source = ref("/img/cat.webp"); 
    const likeCount = 3_000; 
    const description= "gato lindo"; 
    const comments = [
        {   id:"0",
            message: "miaaaaaaaaaaaaaaaaaaau que gato",
            likes: 23,
            commenter: "cat.webp",
        },
        {   id:"1",
            message: "miaaaaaaaaaaaaaaaaaaau que gatão",
            likes: 42,
            commenter: "cat.webp",
        },
    ];
</script>
