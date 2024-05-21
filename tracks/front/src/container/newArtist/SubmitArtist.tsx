import { Paper, Typography } from "@mui/material";
import {useAppDispatch} from "../../store/hooks";
import { useNavigate } from "react-router-dom";

import {createArtist, getArtists} from "../../features/music.ts";
import NewArtist from "./newArtsit.tsx";
import {useEffect} from "react";


const SubmitArtist = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getArtists())
    }, [dispatch]);

    const onProductFormSubmit = async (artistData: FormData) => {
        await dispatch(createArtist(artistData)).then(() => {
            dispatch(getArtists())
        });
        navigate("/artists");
    };

    return (
        <Paper sx={{ padding: 4 }}>
            <Typography variant="h4">New Artist</Typography>

            <NewArtist onSubmit={onProductFormSubmit}  />
        </Paper>
    );
};

export default SubmitArtist;
