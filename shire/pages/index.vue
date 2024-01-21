<template>
    <div class="flex flex-col items-center gap-6 w-2/3 mx-auto">
        <Post v-for="i in 10" :key="i" />
    </div>
</template>
