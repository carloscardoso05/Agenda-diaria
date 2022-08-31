import ITarefa from '@/interfaces/ITarefa'
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        tarefas: [] as ITarefa[],
        menorId: 0
    }),
    actions: {
        adicionarTarefa(tarefa: ITarefa) {
            if (tarefa.id <= 0) {
                tarefa.id = this.menorId
                this.menorId--
            }
            this.tarefas.push(tarefa)
            this.tarefas = this.tarefas.sort(function (a, b) { return a.id - b.id })
        },
        removerTarefa(id: number) {
            this.tarefas = this.tarefas.filter((tarefa) => tarefa.id != id)
        }
    }
})
