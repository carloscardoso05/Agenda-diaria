<template>

   <!-- Button trigger modal -->
   <button type="button" class="fa-solid fa-plus btn-adicionar btn btn-primary rounded-5 mb-3" data-bs-toggle="modal"
      data-bs-target="#exampleModal" @click="switchModal">
   </button>

   <div class="modal" :class="{ 'is-active': modalAberto }">
      <div class="modal-background"></div>
      <div class="modal-card">

         <header class="modal-card-head">
            <p class="modal-card-title">{{ titulo }}</p>
            <button @click="switchModal" class="delete" aria-label="close"></button>
         </header>

         <section class="modal-card-body">
            <!-- Content ... -->
            <form class="form">

               <div class="field">
                  <label class="label">
                     <input type="checkbox" @click="switchHorario" checked>
                     Horário
                  </label>
               </div>

               <div class="field is-flex is-justify-content-space-evenly">
                  <label class="label">
                     <div class="control">
                        De:
                        <input type="time" class="input is-small" v-model="horarioInicio" :disabled="!horarioHabilitado">
                     </div>
                  </label>

                  <label class="label">
                     <div class="control">
                        Até:
                        <input type="time" class="input is-small" v-model="horarioFim" :disabled="!horarioHabilitado">
                     </div>
                  </label>
               </div>
               
               <div class="field">
                  <label class="label">
                     <div class="control">
                        Descrição:
                        <textarea class="textarea" placeholder="Ex: ir ao médico" rows="1" v-model="descricao"></textarea>
                     </div>
                  </label>
               </div>
               
            </form>

         </section>

         <footer class="modal-card-foot">
            <button @click="salvarTarefa" class="button is-success">Salvar</button>
            <button @click="resetar" class="button">Fechar</button>
         </footer>
      </div>
   </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { useTarefasStore } from '@/store';
import { computed } from '@vue/reactivity';


export default defineComponent({
   name: 'Formulario-Modal',
   data() {
      return {
         horarioHabilitado: true,

         horarioInicio: '',
         horarioFim: '',
         descricao: '',
         id: 0,

         modalAberto: true
      }
   },
   setup() {
      const store = useTarefasStore()
      const menorId = computed(() => store.menorId)

      return { store, menorId }
   },
   methods: {
      switchHorario() {
         this.horarioHabilitado = !this.horarioHabilitado;
         if (this.horarioHabilitado === false) {
            this.horarioInicio = ''
            this.horarioFim = ''
         }
      },
      salvarTarefa() {
         if (this.descricao != '') {
            this.store.adicionarTarefa({
               horarioInicio: this.horarioInicio,
               horarioFim: this.horarioFim,
               descricao: this.descricao,
               id: this.id
            })
         } else {
            alert('Tarefa incompleta')
         }
         this.resetar()
      },
      resetar() {
         this.horarioInicio = ''
         this.horarioFim = ''
         this.descricao = ''
         this.id = 0
         this.switchModal()
      },
      switchModal(): void {
         this.modalAberto = !this.modalAberto
      }
   },
   watch: {
      horarioInicio() {
         if (this.horarioInicio != '') {
            this.id = parseInt(this.horarioInicio.slice(0, 2) + this.horarioInicio.slice(3, 5))
         }
      }
   },
   props: {
      titulo: {
         type: String,
         required: true
      }
   }
});
</script>

<style scoped>
.btn-adicionar {
   height: 40px;
   width: 40px;
}

.modal-card{
   max-width: 400px;
}
</style>
