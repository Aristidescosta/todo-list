import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { useField } from "@unform/core";

type TVTextFieldsProps = TextFieldProps & {
  name: string;
};

export const VTextFields: React.FC<TVTextFieldsProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, clearError, defaultValue, error } =
    useField(name);
  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <TextField
      {...rest}
      value={value}
      helperText={error}
      error={!!error}
      defaultValue={defaultValue}
      onKeyDown={() => (error ? clearError() : undefined)}
      onChange={(e) => {
        setValue(e.target.value);
        rest.onChange?.(e);
      }}
    />
  );
};