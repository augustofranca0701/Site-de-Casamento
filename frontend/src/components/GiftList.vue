<template>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

    <div v-for="gift in gifts" :key="gift.id" class="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100
hover:shadow-2xl hover:-translate-y-2
transition-all duration-300 ease-out">

      <h3 class="text-xl font-semibold text-gray-800">
        {{ gift.name }}
      </h3>

      <p class="text-gray-500 mt-3">
        {{ gift.description }}
      </p>

      <div class="mt-6">

<div v-if="gift.reserved" class="text-sm text-emerald-600 font-medium">
Reservado por {{ gift.reserved_by }}
</div>

        <button v-if="!gift.reserved" @click="reserveGift(gift.id)"
          class="mt-4 px-6 py-3 bg-rose-600 text-white rounded-lg
hover:bg-rose-700 hover:scale-105
transition-all duration-200">
          Reservar presente
        </button>

      </div>

    </div>

  </div>

</template>

<script setup>
import { ref, onMounted } from "vue"
import api from "../api/api"

const gifts = ref([])

const props = defineProps({
  slug: String
})

async function loadGifts() {
  const res = await api.get(`/events/${props.slug}/gifts`)
  gifts.value = res.data
}

async function reserveGift(id) {
  const name = prompt("Digite seu nome")

  if (!name) return

  await api.post(`/gifts/${id}/reserve`, { name })

  await loadGifts()
}

onMounted(loadGifts)
</script>