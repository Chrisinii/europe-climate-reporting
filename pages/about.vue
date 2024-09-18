<template>
  <div class="flex min-h-screen">
    <Navigation />
    <div class="flex flex-1 items-center justify-center ml-10 mr-10 md:ml-36">
      <div class="space-y-2 w-full max-w-4xl">
        <div v-for="(item, index) in items" :key="index">
          <div class="flex justify-between items-center p-4 cursor-pointer select-none border-b border-lightgrey text-green text-2xl">
            <span>{{ item.question }}</span>
            <button @click="toggle(index)" class="pl-6">
              <fa :icon="item.open ? 'xmark' : 'angle-down'" />
            </button>
          </div>
          <div v-if="item.open" class="text-grey p-4 text-lg custom-font" v-html="item.answer">
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
    {
        question: 'What is this website about?',
        answer: 'Welcome to my climate change news project! This site is part of my final coursework for my Multimedia Production bachelor’s degree at the University of Applied Sciences of the Grisons. The idea is to give you a glimpse into how climate change is reported across different European countries. We pull in news articles about climate change using the NewsData.io API, so you get a broad view of how various news organizations cover this important topic.<br><br>All the articles you see here are focused on climate change and are gathered based on specific keywords. You can find the keywords on <a href="https://github.com/Chrisinii/europe-climate-reporting" target="_blank" style="text-decoration: underline" class="news-link">my GitHub Repository</a>.',
        open: false
    },
    {
        question: 'What technologies are used?',
        answer: 'The website uses a bunch of technologies to bring you the latest climate change news:<br><br> <ul><li>NewsData.io: This is where all the  climate news are fetched.<br>Microsoft Azure Translator: Is used to translate the articles from their original language into English.</li><li>AWS Lambda and EventBridge: These tools make automatic API requests every five minutes.</li><li>Supabase: Used to store the data securely.</li><li>Nuxt3.js and Tailwind: These frameworks make the frontend look great and work smoothly.</li></ul> <br>If you want to learn more about the code, feel free to chech out <a href="https://github.com/Chrisinii/europe-climate-reporting" target="_blank" style="text-decoration: underline" class="news-link">my GitHub Repository</a>.',
        open: false
    },
    {
        question: 'Which news sites get tracked?',
        answer: 'A variety of news sites from across Europe are tracked to give you a comprehensive view of climate change reporting. If you want to see exactly which news outlets get tracked, you can check out this link: <a href="https://newsdata.io/news-sources" target="_blank" style="text-decoration: underline" class="news-link">www.NewsData.io/NewsSources</a>.',
        open: false
    },
    {
        question: 'How often is the website updated?',
        answer: 'The articles are up-to-date! The site automatically pulls in new news articles from one country every 5 minutes between 09:00 and 21:00. This means each country’s news is refreshed every three hours during this period.',
        open: false
    }
])

function toggle(index) {
    items.value[index].open = !items.value[index].open;
}
</script>

<style scoped>
.flex-1 {
  padding-left: 2rem; 
}

.max-w-4xl {
  width: 100%; 
}

a.news-link, a.news-link:visited {
  color: darkgreen;
  text-decoration: underline;
}

ul {
  padding-left: 20px; 
}
.custom-font {
  font-family: 'Roboto', sans-serif; 
}
</style>
