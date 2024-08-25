<script setup>
const articleData = ref([]);
const currentArticleIndex = ref(0);  // Ensure it's properly initialized.
const selectedDate = ref(new Date().toISOString().slice(0, 10));
const supabase = useSupabaseClient();
const route = useRoute();

const onDateSelected = (date) => {
  selectedDate.value = date;
  fetchArticles();
}

async function fetchArticles() {
  const countrySlug = route.params.country;
  console.log(`Fetching articles for ${countrySlug} on ${selectedDate.value}...`);

  const { data, error } = await supabase
    .from('news')
    .select('title_en, description_en, content_en, source_priority, link, pub_date')
    .eq('country', countrySlug)
    .eq('pub_date', selectedDate.value)
    .order('source_priority', { ascending: true });

  if (error) {
    console.error('Error fetching articles:', error);
  } else {
    articleData.value = data;
    console.log('Fetched data:', data);
  }
}

function nextArticle() {
  if (currentArticleIndex.value < articleData.value.length - 1) {
    currentArticleIndex.value++;
    console.log(`Current index after next: ${currentArticleIndex.value}`);
  }
}

function previousArticle() {
  if (currentArticleIndex.value > 0) {
    currentArticleIndex.value--;
    console.log(`Current index after prev: ${currentArticleIndex.value}`);
  }
}

onMounted(fetchArticles);
</script>

<template>
  <div class="flex flex-col items-center min-h-screen">
    <div class="relative flex items-center justify-center w-full" style="height: calc(100vh - 100px);">
      <h2 class="absolute top-0 text-3xl font-bold text-red">{{ route.params.country.toUpperCase() }}</h2>

      <!-- Always show the Previous Button for testing -->
      <div class="flex items-center mr-2 text-green">
        <fa :icon="['fas', 'caret-left']"
            class="text-3xl cursor-pointer"
            @click="previousArticle()" />
      </div>

      <div v-if="articleData.length > 0" class="card-content">
        <div class="scroll-container">
          <p class="text-3xl font-semibold text-green">{{ articleData[currentArticleIndex]?.title_en }}</p>
          <p class="text-lg font-bold custom-font">{{ articleData[currentArticleIndex]?.description_en }}</p>
          <p class="text-lg custom-font">{{ articleData[currentArticleIndex]?.content_en }}</p>
        </div>
      </div>
      <div v-else class="card-content text-center mt-10">
        <p>No articles available</p>
      </div>

      <!-- Always show the Next Button for testing -->
      <div v-if="articleData.length > 0" class=" flex items-center ml-2 text-green">
        <fa :icon="['fas', 'caret-right']" class="text-3xl cursor-pointer" @click="nextArticle" />
      </div>
    </div>

    <nuxt-link :to="articleData[currentArticleIndex]?.link || '#'" target="_blank"
               class="fixed bottom-14 md:top-16 right-12 h-12 px-4 py-3 bg-green text-white rounded-3xl shadow-lg hover:bg-darkgreen transition-colors">
      Original Article
    </nuxt-link>

    <div class="absolute bottom-16 left-10 text-grey text-lg">
      {{ articleData.length }} Articles Available
    </div>

    <Timeline @dateSelected="onDateSelected" />

    <nuxt-link to="/"
               class="fixed left-8 top-12 md:left-12 flex items-center justify-center w-20 h-12 bg-green text-white rounded-3xl shadow-lg hover:bg-darkgreen transition-colors">
      <fa :icon="['fas', 'arrow-left']" class="text-3xl" />
    </nuxt-link>

    <footer class="w-full">
      <Footer />
    </footer>
  </div>
</template>


<style scoped>
.flex-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-top: 50px;
  padding-bottom: 50px;
}

.card-content {
  padding: 30px;
  border: 3px solid #68B68B;
  background: white;
  width: 900px; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  overflow: hidden;
  height: 75vh;
}

.scroll-container {
  height: 99%;
  overflow-y: auto;
  padding-right: 10px;
}

.scroll-container p {
  margin-bottom: 16px; 
  line-height: 1.6; 
}

.card-content::-webkit-scrollbar {
  width: 8px;
}

.card-content::-webkit-scrollbar-track {
  background: #e0e0e0;
  border-radius: 10px;
}

.card-content::-webkit-scrollbar-thumb {
  background-color: #68B68B;
  border-radius: 10px;
}

.footer {
  width: 100%;
}

.custom-font {
  font-family: 'Roboto', sans-serif; 
}

.button-class { /* Ersetze `button-class` mit der tatsächlichen Klasse oder dem Selector deiner Buttons */
  z-index: 1000;
  position: relative; /* z-index funktioniert nur, wenn position nicht static ist */
}


@media (max-width: 640px) and (max-height: 700px) {
  .card-content {
    height: 50vh; 
    width: 300px;
    padding: 20px; 
    border-radius: 25px; 
    margin-top: auto;
    margin-bottom: 70px;
  }

  footer {
    display: none;
  }

  h2 {
    right: 10%;
  }
}

@media (max-width: 640px) and (min-height: 701px) {
  .card-content {
    height: 58vh; 
    width: 300px;
    padding: 20px; 
    border-radius: 25px; 
    margin-top: auto;
    margin-bottom: 100px;
  }

  footer {
    display: none;
  }

  h2 {
    right: 10%;
  }


}

@media (min-width: 641px) and (max-height: 700px) {
  .card-content {
    height: 35vh; 
    width: 550px;
    padding: 20px; 
    border-radius: 25px; 
    margin-top: auto;
    margin-bottom: 70px;
  }

  footer {
    display: none;
  }


}

@media (min-width: 641px) and (min-height: 701px) {
  .card-content {
    height: 59vh; 
    width: 550px;
    padding: 20px; 
    border-radius: 25px; 
    margin-top: auto;
    margin-bottom: 70px;
  }

  footer {
    display: none;
  }


}

@media (min-width: 801px) and (max-height: 890px) {
  .card-content {
    height: 60vh; 
    width: 800px;
    padding: 20px; 
    border-radius: 25px; 
    bottom: 75px;
  }

  footer {
    display: block;
  }


}

@media (min-width: 900px) {
  .card-content {
    height: 60vh; 
    width: 650px; 
    border-radius: 55px;
    padding: 40px;
  }
  footer {
    display: block;
  }
}

@media (min-width: 1025px) {
  .card-content {
    height: 70vh; 
    width: 600px; 
    border-radius: 55px;
    padding: 40px;
  }
  footer {
    display: block;
  }
}

@media (min-width: 1150px) {
  .card-content {
    height: 70vh; 
    width: 800px; 
    border-radius: 55px;
    padding: 40px;
  }
  footer {
    display: block;
  }
}

@media (min-width: 1280px) {
  .card-content {
    height: 70vh; 
    width: 900px; 
    border-radius: 55px;
    padding: 40px;
  }
  footer {
    display: block;
  }
}
</style>