import {getFromStorage, removeFromStorage} from './local-storage.service'

// token
export const getToken = (): string => getFromStorage('token')


export const removeToken = () => {
  removeFromStorage('token')
}
