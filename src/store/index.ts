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
            let listaTarefas = state.tarefas || []

            if (state.novaTarefa.horarioInicio && state.novaTarefa.horarioInicio) {
                state.novaTarefa.id = parseInt(state.novaTarefa.horarioInicio.slice(0, 2) + state.novaTarefa.horarioInicio.slice(3, 5))
            } else {
                state.novaTarefa.id = state.menorId
                state.menorId--
            }

            const tarefa = state.novaTarefa

            listaTarefas.push(tarefa)

            listaTarefas = listaTarefas.sort(function (a, b) { return a.id - b.id })


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
            let listaTarefas = state.tarefas || []
            listaTarefas = listaTarefas.filter((tarefa) => tarefa.id != index)
        },
        carregarTarefas(state: Estado){
            let listaTarefas = state.tarefas || []
            listaTarefas = JSON.parse(`${localStorage.getItem('Tarefas')}`);
        },
        salvarTarefas(state: Estado){
            let listaTarefas = state.tarefas || []

            console.log(listaTarefas)

            localStorage.setItem('Tarefas', `${JSON.stringify(listaTarefas)}`);
            listaTarefas = JSON.parse(`${localStorage.getItem('Tarefas')}`);
            console.log(listaTarefas)

        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}
