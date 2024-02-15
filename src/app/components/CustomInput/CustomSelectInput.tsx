import {Select, SelectProps} from '@mantine/core'
import {IconChevronDown} from '@tabler/icons-react'
import {useThemeMode} from '../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

const CustomSelectInput = (props: SelectProps) => {
  const {mode} = useThemeMode()
  return (
    <>
      <style>
        {`
      .mantine-Select-error{font-size:1rem;}
      .mantine-Select-item[data-selected]{
            background-color: rgb(25, 113, 194) !important;
            color: rgb(255, 255, 255) !important;
      }
      .mantine-Select-input:focus{
        outline: none !important;
        border-color: #228be6 !important;
        }
        ${
          mode == 'dark' &&
          `.mantine-Select-input:disabled, .mantine-Select-input[data-disabled] {
          background-color: #474761;
          color: rgb(144, 146, 150);
          opacity: 0.6;
      }`
        }

        .mantine-Select-input{
          outline: none !important;
          border-color: var(--bs-gray-300) !important;}  
          .mantine-Select-input[data-invalid]{
            color: #fa5252 !important;
        border-color: #fa5252 !important;}  
        `}
      </style>
      <Select
        {...props}
        size='md'
        searchable
        withAsterisk={props.withAsterisk ?? true}
        rightSection={<IconChevronDown size='1rem' />}
        rightSectionWidth={30}
        styles={{rightSection: {pointerEvents: 'none'}}}
        nothingFound='No Options'
      />
    </>
  )
}

export default CustomSelectInput
