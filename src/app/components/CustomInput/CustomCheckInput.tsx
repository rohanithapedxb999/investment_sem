import {Checkbox, CheckboxProps} from '@mantine/core'
import {useThemeMode} from '../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

const CustomCheckInput = (props: CheckboxProps) => {
  const {mode} = useThemeMode()
  return (
    <>
      <style>
        {`
      .mantine-Checkbox-error{font-size:1rem;}
      .mantine-Checkbox-input:checked{
        background-color: rgb(34, 139, 230);
        border-color: rgb(34, 139, 230);
      }
      .mantine-Checkbox-input:focus{
        outline: none;
        border-color: #228be6;
        }
        ${
          mode == 'dark' &&
          `.mantine-Checkbox-input:disabled, .mantine-Checkbox-input[data-disabled] {
          background-color: #474761;
          color: rgb(144, 146, 150);
          opacity: 0.6;
        }`
        }
        .mantine-Checkbox-input{
          outline: none;
          border-color: var(--bs-gray-300);}   
        `}
      </style>
      <Checkbox {...props} size='md' />
    </>
  )
}

export default CustomCheckInput
