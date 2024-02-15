import Select, {components} from 'react-select'

const CustomSelect = (props: {
  id?: string
  options: any
  value: any
  onChange: any
  name: string
  disable: boolean
  Message?: string
  innerRef?: any
  isMulti?: boolean
  placeholder?: string
  isSortDesc?: boolean
  isUnsorted?: boolean
  defaultValue?: {label: string; value: string}
  menuPlacement?: 'top' | 'bottom'
}) => {
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: 'var(--kt-input-border-color)',
      backgroundColor: state.isDisabled ? 'var(--kt-input-disabled-bg)' : 'var(--kt-input-bg)',
      color: state.isFocused ? 'blue' : 'red',
    }),
    multiValue: (styles: any, state: any) => {
      return {
        ...styles,
        color: state.isDisabled ? 'red' : state.isSelected ? 'black' : 'black',
        backgroundColor: state.isDisabled ? 'var(--kt-input-disabled-bg)' : '#d9d9d9',
        borderColor: 'var(--kt-input-border-color)',
      }
    },
    multiValueLabel: (styles: any, state: any) => ({
      ...styles,
      color: state.isDisabled ? 'red' : state.isSelected ? 'black' : 'black',
      borderColor: 'red',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isDisabled
        ? 'red'
        : state.isSelected
        ? 'var(--kt-headings-color)'
        : 'var(--kt-headings-color)',
      backgroundColor: state.isSelected
        ? 'var(--kt-input-color)'
        : state.isFocused
        ? '#B3B3B3'
        : 'var(--kt-input-bg)',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      svg: {
        fill: '#c4c4c7',
      },
    }),
  }
  const NoOptionsMessage = (props: any) => {
    return <components.NoOptionsMessage {...props}>No Options</components.NoOptionsMessage>
  }
  return (
    <Select
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          primary25: '#B3B3B3',
          primary50: '#CCCCCC',
          primary: 'var(--kt-headings-color)', // selected color
          neutral0: 'var(--kt-input-bg)', // background color
          neutral80: 'var(--kt-headings-color)', // text
        },
      })}
      isDisabled={props.disable}
      id={props.id}
      options={
        props.isUnsorted
          ? props.options
          : props.options.sort((a: {label: string}, b: {label: string}) => {
              return (props?.isSortDesc ? -1 : 1) * a.label.localeCompare(b.label)
            })
      }
      value={props.value}
      styles={customStyles}
      onChange={props.onChange}
      name={props.name}
      isMulti={props.isMulti}
      ref={props.innerRef}
      components={{NoOptionsMessage}}
      isOptionDisabled={(option) => option.isdisabled}
      classNamePrefix='myDropDown'
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      menuPlacement={props.menuPlacement ?? 'bottom'}
      hideSelectedOptions
    />
  )
}

export default CustomSelect
