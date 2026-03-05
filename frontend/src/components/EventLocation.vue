<template>

<section class="py-28 px-6 bg-gray-50">

<div class="max-w-5xl mx-auto text-center">

<h2 class="text-5xl font-serif text-gray-800 mb-10">
Local do Evento
</h2>

<p class="text-gray-600 mb-10">
{{ location }}
</p>

<div class="w-full h-100 rounded-xl overflow-hidden shadow-lg">

<iframe
class="w-full h-full border-0"
:src="mapUrl"
allowfullscreen=""
loading="lazy"
referrerpolicy="no-referrer-when-downgrade">
</iframe>

</div>
<a
:href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`"
target="_blank"
class="inline-block mt-6 px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
>
Abrir no Google Maps
</a>
</div>

</section>



</template>

<script setup>

import { computed } from "vue"

const props = defineProps({
location: String
})

const mapUrl = computed(() => {

const encoded = encodeURIComponent(props.location)

return `https://www.google.com/maps?q=${encoded}&output=embed`

})

</script>