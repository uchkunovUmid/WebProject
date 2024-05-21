import { Paper, Typography } from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import { useNavigate } from "react-router-dom";

import {useEffect} from "react";
import {createAlbum, getArtists} from "../../features/music.ts";
import NewAlbum from "./NewAlbum.tsx";

export interface ProductData {
    title: string;
    descriptions: string;
    price: number;
    image: string;
}
const SubmitAlbum = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getArtists())
    }, [dispatch]);
    const {artists} = useAppSelector((state) => state.music)

    const onProductFormSubmit = async (albumData: FormData) => {
        await dispatch(createAlbum(albumData));
        navigate("/artists");
    };

    return (
        <Paper sx={{ padding: 4 }}>
            <Typography variant="h4">New Album</Typography>

            <NewAlbum onSubmit={onProductFormSubmit} artists={artists} />
        </Paper>
    );
};

export default SubmitAlbum;
