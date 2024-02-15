import {createContext} from 'react'
import {RoleContextValue} from '../types/OtherTypes'

const roleContext = createContext<RoleContextValue>({
  state: '',
  module: [],
  features: [],
  updateState: () => {},
})

export default roleContext
