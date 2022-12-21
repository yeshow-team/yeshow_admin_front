import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const Header = () => {
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem("access") == null) {
            router.replace("/login");
        }
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("access")}`;
    }, []);

    const fetchMyInfo = async () => {
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/user`
        );
        console.log(data);
        return data;
    };

    const { data, error, isLoading } = useQuery(["user"], fetchMyInfo);
    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    const logout = () => {
        alert("로그아웃 되었습니다.");
        localStorage.removeItem("access");
        router.replace("/login");
    };

    return (
        <Container>
            <HeaderWrapper>
                <Logo
                    style={{ cursor: "pointer" }}
                    src="/images/admin.svg"
                    onClick={() => router.replace("/")}
                />

                <span style={{ cursor: "pointer" }} onClick={logout}>
                    {data} 님
                </span>
            </HeaderWrapper>
        </Container>
    );
};

const Logo = styled.img`
    width: 160px;
`;

const HeaderWrapper = styled.div`
    width: 1200px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Container = styled.div`
    width: 100%;
    height: 100px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 99999;
    left: 0;
`;

export default Header;
