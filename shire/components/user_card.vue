<template>
    <div class="flex gap-2">
        <img class="w-10 h-10 rounded-full object-cover" :src="`/img/${user.img}`" alt="dude"/>
        <p class="font-semibold tracking-snug">{{ user.name }}</p>
    </div>
</template>

<script setup lang="js">
    const props = defineProps([
        'user',
    ]);
</script>
