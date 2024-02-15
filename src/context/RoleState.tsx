import {useEffect, useState} from 'react'
import RoleContext from './roleContext'

const RoleState = (props: {children: any}) => {
  const [state, setState] = useState<string>('')
  const [module, setModule] = useState<Array<string>>([])
  const [features, setFeatures] = useState<Array<string>>([])
  const updateState = (state: string, modules: Array<string>, features: Array<string>) => {
    setState(state)
    setModule(modules)
    setFeatures(features)
  }

  useEffect(() => {
    const firstRole: string | null = sessionStorage.getItem('currentUserRole')
    if (firstRole) {
      const Role: {roleName: string; modules: Array<string>; features: Array<string>} =
        JSON.parse(firstRole)
      if (Role !== null) {
        setState(Role.roleName)
        setModule(Role.modules)
        setFeatures(Role.features)
      }
    }
  }, [])

  return (
    <>
      <RoleContext.Provider value={{state, module, features, updateState}}>
        {props.children}
      </RoleContext.Provider>
    </>
  )
}

export default RoleState
