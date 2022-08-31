<template>

   <!-- Button trigger modal -->
   <button type="button" class="btn-adicionar btn btn-primary rounded-5 mb-3" data-bs-toggle="modal"
      data-bs-target="#exampleModal">
      <i class="fa-solid fa-plus"></i>
   </button>

   <!-- Modal -->
   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
      data-bs-backdrop="static" data-bs-keyboard="false">
      <div class="modal-dialog modal-dialog-centered">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLabel">
                  {{ titulo }}
               </h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- Conteúdo vai aqui -->
            <div class="modal-body">

               <!-- Formulario -->
               <div class="form-container">
                  <form id="form">
                     <!-- horário liga/desliga -->
                     <div class="form-check form-switch d-inline-block">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
                           @click="trocarHorario" checked>
                        <label class="form-check-label" for="flexSwitchCheckChecked">Horário</label>
                     </div>

                     <div class="form-group d-flex justify-content-evenly">

                        <!-- horario-inicio -->
                        <div class="form-group">
                           <label class="form-label" for="horario-inicio">De:</label>
                           <input class="form-control" type="time" name="horario-inicio" id="horario-inicio"
                              :disabled="!horarioHabilitado" v-model="horarioInicio">
                        </div>

                        <!-- horario-fim -->
                        <div class="form-group">
                           <label class="form-label" for="horario-fim">Até:</label>
                           <input class="form-control" type="time" name="horario-fim" id="horario-fim"
                              :disabled="!horarioHabilitado" v-model="horarioFim">
                        </div>
                     </div>

                     <!-- tarefa-texto -->
                     <div class="form-group">
                        <label class="form-label" for="tarefa-texto">Tarefa:</label>
                        <input class="form-control" type="text" name="tarefa-texto" id="tarefa-texto"
                           v-model="descricao" autocomplete="off" autocapitalize="sentences">
                     </div>
                  </form>
               </div>

            </div>

            <!-- Botões -->
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetar">Fechar</button>
               <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click.prevent="salvarTarefa">
                  Salvar
               </button>
            </div>
         </div>
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
         id: 0

      }
   },
   setup() {
      const store = useTarefasStore()
      const menorId = computed(() => store.menorId)

      return { store, menorId }
   },
   methods: {
      trocarHorario() {
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
</style>
