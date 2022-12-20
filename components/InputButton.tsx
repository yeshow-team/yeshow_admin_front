import React, { useState } from "react";
import styled from "@emotion/styled";

const InputButton = ({
    value,
    setValue,
    error,
    setError,
    errorMessage,
    setErrorMessage,
    options,
    label,
    placeholder,
    required,
}: any) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);

    return (
        <div>
            <InputLabel>
                {label}
                <RowSpacer size="10px" /> {required && <RedBall />}
            </InputLabel>
            <Spacer size={"15px"} />
            <Container onClick={() => setOpen(!open)} open={open}>
                {value ? (
                    <Value>{value}</Value>
                ) : (
                    <Placeholder>{placeholder}</Placeholder>
                )}
                <Arrow open={open} />
            </Container>
            {open && (
                <div
                    style={{
                        position: "absolute",
                        zIndex: 999,
                    }}
                >
                    <Spacer size={"10px"} />
                    <OptionsContainer>
                        {filteredOptions.map((option: any) => (
                            <Option
                                onClick={() => {
                                    setValue(option);
                                    setSelected(option);
                                    setOpen(false);
                                }}
                                selected={selected === option}
                                key={option}
                            >
                                {option}
                            </Option>
                        ))}
                    </OptionsContainer>
                </div>
            )}
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

const OptionsContainer = styled.div`
    position: absolute;
    padding: 7px;
    width: 150px;
    background: white;
    box-shadow: 0px 4px 20px rgba(180, 176, 206, 0.25);
    box-sizing: border-box;
    border-radius: 4px;
    z-index: 1;
    @keyframes smoothAppear {
        from {
            opacity: 0.5;
            transform: translateY(-4%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    animation: smoothAppear 0.3s;
`;

const Option = styled.div<{ selected: boolean }>`
    padding: 17px 20px;
    font-weight: 400;
    font-size: 17px;
    line-height: 17px;
    color: #464548;
    cursor: pointer;
    background: ${(props: any) => (props.selected ? "var(--border)" : "none")};
    &:hover {
        background: #f5f6f8;
        transition: all 0.2s ease-in-out;
    }
    border-radius: 5px;
`;

const ErrorMessage = styled.div`
    font-weight: 500;
    font-size: 17px;
    line-height: 17px;
    color: red;
    margin-top: 5px;
`;

const Value = styled.div`
    font-weight: 500;
    font-size: 17px;

    color: var(--textPrimary);
`;

const Arrow = styled.div<{ open: boolean }>`
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

const Placeholder = styled.div`
    font-weight: 500;
    font-size: 17px;
    color: #bdbdc2;
`;

const Container = styled.div<{ open: boolean }>`
    width: 100%;
    height: 54px;
    padding: 0 17px;
    border: none;
    outline: none;
    box-shadow: ${(props: any) =>
        props.open ? "inset 0 0 0 2px #5987ff" : "0 0 0 1px #e6e6e6"};

    background: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
        border: none;
        outline: none;
        box-shadow: inset 0 0 0 2px #9bb7ff;
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

export default InputButton;
