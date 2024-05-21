import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Link,
    Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import FormElement from "../../component/formElement/FormElement";
import {loginUser} from "../../features/user.ts";

interface LoginState {
    username: string;
    password: string;
}

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector((state) => state.user.loginError);
    const {userInfo} = useAppSelector((state) => state.user);
    console.log(userInfo?.token)
    const [state, setState] = useState<LoginState>({
        username: "",
        password: "",
    });

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser({ ...state }))
            .unwrap()
            .then(() => {

                    navigate("/artists");


            });
    };

    return (
        <Container component="main" maxWidth="xs" >
            <Box
                sx={{
                    marginTop: 8,

                    display: "flex",

                    flexDirection: "column",

                    alignItems: "center",


                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography style={{color:"#000"}} component="h1" variant="h5">
                    Sign in
                </Typography>
                {error ? (
                    <Alert sx={{ width: "100%", mt: 2 }} severity="error">
                        {error}
                    </Alert>
                ) : null}
                <Box
                    component="form"
                    onSubmit={submitFormHandler}
                    sx={{ mt: 1, width: "100%" }}
                >
                    <FormElement
                        required
                        label="Login"
                        name="username"
                        value={state.username}
                        onChange={inputChangeHandler}
                    />

                    <FormElement
                        required
                        name="password"
                        label="Password"
                        type="password"
                        value={state.password}
                        onChange={inputChangeHandler}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>

                    <Grid container>
                        <Grid item>
                            <Link style={{color:"#000"}} component={RouterLink} to="/register">
                                {"Don't have an account? Sign up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
