import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect} from "react";
import {tracksData} from "../../features/history.ts";
import './History.css'
const History = () => {
    const {userInfo} = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()
    useEffect(() => {
       dispatch(tracksData(Number(userInfo?.id)))
    }, [dispatch]);

    const {getHistory} = useAppSelector((state) => state.history)

    const formatDate = (dateString:string) => {
        const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    return (
        <div className={'container'}>
            {
                userInfo?.token ? (
                    getHistory.map((track) => (
                        <div className={'historyItem'} key={track.id}>
                            <div className={'historyDate'}>{formatDate(track.datetime)}</div>
                            <div className={'historyTrackName'}>{track.track.track_name}</div>
                        </div>
                    ))
                ) : (
                    <p style={{color:'#000'}}>Нету прослушанных треков</p>
                )
            }

        </div>
    );
};

export default History;
