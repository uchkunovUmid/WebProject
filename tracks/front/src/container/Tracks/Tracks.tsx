import { useParams } from "react-router-dom";
import './Track.css'
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { useEffect } from "react";
import { getTracksByAlbum } from "../../features/music.ts";
import {List, Skeleton} from "antd";
import Button from "@mui/material/Button";
import {trackHistory} from "../../features/history.ts";
import { formatDuration } from "../../helpers/formatTracks.ts";

export interface Listen {
    userId:number | undefined
    trackId:number
    token: string
}

const Tracks = () => {
    const { track } = useParams();
    const dispatch = useAppDispatch();
    const { tracks,isLoading } = useAppSelector((state) => state.music);
    const {userInfo} = useAppSelector((state) => state.user)

    useEffect(() => {
        dispatch(getTracksByAlbum(Number(track)))

    }, [dispatch]);



    const listenTrack = (trackId:number) => {
        const data = {
            userId:userInfo?.id,
            trackId:trackId,
            token: userInfo?.token || ""
        }

        dispatch(trackHistory(data))
    }

    return (
       <>
           {
               isLoading ? (
                   <List
                       grid={{ gutter: 12, column: 3 }}
                       dataSource={[1, 2, 3]}
                       renderItem={(index) => (
                           <List.Item key={index}>
                               <Skeleton loading={true} active />
                           </List.Item>
                       )}
                   />
               ) : (
                   <>
                       <div className={'track'}>
                           <div className={'container container-track'}>
                               {tracks.map((track) => (
                                   <div key={track.id} className={'track-card'}>
                                       <div className={'track-number'}>{track.track_number}.</div>
                                       <p className={'track-name'}>{track.track_name}</p>
                                       <p className={'duration'}>{formatDuration(track.duration)}</p>
                                       {
                                           userInfo && <Button onClick={() => listenTrack(track.id)}>Listen</Button>
                                       }
                                   </div>
                               ))}
                           </div>
                       </div>
                   </>
               )
           }
       </>
    );
};

export default Tracks;
