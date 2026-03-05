<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import api from "../api/api"

import GiftList from "../components/GiftList.vue"
import RSVPForm from "../components/RSVPForm.vue"
import HistoryTimeline from "../components/HistoryTimeline.vue"
import EventLocation from "../components/EventLocation.vue"
import Countdown from "../components/Countdown.vue"

import { useReveal } from "../composables/useReveal"

useReveal()

const event = ref(null)
const slug = "ana-e-lucas"

const heroImage = ref(null)

function handleScroll() {
  const scrollY = window.scrollY

  if (heroImage.value) {
    heroImage.value.style.transform = `translateY(${scrollY * 0.3}px)`
  }
}

onMounted(async () => {

  const res = await api.get(`/events/${slug}`)
  event.value = res.data

  window.addEventListener("scroll", handleScroll)

})

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
})

function scrollToRSVP() {
  const el = document.getElementById("rsvp")

  el.scrollIntoView({
    behavior: "smooth",
    block: "start"
  })
}
</script>

<template>

  <div v-if="event">

    <!-- HERO -->
    <section class="relative h-screen flex items-center justify-center text-center text-white">

      <img ref="heroImage" src="https://images.unsplash.com/photo-1520854221256-17451cc331bf"
        class="absolute inset-0 w-full h-full object-cover hero-parallax" />

      <div class="absolute inset-0 bg-black/40"></div>

      <div class="relative z-10 max-w-xl px-6">

        <h1 class="text-7xl font-serif">
          {{ event.name }}
        </h1>

        <p class="mt-6 text-xl tracking-widest">
          {{ event.date }}
        </p>

        <p>
          {{ event.location }}
        </p>

        <Countdown :date="event.date" />

        <button @click="scrollToRSVP"
          class="mt-8 px-8 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition">
          Confirmar presença
        </button>

      </div>
    </section>

    <!-- HISTÓRIA -->
    <div v-reveal>
      <HistoryTimeline />
    </div>

    <!-- LOCAL -->
    <div v-reveal>
      <EventLocation :location="event.location" />
    </div>

    <!-- PRESENTES -->
    <section v-reveal class="py-28 px-6 bg-rose-50">

      <div class="max-w-6xl mx-auto">

        <h2 class="text-5xl font-serif text-center text-gray-800 mb-16">
          Lista de Presentes
        </h2>

        <GiftList :slug="slug" />

      </div>

    </section>

    <!-- RSVP -->
    <section id="rsvp" v-reveal class="py-32 px-6 bg-white">

      <div class="max-w-xl mx-auto">

        <RSVPForm :slug="slug" />

      </div>

    </section>

  </div>

  <!-- LOADING (quando event ainda é null) -->
  <div v-else class="h-screen flex items-center justify-center">

    <div class="animate-pulse text-center">

      <div class="h-10 w-64 bg-gray-200 rounded mx-auto mb-6"></div>

      <div class="h-6 w-40 bg-gray-200 rounded mx-auto mb-4"></div>

      <div class="h-6 w-32 bg-gray-200 rounded mx-auto"></div>

    </div>

  </div>

</template>