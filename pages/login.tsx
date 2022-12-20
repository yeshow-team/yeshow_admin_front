import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        document.title = "로그인";
        if (localStorage.getItem("access") != null) {
            router.replace("/");
        }
    }, []);

    const login = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (id === "" || password === "") {
            setErrorMessage("아이디와 비밀번호를 입력해주세요.");
        } else {
            axios
                .post(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/login/admin`,
                    {
                        user_id: id,
                        user_pw: password,
                    },
                    {
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        localStorage.setItem("refresh", res.data.refreshToken);
                        axios
                            .get(
                                `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,

                                {
                                    headers: {
                                        Cookie: `refreshToken=${res.data.refreshToken}`,
                                    },
                                    withCredentials: true,
                                }
                            )
                            .then((res) => {
                                console.log(res);
                                localStorage.setItem(
                                    "access",
                                    res.data.accessToken
                                );
                                router.replace("/");
                            });
                    } else {
                        setError(true);
                        setErrorMessage("아이디와 비밀번호를 확인해주세요.");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setError(true);
                    setErrorMessage("아이디와 비밀번호를 확인해주세요.");
                });
        }
    };
    return (
        <Container>
            <LoginBox>
                <Logo src="images/logo.png" />
                <Spacer size="26px" />
                <PageTitle>사장님 서비스 로그인</PageTitle>
                <Spacer size="40px" />
                <AuthInput
                    placeholder="아이디를 입력해주세요"
                    value={id}
                    onChange={(e) => {
                        setId(e.target.value);
                    }}
                />
                <Spacer size="16px" />
                <AuthInput
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <Spacer size="32px" />
                <LoginButton type="button" onClick={(e) => login(e)}>
                    로그인
                </LoginButton>
            </LoginBox>
        </Container>
    );
};

const LoginButton = styled.button`
    width: 100%;
    height: 60px;
    background: #5992ff;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 19px;
    line-height: 16px;
    color: #ffffff;
    border: none;
    cursor: pointer;
    &:hover {
        background: #3c67d4;
        transition: all 0.3s ease-in-out;
    }
`;

const Spacer = styled.div<{ horizontal?: boolean | null; size: string }>`
    width: ${(props: any) => (props.horizontal ? props.size : "0px")};
    height: ${(props: any) => (props.horizontal ? "0px" : props.size)};
`;

const PageTitle = styled.div`
    font-weight: 500;
    font-size: 26px;
    line-height: 26px;

    color: #2d2d2d;
`;

const AuthInput = styled.input`
    width: 100%;
    height: 59px;
    padding: 22px 20px;
    background: #fafafb;
    border-radius: 7px;
    font-weight: 400;
    font-size: 19px;
    line-height: 19px;
    color: #46464d;
    border: none;
    outline: none;

    &::placeholder {
        color: #b3b4be;
    }
`;

const Logo = styled.img`
    width: 161px;
    height: auto;
`;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
`;

const LoginBox = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
`;

export default Login;
