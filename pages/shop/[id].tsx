import styled from "@emotion/styled";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../../components/Header";
import React from "react";
import { keyframes } from "@emotion/react";

const Shop = () => {
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        document.title = "메인 - Yeshow Admin";
        if (localStorage.getItem("access") == null) {
            router.replace("/login");
        }
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("access")}`;
    }, []);

    const fetchShop = async () => {
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/shop/${id}`
        );
        return data;
    };

    const {
        data: shop,
        error: shopError,
        isLoading: isFetchingShop,
    } = useQuery(["shop"], fetchShop);

    useEffect(() => {
        if (shop) {
            console.log(shop);
        }
    }, [shop]);

    const [modalTitle, setModalTitle] = React.useState("");
    const [modalMessage, setModalMessage] = React.useState("");

    const [modalVisible, setModalVisible] = React.useState(false);

    const handleModalClose = () => {
        setModalVisible(false);
        setModalMessage("");
        setModalTitle("");
    };

    const makeModal = (title: string, message: string) => {
        setModalVisible(true);
        setModalTitle(title);
        setModalMessage(message);
    };

    const deleteShop = async () => {
        axios
            .delete(`${process.env.NEXT_PUBLIC_API_URL}/shop`, {
                data: {
                    shop_uuid: id,
                },
                withCredentials: true,
            })
            .then(() => {
                alert("삭제되었습니다.");
                router.replace("/");
            });
    };

    const format = (date: string) => {
        return `${date.split("-")[0]}년 ${date.split("-")[1]}월 ${
            date.split("-")[2].split("T")[0]
        }일`;
    };

    const handleDelete = () => {
        makeModal("삭제", "정말로 삭제하시겠습니까?");
    };

    const edit = () => {
        router.push(`/shop/edit/${id}`);
    };

    return (
        <PageContainer>
            <Header />
            {modalVisible && (
                <ModalBackground>
                    <Modal>
                        <ModalHeader>
                            <ModalTitle>{modalTitle}</ModalTitle>
                            <ModalCloseButton
                                onClick={handleModalClose}
                                className="material-symbols-rounded"
                            >
                                close
                            </ModalCloseButton>
                        </ModalHeader>
                        <ModalBody>{modalMessage}</ModalBody>
                        <ModalButton onClick={deleteShop}>삭제</ModalButton>
                    </Modal>
                </ModalBackground>
            )}
            {isFetchingShop ? (
                <>
                    <Top style={{ backgroundImage: "gray" }} />
                    <Container>
                        <SkeletonShopImage />
                        <Spacer size={"30px"} />
                        <SkeletonBox size={"42px"} />
                        <Spacer size={"16px"} />
                        <SkeletonBox size={"200px"} />
                        <Spacer size={"37px"} />
                        <SkeletonBox size={"80px"} />
                        <Spacer size={"18px"} />
                        <SkeletonBox size={"340px"} />
                        <Spacer size={"58px"} />
                        <SkeletonBox size={"43px"} />
                        <Spacer size={"50px"} />
                        <Spacer size={"174px"} />
                        <SkeletonBox size={"110px"} />
                        <Spacer size={"38px"} />
                        <SkeletonBox size={"91px"} />
                        <Spacer size={"11px"} />
                        <SkeletonBox size={"500px"} />
                        <Spacer size={"23px"} />
                        <SkeletonBox size={"130px"} />
                        <Spacer size={"11px"} />
                        <SkeletonBox size={"200px"} />
                        <Spacer size={"23px"} />
                        <SkeletonBox size={"140px"} />
                        <Spacer size={"11px"} />
                        <MoreInfo>
                            <SkeletonBox size={"250px"} />
                        </MoreInfo>
                        <Spacer size={"23px"} />
                        <SkeletonBox size={"120px"} />
                        <Spacer size={"11px"} />
                        <SkeletonBox size={"120px"} />
                    </Container>
                </>
            ) : (
                <>
                    <Top src={shop.shop.shop_image} />
                    <ShopAction>
                        <EditButton onClick={edit}>수정</EditButton>
                        <RemoveButton onClick={handleDelete}>삭제</RemoveButton>
                    </ShopAction>
                    <Container>
                        <ShopImage src={shop.shop.shop_image} />
                        <Spacer size={"30px"} />
                        <Category>{shop.shop.shop_category}</Category>
                        <Spacer size={"16px"} />
                        <ShopName>{shop.shop.shop_name}</ShopName>
                        <Spacer size={"37px"} />
                        <LabelOne>가게 소개</LabelOne>
                        <Spacer size={"18px"} />
                        <LabelText1>
                            {shop.shop_detail.shop_description}
                        </LabelText1>
                        <Spacer size={"58px"} />
                        <Label2>메뉴</Label2>
                        <Spacer size={"50px"} />
                        <Menus>
                            {shop.menu.map((menu: any) => (
                                <MenuCoponent
                                    key={menu.shop_menu_id}
                                    name={menu.shop_menu_name}
                                    description={menu.shop_menu_description}
                                    price={menu.shop_menu_price}
                                    menuImage={menu.shop_menu_image}
                                />
                            ))}
                        </Menus>
                        <Spacer size={"174px"} />
                        <InfoString>상세 정보</InfoString>
                        <Spacer size={"38px"} />
                        <Label4>가게 주소</Label4>
                        <Spacer size={"11px"} />
                        <MoreInfo>{shop.shop_detail.shop_address}</MoreInfo>
                        <Spacer size={"23px"} />
                        <Label4>가게 전화번호</Label4>
                        <Spacer size={"11px"} />
                        <MoreInfo>{shop.shop_detail.shop_tell}</MoreInfo>
                        <Spacer size={"23px"} />
                        <Label4>가게 영업시간</Label4>
                        <Spacer size={"11px"} />
                        <MoreInfo>
                            {shop.shop_detail.shop_business_hours}
                        </MoreInfo>
                        <Spacer size={"23px"} />
                        <Label4>가게 휴무일</Label4>
                        <Spacer size={"11px"} />
                        <MoreInfo>{shop.shop_detail.shop_closed_days}</MoreInfo>
                        <Spacer size="200px" />
                    </Container>
                </>
            )}
        </PageContainer>
    );
};

const MenuCoponent = ({ name, description, price, menuImage }: any) => {
    return (
        <MenuContainer>
            <MenuInfos>
                <MenuName>{name}</MenuName>
                <Spacer size={"10px"} />
                <MenuDescription>{description}</MenuDescription>
                <Spacer size={"18px"} />
                <MenuPrice>{price}원</MenuPrice>
            </MenuInfos>
            <MenuImage src={menuImage} />
        </MenuContainer>
    );
};

const ModalButton = styled.button`
    width: 98px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #222222;
    border-radius: 6px;
    font-weight: 500;
    font-size: 25px;
    line-height: 44px;
    color: #ffffff;
    align-self: flex-end;
    margin-top: 20px;
    cursor: pointer;
    &:hover {
        background: #101010;
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Modal = styled.div`
    width: 500px;
    padding: 32px 34px;
    background: white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: auto;
    animation: ${fadeIn} 0.3s ease-in-out;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ModalTitle = styled.div`
    font-weight: 600;
    font-size: 27px;
    line-height: 27px;
    color: #666972;
`;

const ModalCloseButton = styled.div`
    font-size: 24px;
    cursor: pointer;
    padding: 3px;
    &:hover {
        background-color: #f2f2f2;
    }
`;

const ModalBody = styled.div`
    margin-top: 32px;
    font-size: 20px;
    line-height: 27px;
    color: #666972;
`;

const MoreInfo = styled.div`
    font-weight: 500;
    font-size: 27px;
    line-height: 44px;
    color: #000000;
`;

const Label4 = styled.div`
    font-weight: 500;
    font-size: 25px;
    line-height: 44px;
    color: #38393e;
`;

const InfoString = styled.div`
    font-weight: 500;
    font-size: 30px;
    line-height: 44px;
    color: #38393e;
`;

const Label2 = styled.div`
    font-weight: 500;
    font-size: 30px;
    line-height: 44px;
    color: #000000;
`;

const Menus = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`;

const ShopAction = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    right: calc((100vw - 1200px) / 2);
    top: 372px;
    gap: 18px;
`;

const EditButton = styled.button`
    width: 107px;
    height: 58px;
    background: #e0eeff;
    border-radius: 10px;
    font-weight: 500;
    font-size: 25px;
    line-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2589ff;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        background: #cad9ec;
    }
`;

const RemoveButton = styled.button`
    width: 107px;
    height: 58px;
    background: #ffe0e0;
    border-radius: 10px;
    font-weight: 500;
    font-size: 25px;
    line-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff2525;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        background: #efcccc;
    }
`;

const LabelText1 = styled.div`
    font-weight: 600;
    font-size: 30px;
    line-height: 44px;
    color: #000000;
`;

const LabelOne = styled.div`
    font-weight: 600;
    font-size: 22px;

    color: #000000;
`;

const ShopImage = styled.img`
    width: 240px;
    height: 240px;
    object-fit: cover;
`;

const SkeletonShopImage = styled.div`
    width: 240px;
    height: 240px;
    background: #e8e9ec;
`;

const Top = styled.img`
    width: 100%;
    height: 330px;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter: brightness(0.7);
`;

const Category = styled.div`
    font-weight: 500;
    font-size: 24px;
    color: #363636;
`;

const ShopName = styled.div`
    font-weight: 600;
    font-size: 31px;
    line-height: 23px;

    color: #363636;
`;

const MenuImage = styled.img`
    width: 120px;
    height: 120px;
`;
const MenuInfos = styled.div`
    display: flex;
    flex-direction: column;
`;

const MenuName = styled.div`
    font-weight: 600;
    font-size: 25px;
    line-height: 25px;
    color: #2d2d2d;
`;

const MenuDescription = styled.div`
    font-weight: 500;
    font-size: 19px;
    line-height: 25px;
    color: #8d8d8d;
`;

const MenuPrice = styled.div`
    font-weight: 400;
    font-size: 19px;
    line-height: 25px;
    color: #2d2d2d;
`;

const MenuContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 120px;
`;

const SkeletonBox = styled.div<{ size: string }>`
    height: 22px;
    width: ${(props) => props.size};
    border-radius: 5px;
    background: #e8e9ec;
`;

const Spacer = (props: any) => {
    return <div style={{ height: `${props.size}` }} />;
};

const PageContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
`;

const Container = styled.div`
    width: 1200px;
    margin: auto;
    height: auto;
    margin-top: 137px;
`;

export default Shop;
