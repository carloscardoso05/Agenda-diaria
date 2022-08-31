<template>
    <tr @dblclick="remover">
        <td class="horario" v-if="temHorario">{{  horario  }}</td>
        <td v-if="temHorario" class="text-wrap">{{  tarefa.descricao  }}</td>
        <td colspan="2" v-else class="text-wrap">{{  tarefa.descricao  }}</td>
        <td class="btn-remover p-0" @click="remover">
            <i class="bi bi-trash btn btn-danger p-0">
                Apagar
            </i>
        </td>
    </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ITarefa from '@/interfaces/ITarefa';
import { useStore } from '@/store';
import { computed } from '@vue/reactivity';

export default defineComponent({
    name: 'Tarefa-item',
    data() {
        return {
            horario: `${this.tarefa.horarioInicio} - ${this.tarefa.horarioFim}`,
            descricao: `${this.tarefa.descricao}`
        }
    },
    setup() {
        const store = useStore()

        return {
            store,
            tarefas: computed(() => store.state.tarefas)
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
        }
    },
    methods: {
        remover() {
            this.store.commit('removerTarefa', this.tarefa.id)
            this.store.commit('salvarTarefas')
        }
    }
})
</script>

<style scoped>
.horario {
    width: 12%;
}

.btn {
    font-style: normal;
}

.btn-remover {
    width: 6%;
}

@media (max-width: 735px) {
    .btn-remover {
        width: 12%;
    }
}
</style>