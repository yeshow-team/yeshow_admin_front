import React, { useState } from "react";
import styled from "@emotion/styled";

const InputText = ({
    label,
    placeholder,
    required,
    value,
    error,
    errorMessage,
    setError,
    setErrorMessage,
    setValue,
    regexString,
}: any) => {
    const [borderColor, setBorderColor] = useState("#e6e6e6");
    const [borderWidth, setBorderWidth] = useState("1px");

    return (
        <div>
            <InputLabel>
                {label}
                <RowSpacer size="10px" /> {required && <RedBall />}
            </InputLabel>
            <Spacer size={"15px"} />
            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                onBlur={() => {
                    if (required || regexString) {
                        if (required && !value) {
                            setError(true);
                            setErrorMessage("필수 입력사항입니다");
                            setBorderColor("#ff0000");
                            setBorderWidth("2px");
                            return;
                        }
                        if (regexString && !regexString.test(value)) {
                            setError(true);
                            setErrorMessage("형식에 맞게 입력해주세요");
                            setBorderColor("#ff0000");
                            setBorderWidth("2px");
                            return;
                        }
                        setError(false);
                        setErrorMessage("");
                        setBorderColor("#e6e6e6");
                        setBorderWidth("1px");
                    } else {
                        setError(false);
                        setErrorMessage("");
                        setBorderColor("#e6e6e6");
                        setBorderWidth("1px");
                    }
                }}
                borderColor={borderColor}
                borderWidth={borderWidth}
                onFocus={() => {
                    setError(false);
                    setErrorMessage("");
                }}
                error={error}
            />
            {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </div>
    );
};

const RedBall = styled.div`
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background: #f76565;
`;
const RowSpacer = (props: any) => {
    return <div style={{ width: `${props.size}` }} />;
};

const ErrorMessage = styled.div`
    position: absolute;
    font-weight: 500;
    font-size: 17px;
    line-height: 17px;
    color: #ff0000;
    margin-top: 8px;
`;

const Value = styled.div`
    font-weight: 500;
    font-size: 17px;

    color: var(--textPrimary);
`;

const Arrow = styled.div`
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--textPrimary);
    transform: rotate(${(props: any) => (props.open ? "180deg" : "0deg")});
    transition: transform 0.2s ease-in-out;
`;

const Spacer = (props: any) => {
    return <div style={{ height: `${props.size}` }} />;
};

const Input = styled.input<{
    borderColor: string;
    borderWidth: string;
    error?: string;
}>`
    width: 100%;
    height: 54px;
    font-size: 17px;
    background: #ffffff;
    outline: none;
    box-shadow: inset 0 0 0 ${(props: any) => props.borderWidth}
        ${(props: any) => props.borderColor};
    border-radius: 8px;
    padding-left: 17px;
    border: none;
    &:hover {
        border: none;
        outline: none;
        box-shadow: inset 0 0 0 2px
            ${(props: any) => (!props.error ? `#9bb7ff` : `#ff7474`)};
        transition: all 0.2s ease-in-out;
    }
    &:focus {
        border: none;
        outline: none;
        box-shadow: inset 0 0 0 2px #5987ff;
        transition: all 0.2s ease-in-out;
    }

    &::placeholder {
        color: #bdbdc2;
    }
`;

const InputLabel = styled.div`
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 19px;
    line-height: 21px;
    color: var(--textPrimary);
`;

export default InputText;
