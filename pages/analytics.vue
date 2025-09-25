<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <p v-if="error">{{ error }}</p>

    <!-- 👇 padding-top nur auf Desktop -->
    <div 
      v-else 
      class="w-full max-w-[1100px] px-4" 
      :class="isDesktop ? 'pt-16 pb-16' : ''"
    >
      <!-- Desktop-Header + Buttons -->
      <div v-if="isDesktop" class="flex items-center justify-between mb-4">
        <h2 class="text-lg text-[#7A7A7A] font-semibold">Articles per Country</h2>

        <div class="flex gap-2">
          <button
            class="px-3 py-1 rounded-lg shadow text-sm"
            :class="viewMode === 'top' ? 'bg-[#E8524B] text-white' : 'bg-white text-[#7A7A7A]'"
            @click="viewMode = 'top'"
            title="Top-Länder anzeigen"
          >
            Top {{ topN }}
          </button>
          <button
            class="px-3 py-1 rounded-lg shadow text-sm"
            :class="viewMode === 'all' ? 'bg-[#E8524B] text-white' : 'bg-white text-[#7A7A7A]'"
            @click="viewMode = 'all'"
            title="Alle Länder anzeigen"
          >
            Alle
          </button>
        </div>
      </div>

      <!-- Chart auf Desktop -->
      <highchart v-if="isDesktop" :options="chartOptions" />

      <!-- Fallback auf Mobile -->
      <div v-else class="flex flex-col items-center justify-center h-[70vh] text-center">
        <p class="text-lg font-semibold text-[#7A7A7A]">Sorry, analytics only available on big screens.</p>
      </div>
    </div>

    <Navigation />
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const supabase = useSupabaseClient();

const error = ref(null);
const isDesktop = ref(false);      // initial false (SSR safe)
const viewMode = ref('top');       // 'top' | 'all'
const topN = 15;
const chartOptions = ref({});
let sortedData = [];

const updateIsDesktop = () => { 
  isDesktop.value = typeof window !== 'undefined' && window.innerWidth > 1250; 
};

onMounted(() => {
  updateIsDesktop();
  window.addEventListener('resize', updateIsDesktop);
  fetchAnalyticsData();
});
onUnmounted(() => window.removeEventListener('resize', updateIsDesktop));

watch(viewMode, () => buildChart());

async function fetchAnalyticsData () {
  try {
    const { data, error: fetchError } = await supabase
      .from('analytics')
      .select('country,count_month');

    if (fetchError) throw fetchError;

    if (!Array.isArray(data) || data.length === 0) {
      console.warn('[analytics] keine Zeilen gefunden');
      sortedData = [];
      buildChart();
      return;
    }

    const countryCounts = data.reduce((acc, row) => {
      const key = (row.country && String(row.country).trim()) || 'Unknown';
      const val = Number(row.count_month) || 0;
      acc[key] = (acc[key] || 0) + val;
      return acc;
    }, {});

    sortedData = Object.entries(countryCounts)
      .map(([country, count]) => ({ name: country, y: count }))
      .filter(d => d.y > 0)
      .sort((a, b) => b.y - a.y);

    buildChart();
  } catch (e) {
    console.error('Error fetching analytics data:', e);
    error.value = `Error fetching analytics data: ${e.message || e}`;
  }
}

function buildChart () {
  const seriesData = viewMode.value === 'top'
    ? sortedData.slice(0, topN)
    : [...sortedData];

  const rows = Math.max(seriesData.length, 5);
  const dynamicHeight = 40 + rows * 26;

  chartOptions.value = {
    chart: {
      type: 'bar',
      height: dynamicHeight,
      backgroundColor: 'transparent',
      style: { fontFamily: 'Oswald, sans-serif' }
    },
    title: { text: null },
    xAxis: {
      type: 'category',
      labels: { style: { color: '#7A7A7A' } },
      lineColor: '#7A7A7A',
      tickColor: '#7A7A7A'
    },
    yAxis: {
      min: 0,
      title: { text: 'Number of Articles', style: { color: '#7A7A7A' } },
      labels: { style: { color: '#7A7A7A' } },
      gridLineColor: '#E5E5E5'
    },
    legend: { enabled: false },
    tooltip: {
      formatter() {
        return `<b>${this.point.name}</b>: ${Number(this.point.y).toLocaleString('en-US')} articles`;
      },
      borderColor: '#68B68B'
    },
    series: [{
      name: 'Articles',
      data: seriesData,
      color: '#68B68B',
      dataLabels: {
        enabled: true,
        formatter () { return Number(this.y).toLocaleString('en-US'); },
        style: { textOutline: 'none', fontWeight: 'normal', color: '#E8524B' }
      }
    }],
    plotOptions: {
      series: { animation: { duration: 250 }, groupPadding: 0.08, pointPadding: 0.08 }
    },
    lang: { decimalPoint: '.', thousandsSep: ',' },
    credits: { enabled: false }
  };
}
</script>

<style scoped>
/* Highcharts Container an die Breite anpassen */
:deep(.highcharts-container) {
  width: 100% !important;
}
</style>
