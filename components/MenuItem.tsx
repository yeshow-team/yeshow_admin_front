import styled from "@emotion/styled";
import { ChangeEvent, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const MenuItem = ({ ...props }) => {
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (localStorage.getItem("access") == null) {
            router.replace("/login");
        }
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("access")}`;
    }, []);
    const resize_image = (image: any) => {
        let canvas = document.createElement("canvas"),
            max_size = 1280,
            width = image.width,
            height = image.height;

        if (width > height) {
            if (width > max_size) {
                height *= max_size / width;
                width = max_size;
            }
        } else {
            if (height > max_size) {
                width *= max_size / height;
                height = max_size;
            }
        }
        canvas.width = width;
        canvas.height = height;
        canvas?.getContext("2d")?.drawImage(image, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        return dataUrl;
    };
    const setFile = (file: any) => {
        props.setMenus(
            props.menus.map((menu: any, index: number) => {
                if (index === props.id) {
                    menu.shop_menu_image = file;
                    menu.shop_menu_image_file = file;
                }
                return menu;
            })
        );
    };

    const deleteMenu = (id: string) => {
        axios.delete(`/shop/menu`, {
            data: {
                menu_id: id,
            },
        });
    };

    const setName = (name: string) => {
        const temp = props.menus.map((menu: any, index: number) => {
            if (index === props.id) {
                menu.shop_menu_name = name;
            }
            return menu;
        });
        props.setMenus(temp);
    };
    const setPrice = (price: number) => {
        const temp = props.menus.map((menu: any, index: number) => {
            if (index === props.id) {
                menu.shop_menu_price = price;
            }
            return menu;
        });
        props.setMenus(temp);
    };

    const setDescription = (description: string) => {
        const temp = props.menus.map((menu: any, index: number) => {
            if (index === props.id) {
                menu.shop_menu_description = description;
            }
            return menu;
        });
        props.setMenus(temp);
    };

    const handleRemove = () => {
        if (props.menus.length === 1) {
            alert("메뉴는 최소 1개 이상이어야 합니다.");
            return;
        }
        if (props.menu.menu_id) {
            deleteMenu(props.menu.menu_id);
        }
        props.setMenus(
            props.menus.filter((menu: any, index: number) => index !== props.id)
        );
    };

    return (
        <Container>
            <label htmlFor={props.id}>
                <MenuImage
                    src={
                        props.menu.shop_menu_image
                            ? props.menu.shop_menu_image
                            : "/images/upload_image.png"
                    }
                />
            </label>
            <Input
                type="file"
                id={props.id}
                accept="image/jpg, image/png, image/jpeg"
                onChange={(base64: ChangeEvent<HTMLInputElement>) => {
                    if (!base64.target.files) return;
                    const file = base64.target.files[0];

                    const reader = new FileReader();
                    reader.onload = (base64img) => {
                        const image = new Image();
                        if (base64img.target) {
                            if (base64img.target.result) {
                                if (
                                    typeof base64img.target?.result === "string"
                                )
                                    image.src = base64img.target.result;
                            }
                        }
                        image.onload = (e) => {
                            if (e.target) {
                                const dataUrl = resize_image(e.target);
                                setFile(dataUrl);
                            }
                        };
                    };
                    reader.readAsDataURL(file);
                }}
            />
            <InfoContainer>
                <InfoLabel>메뉴 이름</InfoLabel>
                <InfoInput
                    placeholder={"메뉴 이름"}
                    value={props.menu.shop_menu_name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InfoLabel>메뉴 설명</InfoLabel>
                <InfoInput
                    type={"text"}
                    placeholder={"메뉴 설명"}
                    value={props.menu.shop_menu_description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <InfoLabel>메뉴 가격</InfoLabel>
                <InfoInput
                    placeholder={"메뉴 가격"}
                    value={props.menu.shop_menu_price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
            </InfoContainer>
            <RemoveButton
                onClick={handleRemove}
                className="material-symbols-rounded"
            >
                close
            </RemoveButton>
        </Container>
    );
};

const RemoveButton = styled.div`
    width: 40px;
    height: 40px;
    margin-top: 20px;
    color: #797a81;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
        color: #000000;
    }
`;

const InfoLabel = styled.div`
    font-weight: 500;
    font-size: 17px;
    color: #5992ff;
    margin-top: 24px;
`;

const InfoInput = styled.input`
    border: none;
    outline: none;
    font-weight: 500;
    font-size: 17px;
    line-height: 17px;
    color: #000000;
    margin-top: 10px;
    padding: 0;
    width: auto;
    background: none;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    width: 110px;
    height: 100%;
`;

const Input = styled.input`
    display: none;
`;

const MenuImage = styled.img`
    width: 243px;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 8px 0 0 8px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
        filter: brightness(0.9);
    }
`;

const Container = styled.div`
    width: 417px;
    height: 243px;
    display: flex;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
`;

export default MenuItem;
