import Head from "next/head";
import Image from "next/image";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import { Shop } from "../types/shop";

const Home = () => {
    const router = useRouter();

    const reviews = [
        {
            shop_review_title: "인생맛집.. 찾았다!!",
            shop_review_detail: "너무 맛있어서 다음에 또 올게요 !",
            shop_review_rating: 4,

            shop_review_created_date: "2021-08-31T09:00:00.000Z",
            shop_review_updated_date: "2021-08-31T09:00:00.000Z",
            shop_review_deleted_at: "2021-08-31T09:00:00.000Z",
            user_id: "B1ueRabbit",
        },
        {
            shop_review_title: "인생맛집.. 찾았다!!",
            shop_review_detail: "너무 맛있어서 다음에 또 올게요 !",
            shop_review_rating: 4,

            shop_review_created_date: "2021-08-31T09:00:00.000Z",
            shop_review_updated_date: "2021-08-31T09:00:00.000Z",
            shop_review_deleted_at: "2021-08-31T09:00:00.000Z",
            user_id: "B1ueRabbit",
        },
        {
            shop_review_title: "인생맛집.. 찾았다!!",
            shop_review_detail: "너무 맛있어서 다음에 또 올게요 !",
            shop_review_rating: 4,

            shop_review_created_date: "2021-08-31T09:00:00.000Z",
            shop_review_updated_date: "2021-08-31T09:00:00.000Z",
            shop_review_deleted_at: "2021-08-31T09:00:00.000Z",
            user_id: "B1ueRabbit",
        },
        {
            shop_review_title: "인생맛집.. 찾았다!!",
            shop_review_detail: "너무 맛있어서 다음에 또 올게요 !",
            shop_review_rating: 4,

            shop_review_created_date: "2021-08-31T09:00:00.000Z",
            shop_review_updated_date: "2021-08-31T09:00:00.000Z",
            shop_review_deleted_at: "2021-08-31T09:00:00.000Z",
            user_id: "B1ueRabbit",
        },
    ];

    useEffect(() => {
        document.title = "메인 - Yeshow Admin";
        if (localStorage.getItem("access") == null) {
            router.replace("/login");
        }
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("access")}`;
    }, []);

    const fetchMyShop = async () => {
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/shop/myshop`
        );
        return data;
    };

    const {
        data: myShop,
        error: myShopError,
        isLoading: isFetchingMyShop,
    } = useQuery(["myshop"], fetchMyShop);

    useEffect(() => {
        if (myShop) {
            console.log(myShop);
        }
    }, [myShop]);

    const format = (date: string) => {
        return `${date.split("-")[0]}년 ${date.split("-")[1]}월 ${
            date.split("-")[2].split("T")[0]
        }일`;
    };

    return (
        <PageContainer>
            <Header />
            <Container>
                <SpaceBetween>
                    <Section size={"690px"}>
                        <SectionTitle>내 가게 목록</SectionTitle>
                        <Spacer size={"22px"} />
                        <SectionDescription>
                            현재 yeshow에서 운영중인 가게 목록을 보여줍니다.
                        </SectionDescription>
                        <Spacer size={"40px"} />
                        {isFetchingMyShop ? (
                            <SkeletonCard>
                                <RestaurantContent>
                                    <SkeletonInfoContainer>
                                        <SkeletonLabel>
                                            <SkeletonBox size="65px;" />
                                            <Spacer size={"9px"} />
                                            <SkeletonBox size="65px;" />
                                        </SkeletonLabel>
                                        <Spacer size={"22px"} />
                                        <LabelGroup>
                                            <Label>
                                                <SkeletonBox size="65px;" />
                                                <Spacer size={"9px"} />

                                                <SkeletonBox size="133px;" />
                                            </Label>
                                            <RowSpacer size={"34px"} />
                                            <Label>
                                                <SkeletonBox size="80px;" />
                                                <Spacer size={"9px"} />

                                                <SkeletonBox size="140px;" />
                                            </Label>
                                        </LabelGroup>
                                        <Spacer size={"22px"} />
                                        <LabelGroup>
                                            <Label>
                                                <SkeletonBox size="80px;" />
                                                <Spacer size={"9px"} />
                                                <SkeletonBox size="80px;" />
                                            </Label>
                                            <RowSpacer size={"34px"} />
                                            <Label>
                                                <SkeletonBox size="33px;" />
                                                <Spacer size={"9px"} />
                                                <SkeletonBox size="81px;" />
                                            </Label>
                                        </LabelGroup>
                                    </SkeletonInfoContainer>
                                    <SkeletonBox size="175px;" />
                                </RestaurantContent>
                                <SkeletonImage />
                            </SkeletonCard>
                        ) : (
                            <ShopList>
                                {myShop.map((shop: Shop, index: number) => (
                                    <RestaurantCard
                                        key={index}
                                        onClick={() =>
                                            router.push({
                                                pathname: "/shop/[id]",
                                                query: { id: shop.shop_uuid },
                                            })
                                        }
                                    >
                                        <RestaurantContent>
                                            <RestaurantInfoContainer>
                                                <Label>
                                                    <LabelTitle>
                                                        카테고리
                                                    </LabelTitle>
                                                    <Spacer size={"9px"} />
                                                    <LabelText>
                                                        {shop.shop_category}
                                                    </LabelText>
                                                </Label>
                                                <Spacer size={"22px"} />
                                                <LabelGroup>
                                                    <Label>
                                                        <LabelTitle>
                                                            상호명
                                                        </LabelTitle>
                                                        <Spacer size={"9px"} />

                                                        <LabelText>
                                                            {shop.shop_name}
                                                        </LabelText>
                                                    </Label>
                                                    <RowSpacer size={"34px"} />
                                                    <Label>
                                                        <LabelTitle>
                                                            가게등록일
                                                        </LabelTitle>
                                                        <Spacer size={"9px"} />

                                                        <LabelText>
                                                            {format(
                                                                shop.shop_created_date
                                                            )}
                                                        </LabelText>
                                                    </Label>
                                                </LabelGroup>
                                                <Spacer size={"22px"} />
                                                <LabelGroup>
                                                    <Label>
                                                        <LabelTitle>
                                                            사업자정보
                                                        </LabelTitle>
                                                        <Spacer size={"9px"} />
                                                        <TextButton
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                var imageWin =
                                                                    window.open(
                                                                        "",
                                                                        "",
                                                                        "width=600px, height=600px"
                                                                    );
                                                                imageWin?.document.write(
                                                                    "<html><body style='margin:0'>"
                                                                );
                                                                imageWin?.document.write(
                                                                    `<img src="${shop.business_registration_image}" border=0>`
                                                                );
                                                                imageWin?.document.write(
                                                                    "</body><html>"
                                                                );
                                                            }}
                                                        >
                                                            사업자정보
                                                        </TextButton>
                                                    </Label>
                                                    <RowSpacer size={"34px"} />
                                                    <Label>
                                                        <LabelTitle>
                                                            상태
                                                        </LabelTitle>
                                                        <Spacer size={"9px"} />
                                                        <TextButton>
                                                            정상영업중
                                                        </TextButton>
                                                    </Label>
                                                </LabelGroup>
                                            </RestaurantInfoContainer>
                                            <Grade>
                                                {shop.shop_rating}/5.0점 (리뷰
                                                32개)
                                            </Grade>
                                        </RestaurantContent>
                                        <RestaurantImage
                                            src={shop.shop_image}
                                        />
                                    </RestaurantCard>
                                ))}
                            </ShopList>
                        )}
                        <AddButton
                            onClick={() => {
                                router.push("/addshop");
                            }}
                        >
                            가게 추가
                        </AddButton>
                    </Section>
                    <Section size={"477px"}>
                        <SectionTitle>최근 가게 리뷰</SectionTitle>
                        <Spacer size={"22px"} />
                        <SectionDescription>
                            운영중인 가게의 최근 리뷰를 보여줍니다.
                        </SectionDescription>
                        <Spacer size={"40px"} />
                        <ReviewCard>
                            {reviews.map((review: any, index: number) => (
                                <ReviewComponent
                                    key={index}
                                    title={review.shop_review_title}
                                    content={review.shop_review_detail}
                                    user={review.user_id}
                                    rating={review.shop_review_rating}
                                    date={review.shop_review_updated_date}
                                />
                            ))}
                        </ReviewCard>
                    </Section>
                </SpaceBetween>
                <Spacer size="65px" />
                <SectionTitle>예약 현황</SectionTitle>
                <Spacer size={"22px"} />
                <SectionDescription>
                    운영중인 가게의 최근 예약 현황을 보여줍니다.
                </SectionDescription>
                <Spacer size={"40px"} />
                <ReservationCard></ReservationCard>
            </Container>
        </PageContainer>
    );
};
const timeForToday = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
        (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금 전";
    if (betweenTime < 60) {
        return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
};

const ReviewComponent = ({ title, content, user, rating, date }: any) => {
    return (
        <ReviewContainer>
            <SpaceBetween>
                <UserContainer>
                    <UserImage src={"https://picsum.photos/200"} />
                    <Username>
                        {user.substr(0, 3) + "*".repeat(user.length - 3)}님의
                        리뷰
                    </Username>
                </UserContainer>
                <ReviewDate>{timeForToday(date)}</ReviewDate>
            </SpaceBetween>
            <Spacer size={"10px"} />
            <RatingContainer>
                {Array.from({ length: rating }, (v, i) => (
                    <StarFill key={i} className="material-symbols-rounded">
                        grade
                    </StarFill>
                ))}
                {Array.from({ length: 5 - rating }, (v, i) => (
                    <Star key={i} className="material-symbols-rounded">
                        grade
                    </Star>
                ))}
                <RatingText>{rating}.0/5.0점</RatingText>
            </RatingContainer>
            <Spacer size={"23px"} />
            <ReviewTitle>{title}</ReviewTitle>
            <Spacer size={"11px"} />
            <ReviewContent>{content}</ReviewContent>
        </ReviewContainer>
    );
};

const StarFill = styled.div`
    font-size: 23px;
    color: #5992ff;
    width: 24px;
    height: 24px;
    margin-right: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-variation-settings: "FILL" 1;
`;

const RatingContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Star = styled.div`
    font-size: 23px;
    color: #e9e9eb;
    width: 24px;
    height: 24px;
    margin-right: 3px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-variation-settings: "FILL" 1;
`;

const ReviewTitle = styled.div`
    font-weight: 600;
    font-size: 22px;
    line-height: 26px;

    color: #46484e;
`;

const ReviewContent = styled.div`
    font-size: 19px;
    line-height: 28px;
    /* or 147% */

    display: flex;
    align-items: center;
    letter-spacing: -0.41px;

    color: #898c94;
`;

const RatingText = styled.div`
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    margin-left: 15px;
    color: #5992ff;
`;

const UserImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
`;

const ReviewDate = styled.div`
    font-weight: 500;
    font-size: 17px;
    line-height: 25px;
    /* identical to box height, or 147% */

    display: flex;
    align-items: center;
    letter-spacing: -0.41px;

    color: #7c808b;
`;

const Username = styled.div`
    font-weight: 500;
    font-size: 19px;
    line-height: 25px;
    color: #363940;
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 13px;
`;

const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const SkeletonCard = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 311px;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    box-shadow: 0px 0px 4px #edf0f5;
    border-radius: 5px;
    margin-bottom: 20px;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 100%;
        background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
        animation: loading 2s infinite linear;
    }
`;

const SkeletonBox = styled.div<{ size: string }>`
    height: 22px;
    width: ${(props) => props.size};
    border-radius: 5px;
    background: #e8e9ec;
`;

const ShopList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 311px;
    overflow-y: scroll;
    margin-bottom: 20px;
    gap: 20px;
`;

const LabelGroup = styled.div`
    display: flex;
    flex-direction: row;
`;

const RowSpacer = (props: any) => {
    return <div style={{ width: `${props.size}` }} />;
};
const AddButton = styled.button`
    background: #5992ff;
    border-radius: 7px;
    border: none;
    width: 100%;
    height: 74px;
    font-weight: 500;
    font-size: 25px;
    line-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    cursor: pointer;
    &:hover {
        background: #3c67d4;
        transition: all 0.3s ease-in-out;
    }
`;

const TextButton = styled.button`
    background: none;
    border: none;
    font-weight: 500;
    font-size: 19px;
    color: #5992ff;
    padding: 0;
    text-align: left;
`;

const Grade = styled.div`
    font-weight: 500;
    font-size: 17px;
    line-height: 16px;
    display: flex;
    align-items: flex-end;
    letter-spacing: -0.41px;

    color: #3dab55;
`;

const SkeletonLabel = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 140px;
`;

const RestaurantContent = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 26px 0 26px 26px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
`;

const RestaurantInfoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const SkeletonInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const RestaurantImage = styled.img`
    width: 311px;
    height: 311px;
    object-fit: cover;
    border-radius: 0 5px 5px 0;
`;

const SkeletonImage = styled.div`
    width: 311px;
    height: 311px;
    background: #e8e9ec;
    object-fit: cover;
    border-radius: 0 5px 5px 0;
`;

const LabelTitle = styled.div`
    font-weight: 600;
    font-size: 19px;
    color: #393b4a;
`;

const LabelText = styled.div`
    font-size: 19px;
    color: #96a3ab;
`;

const RestaurantCard = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 311px;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    box-shadow: 0px 0px 4px #edf0f5;
    border-radius: 5px;
`;

const ReviewCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 407px;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    box-shadow: 0px 0px 4px #edf0f5;
    border-radius: 5px;
    padding: 26px;
    overflow-y: scroll;
    gap: 40px;
`;

const ReservationCard = styled.div`
    width: 100%;
    height: 438px;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    box-shadow: 0px 0px 4px #edf0f5;
    border-radius: 5px;
`;

export default Home;

const Section = styled.div<{ size: string }>`
    width: ${(props) => props.size};
    flex-direction: column;
`;

const Spacer = (props: any) => {
    return <div style={{ height: `${props.size}` }} />;
};

const SpaceBetween = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SectionTitle = styled.div`
    font-weight: 600;
    font-size: 27px;
    line-height: 27px;
    color: var(--textPrimary);
`;

const SectionDescription = styled.div`
    font-weight: 400;
    font-size: 22px;
    line-height: 22px;
    color: var(--textSecondary);
`;

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
    margin-top: 187px;
`;
