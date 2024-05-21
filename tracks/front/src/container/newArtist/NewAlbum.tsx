import { useState, ChangeEvent, FormEvent } from "react";
import { Box, Button, Grid } from "@mui/material";
import { IArtists} from "../../features/music.ts";
import FormElement from "../../component/formElement/FormElement.tsx";
import FileInput from "../../component/formElement/FileInput.tsx";

interface State {
    album_name:string;
    year:string;
    album_image:string;
    artistId:string;

}

interface Props {
    onSubmit: (data: FormData) => void;
    artists:IArtists[],

}

const NewAlbum = (props: Props) => {
    const [state, setState] = useState<State>({
        album_name: "",
        year: "",
        album_image: "",
        artistId:"",

    });

    console.log(state.artistId)



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
                        label="album_name"
                        value={state.album_name}
                        onChange={inputChangeHandler}
                        name="album_name"
                    />
                </Grid>

                <Grid item xs>
                    <FormElement
                        label="year"
                        value={state.year}
                        onChange={inputChangeHandler}
                        name="year"
                    />
                </Grid>
                <Grid item xs>
                    <FormElement
                        multiline
                        label="artistId"
                        value={state.artistId}
                        onChange={inputChangeHandler}
                        name="artistId"
                        select
                        options={props.artists}
                    />
                </Grid>



                <Grid item xs>
                    <FileInput name="album_image" onChange={fileChangeHandler} label="Image" />
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

export default NewAlbum;
