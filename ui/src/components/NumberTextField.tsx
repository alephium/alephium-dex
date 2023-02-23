import { TextField, TextFieldProps } from "@material-ui/core";

export default function NumberTextField({
  ...props
}: TextFieldProps) {
  return (
    <TextField
      type="number"
      {...props}
      InputProps={{
        ...(props?.InputProps || {}),
      }}
    ></TextField>
  );
}
