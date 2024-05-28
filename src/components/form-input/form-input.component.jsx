import { FormInputLabel, Input, Group, Select } from './form-input.styles';

const FormInput = ({ label,options, ...otherProps }) => {
  return(
    <Group>
      {options ? (
        <Select {...otherProps}>
          {options.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
      ) : (
        <Input {...otherProps} />
      )}
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
      )}
    </Group>
  )
}

export default FormInput;