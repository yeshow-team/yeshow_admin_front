import React, { useEffect } from "react";
import styled from "@emotion/styled";
import InputButton from "../components/InputButton";
import InputText from "../components/InputText";
import InputFile from "../components/InputFile";
import { keyframes } from "@emotion/react";
import MenuItem from "../components/MenuItem";

const AddShop = () => {
  const [step, setStep] = React.useState(1);
  const [shopName, setShopName] = React.useState("");
  const [shopNameError, setShopNameError] = React.useState(false);
  const [shopNameErrorMessage, setShopNameErrorMessage] = React.useState("");
  const [shopCategory, setShopCategory] = React.useState("");
  const [shopCategoryError, setShopCategoryError] = React.useState(false);
  const [shopCategoryErrorMessage, setShopCategoryErrorMessage] =
    React.useState("");
  const [shopAddress, setShopAddress] = React.useState("");
  const [shopAddressError, setShopAddressError] = React.useState(false);
  const [shopAddressErrorMessage, setShopAddressErrorMessage] =
    React.useState("");
  const [shopPhone, setShopPhone] = React.useState("");

  const [shopPhoneError, setShopPhoneError] = React.useState(false);
  const [shopPhoneErrorMessage, setShopPhoneErrorMessage] = React.useState("");
  const [shopImage, setShopImage] = React.useState("");
  const [shopImageError, setShopImageError] = React.useState(false);
  const [shopImageErrorMessage, setShopImageErrorMessage] = React.useState("");
  const [shopImageFile, setShopImageFile] = React.useState("");
  const [shopImageFileError, setShopImageFileError] = React.useState(false);

  const [shopImageFileErrorMessage, setShopImageFileErrorMessage] =
    React.useState("");
  const [shopImageFilePreview, setShopImageFilePreview] = React.useState("");
  const [shopImageFilePreviewError, setShopImageFilePreviewError] =
    React.useState(false);
  const [
    shopImageFilePreviewErrorMessage,
    setShopImageFilePreviewErrorMessage,
  ] = React.useState("");
  const [shopImageFilePreviewFile, setShopImageFilePreviewFile] =
    React.useState("");
  const [shopImageFilePreviewFileError, setShopImageFilePreviewFileError] =
    React.useState(false);

  const [
    shopImageFilePreviewFileErrorMessage,
    setShopImageFilePreviewFileErrorMessage,
  ] = React.useState("");
  const [shopImageFilePreviewFilePreview, setShopImageFilePreviewFilePreview] =
    React.useState("");
  const [
    shopImageFilePreviewFilePreviewError,
    setShopImageFilePreviewFilePreviewError,
  ] = React.useState(false);
  const [
    shopImageFilePreviewFilePreviewErrorMessage,
    setShopImageFilePreviewFilePreviewErrorMessage,
  ] = React.useState("");
  const [
    shopImageFilePreviewFilePreviewFile,
    setShopImageFilePreviewFilePreviewFile,
  ] = React.useState("");
  const [
    shopImageFilePreviewFilePreviewFileError,
    setShopImageFilePreviewFilePreviewFileError,
  ] = React.useState(false);

  const [menus, setMenus] = React.useState([
    {
      name: "메뉴 이름",
      description: "메뉴 설명",
      price: 10000,
      file: null,
    },
  ]);

  const stepMessage = [
    "간단한 가게 정보,사업자 정보를 입력해주세요",
    "가게 커버 이미지를 등록해주세요",
    "가게 메뉴를 등록해주세요",
  ];
  return (
    <PageContainer>
      <Container>
        <StepTitle>가게 추가 ({step}/3)</StepTitle>
        <Spacer size={"20px"} />
        <StepDescription>{stepMessage[step - 1]}</StepDescription>
        <Spacer size={"67px"} />
        {step === 1 ? (
          <Form>
            <InputText
              placeholder={"가게 이름 (2~10자)"}
              label={"가게 이름"}
              required={true}
              regexString={/^[가-힣a-zA-Z0-9]{2,10}$/}
              value={shopName}
              setValue={setShopName}
              error={shopNameError}
              setError={setShopNameError}
              errorMessage={shopNameErrorMessage}
              setErrorMessage={setShopNameErrorMessage}
            />
            <Spacer size={"40px"} />
            <InputButton
              label={"카테고리"}
              placeholder={"카테고리 선택..."}
              options={[
                "한식",
                "중식",
                "양식",
                "일식",
                "치킨",
                "피자",
                "카페",
                "분식",
              ]}
              required
            />
            <Spacer size={"40px"} />
            <InputFile
              label={"사업자등록증"}
              placeholder={"사업자등록증 스캔 업로드(PDF,사진)"}
              required
            />
            <Spacer size={"40px"} />
            <InputFile
              label={"영업신고증"}
              placeholder={"영업신고증 스캔 업로드(PDF,사진)"}
              required
            />
          </Form>
        ) : step === 2 ? (
          <Form2>
            <InputText placeholder={"가게 주소"} label={"가게 주소"} required />
            <Spacer size={"40px"} />
            <InputText
              placeholder={"가게 전화번호"}
              label={"가게 전화번호"}
              required
            />
            <Spacer size={"40px"} />
            <InputText
              placeholder={"가게 영업시간"}
              label={"가게 영업시간"}
              required
            />
            <Spacer size={"40px"} />
            <InputText
              placeholder={"가게 휴무일"}
              label={"가게 휴무일"}
              required
            />
            <Spacer size={"40px"} />
            <InputText placeholder={"가게 소개"} label={"가게 소개"} required />
          </Form2>
        ) : (
          step === 3 && (
            <Form3>
              {menus.map((menu, index) => {
                return (
                  <MenuItem
                    key={index}
                    menu={menu}
                    setMenus={setMenus}
                    menus={menus}
                    id={index}
                  />
                );
              })}
              <MenuAddButton
                onClick={() =>
                  setMenus([
                    ...menus,
                    {
                      name: "메뉴 이름",
                      description: "메뉴 설명",
                      price: 10000,
                      file: null,
                    },
                  ])
                }
              >
                메뉴 추가
              </MenuAddButton>
            </Form3>
          )
        )}
        <Spacer size={"40px"} />
        <FullRow>
          {step > 1 && (
            <>
              <PreviousButton
                onClick={() => {
                  setStep(step - 1);
                }}
              >
                이전
              </PreviousButton>
              <RowSpacer size={"12px"} />
            </>
          )}
          <SubmitButton
            onClick={() => {
              step === 3 ? alert("가게 추가 완료!") : setStep(step + 1);
            }}
          >
            {step === 3 ? "입점 신청" : "다음"}
          </SubmitButton>
        </FullRow>
      </Container>
    </PageContainer>
  );
};

const MenuAddButton = styled.button`
  width: 100%;
  height: 60px;
  font-weight: 500;
  font-size: 19px;
  line-height: 25px;
  display: flex;
  align-items: center;
  letter-spacing: -0.41px;
  background: #f2f6ff;
  border-radius: 8px;
  color: #5987ff;
  border: none;
  cursor: pointer;
  justify-content: center;
  &:hover {
    background: #e5efff;
  }
`;

const slideIn = keyframes`
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  animation: ${slideIn} 2s;
`;
const Form2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  animation: ${slideIn} 2s;
`;
const Form3 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  animation: ${slideIn} 1s;
`;

const FullRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const RowSpacer = (props: any) => {
  return <div style={{ width: `${props.size}` }} />;
};

const SubmitButton = styled.button`
  border: none;
  padding: 0 30px;
  height: 50px;
  background: #5987ff;
  border-radius: 5px;
  font-weight: 500;
  font-size: 17px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: #3c67d4;
    transition: all 0.3s ease-in-out;
  }
`;

const PreviousButton = styled.button`
  border: none;
  padding: 0 30px;
  height: 50px;
  background: #f2f6ff;
  color: #5987ff;
  border-radius: 5px;
  font-weight: 500;
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: #e8edf9;
    transition: all 0.2s ease-in-out;
  }
`;

const PageContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 417px;
  margin: auto;
  height: auto;
`;

const StepTitle = styled.div`
  font-weight: 600;
  font-size: 27px;
  line-height: 27px;
  color: var(--textPrimary);
  animation: ${slideIn} 1s;
`;

const StepDescription = styled.div`
  font-weight: 400;
  font-size: 22px;
  line-height: 22px;
  color: var(--textSecondary);
  animation: ${slideIn} 1s;
`;

const Spacer = (props: any) => {
  return <div style={{ height: `${props.size}` }} />;
};

const Input = styled.input`
  width: 100%;
  height: 54px;
  font-size: 17px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  padding-left: 17px;
  &:focus {
    outline: none;
    border: 2px solid #5987ff;
    transition: all 0.2s ease-in-out;
  }
  &::placeholder {
    color: #bdbdc2;
  }
`;

const InputLabel = styled.div`
  font-weight: 500;
  font-size: 19px;
  line-height: 21px;
  color: var(--textPrimary);
  margin-left: 4px;
`;

export default AddShop;
