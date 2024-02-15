import {TextInput, TextInputProps} from '@mantine/core'
import {useThemeMode} from '../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

const CustomNumberInput = (props: TextInputProps) => {
  const {mode} = useThemeMode()
  return (
    <>
      <style>{`.mantine-TextInput-error{font-size:1rem;}
            .mantine-TextInput-input:focus{
              outline: none;
              border-color: #228be6;
              }
              ${
                mode == 'dark' &&
                `.mantine-TextInput-input:disabled, .mantine-TextInput-input[data-disabled] {
                background-color: #474761;
                color: rgb(144, 146, 150);
                opacity: 0.6;
            }`
              }
              .mantine-TextInput-input{
                outline: none;
                border-color: var(--bs-gray-300);} 
              `}</style>
      <TextInput
        type='number'
        {...props}
        size='md'
        withAsterisk={props.withAsterisk ?? true}
        minLength={props.minLength ?? 2}
        maxLength={props.maxLength ?? 250}
      />
    </>
  )
}

export default CustomNumberInput
