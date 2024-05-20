import wretch from 'wretch'
import {baseDevUrl} from './consts'
import {getToken} from './auth.service'
import {useAuthStore} from "../../store/auth";

export type Errors = {
  Code: number
  Message: string
  Description: string
}

export const baseWretch = () => {
  const authState = useAuthStore.getState()
  authState.setIsDeactivatedUser(false)

  return wretch()
    .url(`${baseDevUrl}`)
    .headers({
      'X-DCRT-HRM-AUTH': getToken(),
    })
    .catcher(401, (error) => console.log(error.response))
    .catcher(403, (error) => {
      throw new Error((JSON.parse(error.message) as Errors).Message)
    })
    .catcher(420, (error) => {
      throw new Error((JSON.parse(error.message) as Errors).Message)
    })
    .catcher(404, (error) => {
      throw new Error(error.message)
    })
    .catcher(400, (error) => console.log(error.response))
    .catcher(409, (error) => console.log(error.response))
    .catcher(422, (error) => console.log(error.response))
    .catcher(419, () => {
      const authState = useAuthStore.getState()
      console.error('DEACTIVATED USER')
      authState.setIsDeactivatedUser(true)
    })
    .catcher(421, () => {
      console.error('TOKEN WAS EXPIRED')
      localStorage.removeItem('token')
      window.location.reload()
    })
}
