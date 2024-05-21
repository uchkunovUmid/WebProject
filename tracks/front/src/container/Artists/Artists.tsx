import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect} from "react";
import {getArtists} from "../../features/music.ts";
import {apiUrl} from "../../constants/constants.ts";
import './Artists.css'
import {Link} from "react-router-dom";
import {List, Skeleton} from "antd";

const Artists = () => {
    const dispatch = useAppDispatch()
    const {artists,isLoading} = useAppSelector((state) => state.music)
    const {userInfo} = useAppSelector((state) => state.user)
    useEffect(() => {
        dispatch(getArtists())
    },[dispatch])
    console.log(artists)
    console.log(userInfo?.role)
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
                                   {
                                       artists.map((artist) => (
                                           artist.published &&  (

                                               <div key={artist.id} className="artist-card">
                                                   <div className="artist-image">
                                                       <Link to={`/album/${artist.id}`}>
                                                           <img src={`${apiUrl}/artist/${artist.artist_image}`} alt={artist.artist_name} />
                                                       </Link>
                                                   </div>
                                                   <div className="artist-info">
                                                       <p>{artist.artist_name}</p>
                                                       <p>{artist.description}</p>
                                                   </div>
                                               </div>
                                               )

                                       ))
                                   }
                               </div>
                           </div>
                       </div>
                        </>

                       )
           }


       </>


    );
};

export default Artists;




