<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
      <p v-if="error">{{ error }}</p>
      <div v-else>
        <highchart v-if="isDesktop" :options="chartOptions" />
        <p v-else>Sorry, analytics only available on big screens.</p>
      </div>
      <Navigation />
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watchEffect, onUnmounted } from 'vue';
  
  const chartOptions = ref({});
  const supabase = useSupabaseClient();
  const error = ref(null);
  const isDesktop = ref(true); 
  
  const updateIsDesktop = () => {
    isDesktop.value = window.innerWidth > 1250;
  };
  
  onMounted(() => {
    updateIsDesktop(); 
    window.addEventListener('resize', updateIsDesktop); 
  
    fetchAnalyticsData();
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateIsDesktop);
  });
  
  const fetchAnalyticsData = async () => {
    const { data, error: fetchError } = await supabase
      .from('analytics')
      .select('*');
  
    if (fetchError) {
      console.error('Error fetching analytics data:', fetchError);
      error.value = `Error fetching analytics data: ${fetchError.message}`;
      return;
    }
  
    const countryCounts = data.reduce((acc, item) => {
      acc[item.country] = (acc[item.country] || 0) + item.count_month;
      return acc;
    }, {});
  
    const chartData = Object.entries(countryCounts).map(([country, count]) => {
      return { name: country, y: count };
    }).sort((a, b) => b.y - a.y);
  
    chartOptions.value = {
      
      chart: {
        type: 'column',
        height: 700, 
        width: isDesktop.value ? 1000 : null, 
        backgroundColor: 'transparent',
        style: {
          fontFamily: 'Oswald, sans-serif'
        }
      },
      title: {
        text: 'Number of Articles per Country',
        style: {
          fontFamily: 'Oswald, sans-serif',
          color: '#7A7A7A'
        }
      },
        xAxis: {
            type: 'category',
            title: {
                text: 'Country',
                style: {
                    fontFamily: 'Oswald, sans-serif',
                    color: '#7A7A7A'
                }
            },
            labels: {
                style: {
                    fontFamily: 'Oswald, sans-serif',
                    color: '#7A7A7A'
                }
            },
            lineColor: '#7A7A7A',
            tickColor: '#7A7A7A'
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Articles',
                align: 'high',
                style: {
                    fontFamily: 'Oswald, sans-serif',
                    color: '#7A7A7A'
                }
            },
            labels: {
                style: {
                    fontFamily: 'Oswald, sans-serif',
                    color: '#7A7A7A'
                }
            },
            gridLineColor: '#7A7A7A'
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Article Count',
            data: chartData,
            color: '#68B68B',
            dataLabels: {
                enabled: true,
                color: '#E8524B',
                style: {
                    fontFamily: 'Oswald, sans-serif',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }],
        lang: {
            decimalPoint: '.',
            thousandsSep: ','
        }
    };
};

onMounted(() => {
    fetchAnalyticsData();
});
</script>



<style scoped>
.highcharts-container {
    width: 100%;
    max-width: 1100px;
    height: 700px;
    margin: auto;
}
</style>