import {create} from 'zustand'

type State = {
  isAuth: boolean
  token: string
  currentAuths: Record<any, any>
  isDeactivatedUser: boolean
}

type Actions = {
  login: (isAuth: boolean) => void
  loOut: (isAuth: boolean) => void
  register: (isAuth: boolean) => void
  setCurrentAuths: (payload: Record<any, any>) => void
  setIsDeactivatedUser: (state: boolean) => void
  checkCurrentUserActivity: () => void
}

export const useAuthStore = create<State & Actions>((set) => ({
  isAuth: false,
  token: '',
  currentUser: undefined,
  currentAuths: {},
  isDeactivatedUser: false,
  login: (isAuth) => {
    set({isAuth})
  },
  loOut: (isAuth) => {
    set({isAuth})
  },
  register: (isAuth) => {
    set({isAuth})
  },
  setCurrentAuths: (currentAuths) => {
    set({currentAuths})
  },
  setIsDeactivatedUser: (state) => {
    set({isDeactivatedUser: state})
  },
  checkCurrentUserActivity: () => {
    console.log('checkCurrentUserActivity')
  },
}))
