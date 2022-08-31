import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import ITarefa from '@/interfaces/ITarefa';
import { InjectionKey } from 'vue';

interface Estado {
    tarefas: ITarefa[],
    novaTarefa: ITarefa,
    menorId: number
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore({
    state() {
        return {
            tarefas: [],
            novaTarefa: {
                descricao: '',
                horarioInicio: '',
                horarioFim: '',
                id: 0
            },
            menorId: 0
        }
    },
    mutations: {
        adicionaTarefa(state: Estado) {
            console.log(state.tarefas)

            if (state.novaTarefa.horarioInicio && state.novaTarefa.horarioInicio) {
                state.novaTarefa.id = parseInt(state.novaTarefa.horarioInicio.slice(0, 2) + state.novaTarefa.horarioInicio.slice(3, 5))
            } else {
                state.novaTarefa.id = state.menorId
                state.menorId--
            }

            const tarefa = state.novaTarefa

            state.tarefas.push(tarefa)

            state.tarefas = state.tarefas.sort(function (a, b) { return a.id - b.id })


        },
        resetar(state: Estado) {
            state.novaTarefa = {
                descricao: '',
                horarioInicio: '',
                horarioFim: '',
                id: 0
            }
        },
        removerTarefa(state: Estado, index) {
            state.tarefas = state.tarefas.filter((tarefa) => tarefa.id != index)
        },
        carregarTarefas(state: Estado){
            state.tarefas = JSON.parse(`${localStorage.getItem('Tarefas')}`);
        },
        salvarTarefas(state: Estado){
            const parsed = JSON.stringify(state.tarefas);

            localStorage.setItem('Tarefas', parsed);
            state.tarefas = JSON.parse(`${localStorage.getItem('Tarefas')}`);
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}
