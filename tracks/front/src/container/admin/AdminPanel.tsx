import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect} from "react";
import {
    deleteAlbum,
    getAlbums,
    getArtists,
    getTracks,
    publishAlbum,
    publishArtist,
    publishTrack
} from "../../features/music.ts";
import {apiUrl} from "../../constants/constants.ts";
import {Link, useNavigate} from "react-router-dom";
import {List, Skeleton} from "antd";
import '../Artists/Artists.css'
import '../Album/Album.css'
import {formatDuration} from "../../helpers/formatTracks.ts";

const AdminPanel = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {artists,isLoading,getAlbum,getTrack} = useAppSelector((state) => state.music)
    const {userInfo} = useAppSelector((state) => state.user)
    useEffect(() => {
        dispatch(getArtists());
        dispatch(getAlbums());
        dispatch(getTracks())
    },[dispatch])
    console.log(userInfo?.role)

    const publishArtistHandler = (id:number) => {
        dispatch(publishArtist(id)).then(() => {
            navigate(-1)
        })
    }

    const publishAlbumHandler = (id:number) => {
        dispatch(publishAlbum(id)).then(() => {
            navigate(-1)
        })
    }
    const publishTrackHandler = (id:number) => {
        dispatch(publishTrack(id)).then(() => {
            navigate(-1)
        })
    }


    const deleteHandlerAlbum = (id:number) => {
        dispatch(deleteAlbum(id)).then(() => {
           dispatch(getAlbums())
        })
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
                        <div className={'items'}>
                            <div className={'container '}>
                                <div className={'artists'}>
                                    <h2>Artists</h2>
                                    {
                                        artists.map((artist) => (
                                            !artist.published && userInfo?.role === 'admin' && (
                                                <div key={artist.id} className="artist-card">
                                                    <div className="artist-image">
                                                        <Link to={`/album/${artist.id}`}>
                                                            <img src={`${apiUrl}/artist/${artist.artist_image}`} alt={artist.artist_name} />
                                                        </Link>
                                                    </div>
                                                    <div className="artist-info">
                                                        <p>{artist.artist_name}</p>
                                                        <p>{artist.description}</p>
                                                        <button onClick={() => publishArtistHandler(artist.id)}>Опубликовать</button>
                                                    </div>
                                                </div>
                                            )
                                            )

                                        )
                                    }
                                </div>
                                <div>
                                    <h2>Albums</h2>

                                        {
                                            getAlbum.map((val) => (
                                                !val.published && userInfo?.role === 'admin' && (
                                                <div key={val.id} className={'album-card'}>
                                                    <img style={{width:100}} src={`${apiUrl}/album/${val.album_image}`} alt={val.album_name} />
                                                    <div className={'album-desc'}>
                                                        <p>Album: {val.album_name}</p>
                                                        <p>Release Date: {val.year}</p>
                                                        <button onClick={() => publishAlbumHandler(val.id)}>Опубликовать</button>
                                                        <button onClick={() => deleteHandlerAlbum(val.id)}>Удалить</button>
                                                    </div>

                                                </div>
                                                )
                                            ))
                                        }

                                </div>
                                <div>
                                    <h2>Tracks</h2>

                                    {getTrack.map((track) => (
                                        !track.published && userInfo?.role === 'admin' && (
                                        <div key={track.id} className={'track-card'}>
                                            <div className={'track-number'}>{track.track_number}.</div>
                                            <p className={'track-name'}>{track.track_name}</p>
                                            <p className={'duration'}>{formatDuration(track.duration)}</p>
                                            <button onClick={() => publishTrackHandler(track.id)}>Опубликовать</button>
                                        </div>
                                    )))}

                                </div>
                            </div>
                        </div>
                    </>

                )
            }


        </>


    );
};

export default AdminPanel;




