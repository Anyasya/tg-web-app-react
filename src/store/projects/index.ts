import {create} from 'zustand'
import {baseWretch} from "../../shared/api";

type State = {
    projects: any[]
}


type Actions = {
    fetchGetProjects: (id: number) => Promise<any>
    setProjects: (state: any[]) => void
}

export const useProjectsStore = create<State & Actions>((set) => ({
    projects: [],
    fetchGetProjects: async (id) => {
        try {
            const res: any = (await baseWretch().url(`/posts`).get().json()) as any
            if (res) {
                return res
            }
        } catch (e) {
            // alertStore?.addAlert('error', 'Произошла ошибка при загрузке кандидатов, обновите страницу.')
        }
    },
    setProjects: (projects) => set({projects}),
}))
