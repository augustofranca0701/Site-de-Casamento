<template>

    <div>

        <h2 class="text-4xl font-serif text-center mb-10 text-gray-800">
            Confirmação de Presença
        </h2>

        <form v-if="!success" @submit.prevent="submitRSVP" class="bg-olive-50 p-8 rounded-xl shadow-md space-y-6">

            <div>
                <label class="block text-sm text-gray-600 mb-2">
                    Nome
                </label>

                <input v-model="name" required
                    class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400" />
            </div>

            <div>
                <label class="block text-sm text-gray-600 mb-2">
                    Email
                </label>

                <input v-model="email" type="email"
                    class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400" />
            </div>

            <div>
                <label class="block text-sm text-gray-600 mb-2">
                    Você irá comparecer?
                </label>

                <select v-model="attending" class="w-full border border-gray-200 rounded-lg px-4 py-3">
                    <option :value="true">Sim</option>
                    <option :value="false">Não</option>
                </select>
            </div>

            <div>
                <label class="block text-sm text-gray-600 mb-2">
                    Acompanhantes
                </label>

                <input v-model.number="guestsCount" type="number" min="0"
                    class="w-full border border-gray-200 rounded-lg px-4 py-3" />
            </div>

            <div>
                <label class="block text-sm text-gray-600 mb-2">
                    Mensagem
                </label>

                <textarea v-model="message" rows="3"
                    class="w-full border border-gray-200 rounded-lg px-4 py-3"></textarea>
            </div>

            <button type="submit"
                class="w-full bg-rose-600 text-white py-3 rounded-lg font-medium hover:bg-rose-700 transition">
                Confirmar presença
            </button>

        </form>

        <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center">
            Presença confirmada com sucesso!
        </div>

    </div>

</template>

<script setup>
import { ref } from "vue"
import api from "../api/api"

const props = defineProps({
    slug: String
})

const name = ref("")
const email = ref("")
const attending = ref(true)
const guestsCount = ref(0)
const message = ref("")

const success = ref(false)

async function submitRSVP() {

    await api.post(`/events/${props.slug}/rsvp`, {
        name: name.value,
        email: email.value,
        attending: attending.value,
        guests_count: guestsCount.value,
        message: message.value
    })

    success.value = true

}
</script>