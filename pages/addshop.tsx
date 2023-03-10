import React, { useEffect } from "react";
import styled from "@emotion/styled";
import InputButton from "../components/InputButton";
import InputText from "../components/InputText";
import InputFile from "../components/InputFile";
import { keyframes } from "@emotion/react";
import MenuItem from "../components/MenuItem";
import axios from "axios";
import { useRouter } from "next/router";

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
    const [shopPhoneErrorMessage, setShopPhoneErrorMessage] =
        React.useState("");
    const [shopImage, setShopImage] = React.useState(null);
    const [shopImageFileError, setShopImageFileError] = React.useState(false);
    const [shopImageName, setShopImageName] = React.useState("");
    const [businessHours, setBusinessHours] = React.useState("");
    const [businessHoursError, setBusinessHoursError] = React.useState(false);
    const [businessHoursErrorMessage, setBusinessHoursErrorMessage] =
        React.useState("");

    const [closedDays, setClosedDays] = React.useState("");
    const [closedDaysError, setClosedDaysError] = React.useState(false);
    const [closedDaysErrorMessage, setClosedDaysErrorMessage] =
        React.useState("");
    const [shopDescription, setShopDescription] = React.useState("");
    const [shopDescriptionError, setShopDescriptionError] =
        React.useState(false);
    const [shopDescriptionErrorMessage, setShopDescriptionErrorMessage] =
        React.useState("");

    const [modalTitle, setModalTitle] = React.useState("");
    const [modalMessage, setModalMessage] = React.useState("");

    const [modalVisible, setModalVisible] = React.useState(false);
    const [businessRegistrationImage, setBusinessRegistrationImage] =
        React.useState(null);
    const [
        businessRegistrationCertificateImage,
        setBusinessRegistrationCertificateImage,
    ] = React.useState(null);

    const [businessRegistrationImageName, setBusinessRegistrationImageName] =
        React.useState(null);
    const [
        businessRegistrationCertificateImageName,
        setBusinessRegistrationCertificateImageName,
    ] = React.useState(null);

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

    useEffect(() => {
        document.title = "?????? ?????? - Yeshow Admin";
        if (localStorage.getItem("access") == null) {
            router.replace("/login");
        }
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${localStorage.getItem("access")}`;
    }, []);

    const router = useRouter();

    const [menus, setMenus] = React.useState([
        {
            shop_menu_name: "?????? ??????",
            shop_menu_description: "?????? ??????",
            shop_menu_price: 10000,
            shop_menu_image: null,
            shop_menu_image_file: null,
        },
    ]);

    const handleClick = () => {
        if (step === 1) {
            if (
                shopNameError ||
                shopCategoryError ||
                shopName === "" ||
                shopCategory === "" ||
                shopImage === null ||
                businessRegistrationImage === null ||
                businessRegistrationCertificateImage === null
            ) {
                makeModal("??????", "?????? ????????? ??????????????????.");
            } else {
                setStep(2);
            }
        }
        if (step === 2) {
            if (
                shopAddressError ||
                shopPhoneError ||
                shopDescriptionError ||
                shopAddress === "" ||
                shopPhone === "" ||
                shopDescription === "" ||
                closedDaysError ||
                businessHoursError ||
                closedDays === "" ||
                businessHours === ""
            ) {
                makeModal("??????", "?????? ????????? ??????????????????.");
            } else {
                setStep(3);
            }
        }
        if (step === 3) {
            menus.forEach((menu) => {
                if (
                    menu.shop_menu_name === "" ||
                    menu.shop_menu_description === "" ||
                    menu.shop_menu_price === 0 ||
                    menu.shop_menu_image === null
                ) {
                    makeModal("??????", "????????? ?????? ??????????????????.");
                } else {
                    axios
                        .post(
                            `${process.env.NEXT_PUBLIC_API_URL}/shop`,
                            {
                                shop: {
                                    shop_name: shopName,
                                    shop_category: shopCategory,
                                    shop_image: shopImage,
                                    business_registration_image:
                                        businessRegistrationImage,
                                    business_registration_certificate_image:
                                        businessRegistrationCertificateImage,
                                },

                                shop_detail: {
                                    shop_address: shopAddress,
                                    shop_tell: shopPhone,
                                    shop_business_hours: businessHours,
                                    shop_closed_days: closedDays,
                                    shop_description: shopDescription,
                                },
                                menus: menus,
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem(
                                        "access"
                                    )}`,
                                },
                            }
                        )
                        .then((res) => {
                            makeModal("??????", "?????? ????????? ?????????????????????.");
                            router.push("/");
                        });
                }
            });
        }
    };

    const stepMessage = [
        "????????? ?????? ??????,????????? ????????? ??????????????????",
        "?????? ?????? ???????????? ??????????????????",
        "?????? ????????? ??????????????????",
    ];
    return (
        <PageContainer>
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
                    </Modal>
                </ModalBackground>
            )}
            <Container>
                <BackButton onClick={() => router.push("/")}>
                    <IcoButton className="material-symbols-rounded">
                        arrow_back_ios
                    </IcoButton>
                    ????????????
                </BackButton>
                <StepTitle>?????? ?????? ({step}/3)</StepTitle>
                <Spacer size={"20px"} />
                <StepDescription>{stepMessage[step - 1]}</StepDescription>
                <Spacer size={"67px"} />
                {step === 1 ? (
                    <Form>
                        <InputText
                            placeholder={"?????? ?????? (2~14???)"}
                            label={"?????? ??????"}
                            required={true}
                            regexString={
                                /^[???-???a-zA-Z0-9\s`~!@#$%^&*|\\\'\";:\/?]{2,14}$/
                            }
                            value={shopName}
                            setValue={setShopName}
                            error={shopNameError}
                            setError={setShopNameError}
                            errorMessage={shopNameErrorMessage}
                            setErrorMessage={setShopNameErrorMessage}
                        />
                        <Spacer size={"40px"} />
                        <InputButton
                            label={"????????????"}
                            placeholder={"???????????? ??????..."}
                            options={[
                                "??????",
                                "??????",
                                "??????",
                                "??????",
                                "??????",
                                "??????",
                                "??????",
                                "??????",
                            ]}
                            required
                            value={shopCategory}
                            setValue={setShopCategory}
                            error={shopCategoryError}
                            setError={setShopCategoryError}
                            errorMessage={shopCategoryErrorMessage}
                            setErrorMessage={setShopCategoryErrorMessage}
                        />
                        <Spacer size={"40px"} />
                        <InputFile
                            label={"??????????????????"}
                            placeholder={"?????????????????? ?????? ?????????(PDF,??????)"}
                            required
                            value={businessRegistrationImage}
                            setFile={setBusinessRegistrationImage}
                            fileName={businessRegistrationImageName}
                            setFileName={setBusinessRegistrationImageName}
                            id={"businessRegistrationImage"}
                        />
                        <Spacer size={"40px"} />
                        <InputFile
                            label={"???????????????"}
                            placeholder={"??????????????? ?????? ?????????(PDF,??????)"}
                            required
                            value={businessRegistrationCertificateImage}
                            setFile={setBusinessRegistrationCertificateImage}
                            fileName={businessRegistrationCertificateImageName}
                            setFileName={
                                setBusinessRegistrationCertificateImageName
                            }
                            id={"businessRegistrationCertificateImage"}
                        />
                        <Spacer size={"40px"} />
                        <InputFile
                            label={"?????? ?????????"}
                            placeholder={"?????? ?????????"}
                            required
                            value={shopImage}
                            setFile={setShopImage}
                            fileName={shopImageName}
                            setFileName={setShopImageName}
                            id={"shopImage"}
                        />
                    </Form>
                ) : step === 2 ? (
                    <Form2>
                        <InputText
                            placeholder={"?????? ??????"}
                            label={"?????? ??????"}
                            required
                            value={shopAddress}
                            setValue={setShopAddress}
                            error={shopAddressError}
                            setError={setShopAddressError}
                            errorMessage={shopAddressErrorMessage}
                            setErrorMessage={setShopAddressErrorMessage}
                        />
                        <Spacer size={"40px"} />
                        <InputText
                            placeholder={"ex) 02-1234-5678"}
                            label={"?????? ????????????"}
                            required
                            value={shopPhone}
                            setValue={setShopPhone}
                            error={shopPhoneError}
                            setError={setShopPhoneError}
                            errorMessage={shopPhoneErrorMessage}
                            setErrorMessage={setShopPhoneErrorMessage}
                            regexString={/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/}
                        />
                        <Spacer size={"40px"} />
                        <InputText
                            placeholder={"?????? 7??? ~ ?????? 10???"}
                            label={"?????? ????????????"}
                            required
                            value={businessHours}
                            setValue={setBusinessHours}
                            error={businessHoursError}
                            setError={setBusinessHoursError}
                            errorMessage={businessHoursErrorMessage}
                            setErrorMessage={setBusinessHoursErrorMessage}
                        />
                        <Spacer size={"40px"} />
                        <InputText
                            placeholder={"?????? ?????????,?????????"}
                            label={"?????? ?????????"}
                            required
                            value={closedDays}
                            setValue={setClosedDays}
                            error={closedDaysError}
                            setError={setClosedDaysError}
                            errorMessage={closedDaysErrorMessage}
                            setErrorMessage={setClosedDaysErrorMessage}
                        />
                        <Spacer size={"40px"} />
                        <InputText
                            placeholder={"?????? ??????"}
                            label={"?????? ??????"}
                            required
                            value={shopDescription}
                            setValue={setShopDescription}
                            error={shopDescriptionError}
                            setError={setShopDescriptionError}
                            errorMessage={shopDescriptionErrorMessage}
                            setErrorMessage={setShopDescriptionErrorMessage}
                        />
                    </Form2>
                ) : (
                    step === 3 && (
                        <Form3>
                            <MenuItemList>
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
                            </MenuItemList>
                            <MenuAddButton
                                onClick={() =>
                                    setMenus([
                                        ...menus,
                                        {
                                            shop_menu_name: "?????? ??????",
                                            shop_menu_description: "?????? ??????",
                                            shop_menu_price: 10000,
                                            shop_menu_image_file: null,
                                            shop_menu_image: null,
                                        },
                                    ])
                                }
                            >
                                ?????? ??????
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
                                ??????
                            </PreviousButton>
                            <RowSpacer size={"12px"} />
                        </>
                    )}
                    <SubmitButton onClick={handleClick}>
                        {step === 3 ? "?????? ??????" : "??????"}
                    </SubmitButton>
                </FullRow>
            </Container>
        </PageContainer>
    );
};

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

const fadeIn = keyframes`
    from {
        opacity: 0;
      
    }
    to {
        opacity: 1;
      
    }
`;

const IcoButton = styled.div`
    font-size: 15px;
`;

const BackButton = styled.div`
    margin-bottom: 23px;
    width: 100px;
    background: white;
    font-weight: 600;
    font-size: 17px;
    line-height: 27px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
    color: #5a5963;
    &:hover {
        background: #f4f4f4;
    }
`;
const MenuItemList = styled.div`
    display: flex;
    flex-direction: column;
    height: 510px;
    overflow-y: scroll;
    gap: 20px;
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
    font-size: 18px;
    line-height: 27px;
    color: #666972;
`;

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
    margin-top: 23px;
    cursor: pointer;
    justify-content: center;
    &:hover {
        background: #e5efff;
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

export default AddShop;
