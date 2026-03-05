<template>

<section class="py-28 px-6 bg-white">

<div class="max-w-4xl mx-auto">

<h2 class="text-5xl font-serif text-center text-gray-800 mb-20">
Nossa História
</h2>

<div class="relative border-l border-gray-200">

<div
v-for="item in timeline"
:key="item.year"
class="mb-12 ml-6 transition hover:translate-x-1"
>

<div class="absolute w-4 h-4 bg-rose-600 rounded-full -left-2 border border-white"></div>

<time class="text-sm text-gray-400">
{{ item.year }}
</time>

<h3 class="text-xl font-semibold text-gray-800 mt-1">
{{ item.title }}
</h3>

<p class="text-gray-600 mt-2">
{{ item.description }}
</p>

</div>

</div>

</div>

</section>

</template>

<script setup>

const timeline = [

{
year: "2018",
title: "O primeiro encontro",
description: "Nos conhecemos em uma festa de amigos em comum e conversamos a noite inteira."
},

{
year: "2019",
title: "Primeira viagem",
description: "Nossa primeira viagem juntos foi para a praia, onde criamos memórias inesquecíveis."
},

{
year: "2023",
title: "O pedido",
description: "Durante um jantar especial, veio o pedido que mudaria nossas vidas."
},

{
year: "2026",
title: "O grande dia",
description: "Agora estamos prontos para celebrar esse momento com todos que amamos."
}

]

</script>