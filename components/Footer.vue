<template>
    <footer class="bg-lightgrey text-grey w-full h-10 fixed bottom-0 flex items-center px-6">
      <div class="flex items-center space-x-2">
        <nuxt-link to="/legal" class="link">Legal Notice</nuxt-link>
        <span>|</span>
        <nuxt-link to="/privacy" class="link">Privacy Policy</nuxt-link>
      </div>
    </footer>
  </template>
  
  <script setup>
  
  </script>
  
  <style scoped>

  .link:hover {
    color: #68B68B;
    }

  </style>
  