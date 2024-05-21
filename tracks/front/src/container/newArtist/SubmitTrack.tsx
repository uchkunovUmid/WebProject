import { Paper, Typography } from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { useNavigate } from "react-router-dom";

import {useEffect} from "react";
import {createTracks, getAlbums, getArtists} from "../../features/music.ts";
import NewTrack from "./NewTrack.tsx";

export interface ProductData {
    track_name:string;
    duration:string;
    track_number:string;
    albumId:string;
    artistId:string
}
const SubmitTrack = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getArtists())
        dispatch(getAlbums())
    }, [dispatch]);
    const {artists} = useAppSelector((state) => state.music)
    const {getAlbum} = useAppSelector((state) => state.music)

    const onProductFormSubmit = async (trackData:ProductData) => {
        await dispatch(createTracks(trackData));
        navigate("/artists");
    };

    return (
        <Paper sx={{ padding: 4 }}>
            <Typography variant="h4">New Track</Typography>

            <NewTrack onSubmit={onProductFormSubmit} artists={artists} albums={getAlbum}/>
        </Paper>
    );
};

export default SubmitTrack;
