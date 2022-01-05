import TextField from "@mui/material/TextField";

const CustomTextField = ({field, ...props}) => {
  return <TextField {...field} {...props} />
}

export default CustomTextField
