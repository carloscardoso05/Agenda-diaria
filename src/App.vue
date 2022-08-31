<template>
    <h1>{{ diaAtual }}</h1>
    <FormularioModal titulo='Nova tarefa' />
    <table class="container table table-hover table-bordered">
        <tbody>
            <Tarefa v-for='tarefa in tarefas' :key="tarefa.id" :tarefa='tarefa' />
            <div class="alert alert-primary fs-5 sm-w-50 mx-auto" v-if="listaVazia">
                Você ainda não adicionou nenhuma tarefa
            </div>
        </tbody>
    </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tarefa from './components/Tarefa.vue'
import FormularioModal from './components/FormularioModal.vue';
import { useTarefasStore } from '@/store';
import { computed } from '@vue/reactivity';

export default defineComponent({
    name: "App",
    data() {
        return {
            diaAtual: this.pegarDiaAtual()
        }
    },
    setup() {
        const store = useTarefasStore()

        return {
            store,
            tarefas: computed(() => store.tarefas)
        }
    },
    methods: {
        pegarDiaAtual(): string {
            let date = new Date()
            let dataAtual = date.getDay();
            let diaAtual = `Dia ${date.getDate()} - `
            switch (dataAtual) {
                case 0:
                    diaAtual += 'Domingo'
                    break;
                case 1:
                    diaAtual += 'Segunda Feira'
                    break;
                case 2:
                    diaAtual += 'Terça Feira'
                    break;
                case 3:
                    diaAtual += 'Quarta Feira'
                    break;
                case 4:
                    diaAtual += 'Quinta Feira'
                    break;
                case 5:
                    diaAtual += 'Sexta Feira'
                    break;
                case 6:
                    diaAtual += 'Sábado'
                    break;
                default:
                    diaAtual += 'Hoje'
                    break;
            }
            return diaAtual
        }
    },
    computed: {
        listaVazia(): boolean {
            return this.tarefas.length == 0
        }
    },
    components: { Tarefa, FormularioModal }
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
