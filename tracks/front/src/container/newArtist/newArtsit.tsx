import { useState, ChangeEvent, FormEvent } from "react";
import { Box, Button, Grid } from "@mui/material";
import FormElement from "../../component/formElement/FormElement.tsx";
import FileInput from "../../component/formElement/FileInput.tsx";

export interface State {

    artist_name:string;
    artist_image:string;
    description:string
}

interface Props {
    onSubmit: (data: FormData) => void;

}

const NewArtist = (props: Props) => {
    const [state, setState] = useState<State>({
        artist_name: "",
        description: "",
        artist_image: "",
    });


    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();

        Object.entries(state).forEach(([key, value]) => {
            formData.append(key, value);
        });

        props.onSubmit(formData);
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => {
            return { ...prevState, [name]: value };
        });
    };

    const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        const file = e.target.files ? e.target.files[0] : "";

        setState((prevState) => ({
            ...prevState,
            [name]: file,
        }));
    };

    return (
        <Box
            component={"form"}
            autoComplete="off"
            onSubmit={submitFormHandler}
            paddingY={2}
        >
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <FormElement
                        label="artist_name"
                        value={state.artist_name}
                        onChange={inputChangeHandler}
                        name="artist_name"
                    />
                </Grid>

                <Grid item xs>
                    <FormElement
                        label="description"
                        value={state.description}
                        onChange={inputChangeHandler}
                        name="description"
                    />
                </Grid>
                <Grid item xs>
                    <FileInput name="artist_image" onChange={fileChangeHandler} label="Image" />
                </Grid>
                <Grid item xs>
                    <Button type="submit" color="primary" variant="contained">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewArtist;
