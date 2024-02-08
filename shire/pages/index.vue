<template>
    <div class="flex flex-col items-center gap-6 w-2/3 mx-auto">
        <Post v-for="i in 10" :key="i" />
    </div>
</template>
<script setup>
const query = gql`
  query {
    fortune
  }
`;
const { data } = await useAsyncQuery(query);
console.log(data.value);
</script>
