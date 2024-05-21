import { useState, ChangeEvent, FormEvent } from "react";
import { Box, Button, Grid } from "@mui/material";
import FormElement from "../../component/formElement/FormElement.tsx";
import { IArtists, IGetAlbum} from "../../features/music.ts";

export interface State {
    track_name:string;
    duration:string;
    track_number:string;
    albumId:string;
    artistId:string
}

interface Props {
    onSubmit: (data: State) => void;
    artists:IArtists[],
    albums:IGetAlbum[]
}

const NewTrack = (props: Props) => {
    const [state, setState] = useState<State>({
        track_name: "",
        duration: "",
        track_number: "",
        albumId:'',
        artistId:''
    });


    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit(state);
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => {
            return { ...prevState, [name]: value };
        });
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
                        label="track_name"
                        value={state.track_name}
                        onChange={inputChangeHandler}
                        name="track_name"
                    />
                </Grid>
                <Grid item xs>
                    <FormElement
                        label="track_number"
                        value={state.track_number}
                        onChange={inputChangeHandler}
                        name="track_number"
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
                    <FormElement
                        multiline
                        label="albumId"
                        value={state.albumId}
                        onChange={inputChangeHandler}
                        name="albumId"
                        select
                        options2={props.albums}

                    />
                </Grid>
                <Grid item xs>
                    <FormElement
                        label="duration"
                        value={state.duration}
                        onChange={inputChangeHandler}
                        name="duration"
                    />
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

export default NewTrack;
