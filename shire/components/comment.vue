<template>
    <div class="rounded-lg p-3 bg-mantle shadow">

            <UserCard :user="props.comment.commenter" />

            <div class="ml-10">
                {{ props.comment.message }}
            </div>
            
            <div class="mt-1 flex items-center justify-end">
                <button class="bg-sapphire text-sm font-bold tracking-tight text-white px-2 py-1 rounded"> {{ props.comment.likes }}   👍 </button>
            </div>
            
    </div>
</template>

<script setup lang="js">
    const props = defineProps([
        'comment',
    ]);
</script>
