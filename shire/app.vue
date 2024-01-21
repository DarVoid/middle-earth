<template>
  <div class="min-h-screen w-full bg-base text-blue" :class="theme">
    <h1>Shire</h1>
    <select v-model="theme">
      <option value="latte">Latte</option>
      <option value="frappe">Frappe</option>
      <option value="macchiato">Macchiato</option>
      <option value="mocha">Mocha</option>
    </select>
    <NuxtPage />
  </div>
</template>

<script setup>
const theme = ref("frappe"); // "latte", "frappe", "macchiato", "mocha"
</script>
