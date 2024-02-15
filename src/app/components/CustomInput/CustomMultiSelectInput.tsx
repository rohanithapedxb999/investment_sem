import {MultiSelect, MultiSelectProps} from '@mantine/core'
import {IconChevronDown} from '@tabler/icons-react'
import {useThemeMode} from '../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

const CustomMultiSelectInput = (props: MultiSelectProps) => {
  const {mode} = useThemeMode()
  return (
    <>
      <>
        <style>
          {`
  .mantine-MultiSelect-error{font-size:1rem;color: #fa5252;
    border-color: #fa5252;}
  .mantine-MultiSelect-item[data-selected]{
        background-color: rgb(25, 113, 194);
        color: rgb(255, 255, 255);
  }
  .mantine-MultiSelect-input:focus-within {
    outline: none;
    border-color: #228be6;
}
${
  mode == 'dark' &&
  `.mantine-MultiSelect-input:disabled, .mantine-MultiSelect-input[data-disabled] {
  background-color: #474761;
  color: rgb(144, 146, 150);
  opacity: 0.6;
}`
}
    .mantine-MultiSelect-input{
      outline: none;
      border-color: var(--bs-gray-300);}  
    `}
        </style>
        <MultiSelect
          {...props}
          size='md'
          searchable
          withAsterisk={props.withAsterisk ?? true}
          rightSection={<IconChevronDown size='1rem' />}
          rightSectionWidth={30}
          styles={{rightSection: {pointerEvents: 'none'}}}
        />
      </>
    </>
  )
}

export default CustomMultiSelectInput
