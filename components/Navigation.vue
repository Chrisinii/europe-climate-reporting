<template>
    <div :class="{
        'fixed left-0 bottom-20 pl-4 w-16 md:top-0 md:bottom-0 md:left-0 md:pl-8 md:w-32 md:flex md:items-center md:justify-center': true
    }">

        <div :class="{
            'flex flex-col items-center space-y-4 md:space-y-8 bg-white border-2 md:border-4 border-green rounded-2xl md:rounded-3xl z-20 color-shadow': true
        }">
            <div v-for="link in links" :key="link.name" class="relative">
                <button :class="{
                    'flex justify-center items-center w-12 h-12 md:w-24 md:h-24 rounded-2xl md:rounded-2xl border-2 md:border-4': true,
                    'bg-red border-green': isActive(link.name), 'border-transparent': !isActive(link.name)
                }" @click="navigate(link.to)" @mouseover="hoverLink = link.name" @mouseleave="hoverLink = ''">
                    <fa :icon="['fas', link.icon]" :class="{
                        'text-2xl md:text-4xl': true,
                        'text-white': isActive(link.name), 'text-green': !isActive(link.name)
                    }"></fa>
                </button>
                <div v-if="hoverLink === link.name" :class="{
                    'absolute left-full top-0 h-12 w-24 md:h-24 md:w-40 flex items-center justify-center rounded-r-xl z-0': true,
                    'bg-red opacity-50': isActive(link.name), 'bg-green opacity-50': !isActive(link.name)
                }">
                    <span class="text-white text-xl md:text-2xl">{{ link.label }}</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Navigation',
    data() {
        return {
            hoverLink: '',
            links: [
                { name: 'index', to: { name: 'index' }, icon: 'map', label: 'Map' },
                { name: 'analytics', to: { name: 'analytics' }, icon: 'chart-simple', label: 'Analytics' },
                { name: 'about', to: { name: 'about' }, icon: 'info', label: 'About' }
            ]
        };
    },
    methods: {
        isActive(routeName) {
            return this.$route.name === routeName;
        },
        navigate(to) {
            this.$router.push(to);
        }
    }
}
</script>

<style scoped>
.color-shadow {
    box-shadow: 0 4px 10px 3px rgba(10, 117, 91, 0.2), 0 2px 5px 0px rgba(10, 117, 91, 0.2);

    @media (min-width: 768px) {
        /* md breakpoint von Tailwind */
        box-shadow: 0 8px 20px 6px rgba(10, 117, 91, 0.2), 0 4px 10px -1px rgba(10, 117, 91, 0.2);
    }
}
</style>
