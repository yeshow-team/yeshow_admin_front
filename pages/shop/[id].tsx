import styled from "@emotion/styled";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../../components/Header";

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

    const format = (date: string) => {
        return `${date.split("-")[0]}년 ${date.split("-")[1]}월 ${
            date.split("-")[2].split("T")[0]
        }일`;
    };

    return (
        <PageContainer>
            <Header />
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

const MoreInfo = styled.div`
    font-weight: 500;
    font-size: 30px;
    line-height: 44px;
    color: #000000;
`;

const Label4 = styled.div`
    font-weight: 500;
    font-size: 25px;
    line-height: 44px;
    /* identical to box height, or 176% */

    display: flex;
    align-items: center;
    letter-spacing: -0.41px;

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
