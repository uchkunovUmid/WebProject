
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./component/Layout/Layout.tsx";
import Artists from "./container/Artists/Artists.tsx";
import Album from "./container/Album/Album.tsx";
import Tracks from "./container/Tracks/Tracks.tsx";
import Register from "./container/Register/Register.tsx";
import Login from "./container/Login/Login.tsx";
import ProtectedRoute from "./component/protectedRoute/ProtectedRoute.tsx";
import {useAppSelector} from "./store/hooks.ts";
import History from "./container/historu/History.tsx";
import SubmitAlbum from "./container/newArtist/SubmitAlbum.tsx";
import SubmitArtist from "./container/newArtist/SubmitArtist.tsx";
import SubmitTrack from "./container/newArtist/SubmitTrack.tsx";
import AdminPanel from "./container/admin/AdminPanel.tsx";

function App() {

  const {userInfo} = useAppSelector((state) => {
    return state.user;
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Layout/>}>
            <Route index path={'/artists'} element={<Artists/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/history" element={<History />}/>
            <Route path="/newAlbum" element={<SubmitAlbum />}/>
            <Route path="/newArtist" element={<SubmitArtist />}/>
            <Route path="/newTrack" element={<SubmitTrack />}/>
            <Route path="/admin" element={<AdminPanel />}/>
            SubmitArtist
            <Route element={
              <ProtectedRoute isAllowed={!!userInfo?.username} redirectPath="/login" />
            }/>

              <Route path={'/album/:albumData'} element={<Album/>}/>
            <Route path={'/tracks/:track'} element={<Tracks/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
