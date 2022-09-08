<template>
    <tr>
        <td class="horario text-nowrap" v-if="temHorario" :class="{'concluido' : concluido}">{{ horario }}</td>
        <td v-if="temHorario" class="text-wrap border-end-0" :class="{'concluido' : concluido}">{{ tarefa.descricao }}</td>
        <td colspan="2" v-else class="text-wrap border-end-0" :class="{'concluido' : concluido}">{{ tarefa.descricao }}</td>
        <td class="btn-acao border-start-0 border-end-0 h-100 align-middle">
            <button class="fa-solid fa-check btn btn-success fs-5" @click="concluir"></button>
        </td>
        <td class="btn-acao border-start-0 h-100 align-middle">
            <button class="fa-regular fa-trash-can btn btn-danger fs-5" @click="remover"></button>
        </td>
    </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ITarefa from '@/interfaces/ITarefa';
import { useTarefasStore } from '@/store';
import { computed } from '@vue/reactivity';

export default defineComponent({
    name: 'Tarefa-item',
    data() {
        return {
            horario: `${this.tarefa.horarioInicio} - ${this.tarefa.horarioFim}`,
            descricao: `${this.tarefa.descricao}`,
        }
    },
    setup() {
        const store = useTarefasStore()

        return {
            store,
            tarefas: computed(() => store.$state.tarefas)
        }
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    computed: {
        temHorario(): boolean {
            if (this.tarefa.horarioInicio === '' || this.tarefa.horarioFim === '') {
                return false
            } else {
                return true
            }
        },
        concluido(){
            return this.tarefa.concluido
        }
    },
    methods: {
        remover() {
            this.store.removerTarefa(this.tarefa.id)
        },
        concluir() {
            this.store.concluirTarefa(this.tarefa.id)
        }
    }
})
</script>

<style scoped>
.horario {
    width: 12%;
    border-right: 1.5px #ECECEC solid;
}

.btn-acao {
    width: 6%;
}

.concluido {
    text-decoration: line-through;
}

@media (max-width: 735px) {
    .btn-acao {
        width: 12%;
    }
}

tr:first-child {
    border-radius: 12px 12px 0px 0px;
}

tr:first-child>td:first-child {
    border-radius: 12px 0px 0px 0px;
}

tr:first-child>.btn-acao:last-child {
    border-radius: 0px 12px 0px 0px;
}

tr:last-child {
    border-radius: 0px 0px 12px 12px;
}

tr:last-child>td:first-child {
    border-radius: 0px 0px 0px 12px;
}

tr:last-child>.btn-acao:last-child {
    border-radius: 0px 0px 12px 0px;
}

tr:last-child {
    border-bottom: hidden;
}
</style>