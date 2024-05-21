import { TextField } from "@mui/material";
import  { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import MenuItem from "@mui/material/MenuItem";

type Options = {
    artist_name?:string;
    id:string | number
}

type Options2 = {
    album_name?:string
    id:string | number
}

interface Props {
    label: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    name: string;
    error?: string;
    type?: HTMLInputTypeAttribute;
    multiline?: boolean;
    autoFocus?: boolean;
    required?: boolean;
    select?:boolean;
    options?:Options[],
    options2?:Options2[]
}

const FormElement = ({
                         label,
                         name,
                         onChange,
                         value,
                         error,
                         multiline,
                         type,
                         autoFocus,
                         required,
                         select,
                         options,
                         options2
                     }: Props) => {
    return (
        <TextField
            margin="normal"
            fullWidth
            id={name}
            label={label}
            name={name}
            autoComplete={name}
            autoFocus={autoFocus}
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error}
            type={type}
            multiline={multiline}
            required={required}
            select={select}
        >
            {
                select && options ? options.map((item) => (
                    <MenuItem value ={item.id} key={item.id}>{item.artist_name}</MenuItem>)) : null
            }
            {
                select && options2 ? options2.map((item) => (
                    <MenuItem value ={item.id} key={item.id}>{item.album_name}</MenuItem>)) : null
            }
        </TextField>
    );
};

export default FormElement;
