import ITarefa from '@/interfaces/ITarefa'
import { defineStore } from 'pinia'

export const useTarefasStore = defineStore('TarefasStore', {
    state: () => ({
        tarefas: [] as ITarefa[],
        menorId: 0
    }),
    actions: {
        adicionarTarefa(tarefa: ITarefa) {
            if(this.tarefas.length == 0){
                this.menorId = 0
            }

            if (tarefa.id <= 0) {
                tarefa.id = this.menorId
                this.menorId--
            }
            this.tarefas.push(tarefa)
            this.tarefas = this.tarefas.sort(function (a, b) { return a.id - b.id })
        },
        removerTarefa(id: number) {
            this.tarefas = this.tarefas.filter((tarefa) => tarefa.id != id)
        },
        concluirTarefa(id:number){
            const tarefa = this.tarefas.find((tarefa) => tarefa.id == id)
            let tarefaConcluido = tarefa?.concluido
            tarefaConcluido = !tarefaConcluido
            console.log(tarefaConcluido);            
        }
    },
    persist: true
})
