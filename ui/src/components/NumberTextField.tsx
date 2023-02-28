import { TextField, TextFieldProps } from "@material-ui/core";
import { useCallback } from 'react'
import { numberRegex } from "../utils/dex";

export default function NumberTextField({
  ...props
}: TextFieldProps) {
  const onChange = useCallback((e) => {
    if (numberRegex.test(e.target.value)) {
      props.onChange?.(e)
    }
  }, [props])

  return (
    <TextField
      type="text"
      {...props}
      InputProps={{ ...(props?.InputProps || {}) }}
      onChange={onChange}
    />
  );
}
