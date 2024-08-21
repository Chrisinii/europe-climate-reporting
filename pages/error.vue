<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold text-red-600 mb-4">OOPS!</h1>
    <p class="text-lg text-gray-600">Seems like there aren't any articles available today for this country.</p>
    
    <nuxt-link to="/"
      class="mt-10 flex items-center justify-center w-20 h-12 bg-green text-white rounded-3xl shadow-lg hover:bg-darkgreen transition-colors">
      <fa :icon="['fas', 'arrow-left']" class="text-3xl" />
    </nuxt-link>
  </div>
</template>

<script setup>

</script>

<style scoped>
  
</style>