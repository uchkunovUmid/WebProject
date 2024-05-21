import './Header.css'
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import UserMenu from "../userMenu/userMenu.tsx";
import { useAppSelector} from "../../store/hooks.ts";

const Header = () => {


    const user = useAppSelector((state) => state.user.userInfo);
    const navigate = useNavigate()



    return (
        <>
            <div className={'header'}>
                <div className='container container-row'>
                    <div className='navbar'>
                        <ul className={'nav-list'}>
                            <li>
                                   <Link to={'/artists'}>Артисты</Link>
                               </li>
                            <li>
                                <Link to={'/history'}>История прослушеваний</Link>
                            </li>
                        </ul>
                    </div>
                    {user?.username ? (
                        <>
                           <UserMenu username={user.username} />
                            {
                                user.role === 'admin' ? (
                                    <Button onClick={() => navigate('/admin')}  color="secondary" variant="contained">
                                        Admin
                                    </Button>
                                ) : (
                                    <div>{null}</div>
                                )
                            }
                           <Button onClick={() => navigate('/newArtist')} color="secondary" variant="contained">
                               Add New Artist
                           </Button>
                           <Button onClick={() => navigate('/newAlbum')} color="secondary" variant="contained">
                               Add New Album
                           </Button>
                           <Button onClick={() => navigate('/newTrack')}  color="secondary" variant="contained">
                               Add New Track
                           </Button>


                       </>
                    ) : (

                        <div>
                            <Button component={Link} to={"/register"}>
                                Sing Up
                            </Button>
                            <Button component={Link} to={"/login"}>
                                Sing In
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
