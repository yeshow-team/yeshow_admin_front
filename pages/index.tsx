import Head from "next/head";
import Image from "next/image";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Home = () => {
    const router = useRouter();
    return (
        <PageContainer>
            <Container>
                <SpaceBetween>
                    <Section size={"690px"}>
                        <SectionTitle>내 가게 목록</SectionTitle>
                        <Spacer size={"22px"} />
                        <SectionDescription>
                            현재 yeshow에서 운영중인 가게 목록을 보여줍니다.
                        </SectionDescription>
                        <Spacer size={"40px"} />
                        <RestaurantCard>
                            <RestaurantContent>
                                <RestaurantInfoContainer>
                                    <Label>
                                        <LabelTitle>카테고리</LabelTitle>
                                        <Spacer size={"9px"} />
                                        <LabelText>한식</LabelText>
                                    </Label>
                                    <Spacer size={"22px"} />
                                    <LabelGroup>
                                        <Label>
                                            <LabelTitle>상호명</LabelTitle>
                                            <Spacer size={"9px"} />

                                            <LabelText>
                                                이자와 숙대입구점
                                            </LabelText>
                                        </Label>
                                        <RowSpacer size={"34px"} />
                                        <Label>
                                            <LabelTitle>가게등록일</LabelTitle>
                                            <Spacer size={"9px"} />

                                            <LabelText>
                                                2022년 12월 01일
                                            </LabelText>
                                        </Label>
                                    </LabelGroup>
                                    <Spacer size={"22px"} />
                                    <LabelGroup>
                                        <Label>
                                            <LabelTitle>사업자정보</LabelTitle>
                                            <Spacer size={"9px"} />
                                            <TextButton>사업자정보</TextButton>
                                        </Label>
                                        <RowSpacer size={"34px"} />
                                        <Label>
                                            <LabelTitle>상태</LabelTitle>
                                            <Spacer size={"9px"} />
                                            <TextButton>정상영업중</TextButton>
                                        </Label>
                                    </LabelGroup>
                                </RestaurantInfoContainer>
                                <Grade>4.8/5.0점 (리뷰 32개)</Grade>
                            </RestaurantContent>
                            <RestaurantImage src="https://t1.daumcdn.net/cfile/tistory/9974103359D8C5481B" />
                        </RestaurantCard>
                        <Spacer size={"22px"} />
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
                        <ReviewCard></ReviewCard>
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

const RestaurantImage = styled.img`
    width: 311px;
    height: 311px;
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
    width: 100%;
    height: 407px;
    background: #ffffff;
    border: 1px solid #e6e6e6;
    box-shadow: 0px 0px 4px #edf0f5;
    border-radius: 5px;
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

const Section = styled.div`
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
