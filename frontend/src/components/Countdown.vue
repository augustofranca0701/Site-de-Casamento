<template>

<div class="flex justify-center gap-6 mt-10">

<div class="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl">
<div class="text-3xl font-bold">{{ days }}</div>
<div class="text-xs tracking-widest">DIAS</div>
</div>

<div class="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl">
<div class="text-3xl font-bold">{{ hours }}</div>
<div class="text-xs tracking-widest">HORAS</div>
</div>

<div class="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl">
<div class="text-3xl font-bold">{{ minutes }}</div>
<div class="text-xs tracking-widest">MIN</div>
</div>

<div class="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl">
<div class="text-3xl font-bold">{{ seconds }}</div>
<div class="text-xs tracking-widest">SEG</div>
</div>

</div>

</template>

<script setup>
import { ref, onMounted } from "vue"

const props = defineProps({
  date: String
})

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

function updateCountdown() {

const eventDate = new Date(props.date).getTime()
const now = new Date().getTime()

const diff = eventDate - now

days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
hours.value = Math.floor((diff / (1000 * 60 * 60)) % 24)
minutes.value = Math.floor((diff / (1000 * 60)) % 60)
seconds.value = Math.floor((diff / 1000) % 60)

}

onMounted(() => {

updateCountdown()

setInterval(updateCountdown, 1000)

})
</script>