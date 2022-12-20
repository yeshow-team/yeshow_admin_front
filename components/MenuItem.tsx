import styled from "@emotion/styled";
import { ChangeEvent } from "react";

const MenuItem = ({ ...props }) => {
    const setFile = (file: any) => {
        props.setMenus(
            props.menus.map((menu: any, index: number) => {
                if (index === props.id) {
                    menu.shop_menu_image = URL.createObjectURL(file);
                    menu.shop_menu_image_file = file;
                }
                return menu;
            })
        );
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (!e.target.files) return;
                    setFile(e.target.files[0]);
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
