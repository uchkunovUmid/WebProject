import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { useEffect } from "react";
import { getAlbumByArtist } from "../../features/music.ts";
import './Album.css'
import { apiUrl } from "../../constants/constants.ts";
import {List, Skeleton} from "antd";

const Album = () => {
    const { albumData } = useParams()
    const { album,isLoading } = useAppSelector((state) => state.music);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAlbumByArtist(Number(albumData)))
    }, [dispatch])

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
                       <div className={"album"}>
                           <div className={'container'}>
                               {
                                   album.map((val) => (
                                       val.published && (
                                           <div key={val.id} className={'album-card'}>
                                               <img style={{width:100}} src={`${apiUrl}/album/${val.album_image}`} alt={val.album_name} />
                                               <div className={'album-desc'}>
                                                   <p>Album: {val.album_name}</p>
                                                   <p>Release Date: {val.year}</p>
                                                   <div className={'link'}>
                                                       <Link to={`/tracks/${val.id}`}>Listen tracks</Link>
                                                   </div>
                                               </div>

                                           </div>
                                       )

                                   ))
                               }
                           </div>
                       </div>
                   </>
               )
           }
       </>
    );
};

export default Album;


