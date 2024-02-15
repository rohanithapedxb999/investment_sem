import {Group, Radio, RadioGroupProps, RadioProps} from '@mantine/core'
import {useThemeMode} from '../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'

const CustomRadioInput = (props: RadioGroupProps & {data: RadioProps[]}) => {
  const {mode} = useThemeMode()
  return (
    <>
      <style>
        {`.mantine-Radio-error{font-size:1rem!important;}  
        .mantine-RadioGroup-error{font-size:1rem!important;padding:10px 0px;}
      .mantine-Radio-radio:focus{
        outline-offset: 0.125rem;
        outline: rgb(28, 126, 214) solid 0.125rem;
    }
    ${
      mode == 'dark' &&
      `.mantine-Radio-radio:disabled, .mantine-Radio-radio[data-disabled] {
      background-color: #474761;
      color: rgb(144, 146, 150);
      opacity: 0.6;
  }`
    }
      .mantine-Radio-radio{
        outline: none;
        border-color: var(--bs-gray-300);}
        .mantine-Radio-radio:checked {
            background: rgb(34, 139, 230);
            border-color: rgb(34, 139, 230);
        }
      `}
      </style>

      <Radio.Group {...props} withAsterisk={props.withAsterisk ?? true} size='md'>
        <Group mt='xs'>
          {props.data.map((radioData) => {
            return <Radio {...radioData} />
          })}
        </Group>
      </Radio.Group>
    </>
  )
}

export default CustomRadioInput
