<template>
    <div class="fixed top-32 left-1/2 transform -translate-x-1/2 lg:left-auto lg:right-0 lg:top-1/2 lg:-translate-y-1/2 time-line-container">
      <div class="flex items-center justify-between lg:flex-col lg:items-stretch border-2 lg:border-4 border-green rounded-3xl">
        <div v-for="(date, index) in dateOptions" :key="index" class="cursor-pointer flex-1 lg:flex-none">
          <button
            :class="{
              'h-16 w-full lg:h-32 font-bold lg:w-38 time-line-button bg-red text-white lg:text-xl border-2 lg:border-4 border-green rounded-3xl lg:rounded-2xl flex flex-col items-center justify-center': selectedDateIndex === index,
              'h-16 w-full lg:h-32 font-bold lg:w-38 time-line-button text-green lg:text-xl rounded-3xl flex flex-col items-center justify-center': selectedDateIndex !== index
            }"
            @click="selectDate(index)">
            {{ date.display }}
            <span class="text-xs lg:text-sm">{{ date.weekDay }}</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const selectedDateIndex = ref(0);
  const dateOptions = ref(generateDates());
  const emit = defineEmits(['dateSelected']);
  
  function generateDates() {
  const start = new Date('2024-09-20');
  let dates = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() - i);
    const formattedDate = date.toISOString().slice(0, 10);
    const day = date.getDate();
    const weekDay = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
    dates.push({
      display: `${day}`,
      weekDay,
      value: formattedDate
    });
  }
  return dates;
}
  
  function selectDate(index) {
      selectedDateIndex.value = index;
      console.log("Emitting date:", dateOptions.value[index].value);
      emit('dateSelected', dateOptions.value[index].value);
  }
  </script>
  
  <style scoped>
  .time-line-container {
      width: 350px;
      @media (min-width: 1024px) {
          height: 500px;
          width: auto;
      }
  }
  
  .time-line-button {
      width: 70px;
      @media (min-width: 1024px) {
          height: 100px;
          width: 100px;
      }
  }
  
  .color-shadow {
      box-shadow: 0 4px 10px 3px rgba(10, 117, 91, 0.2), 0 2px 5px 0px rgba(10, 117, 91, 0.2);
      @media (min-width: 1024px) {
          box-shadow: 0 8px 20px 6px rgba(10, 117, 91, 0.2), 0 4px 10px -1px rgba(10, 117, 91, 0.2);
      }
  }
  </style>