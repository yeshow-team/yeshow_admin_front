import React, { useState, useRef, ChangeEvent } from "react";
import styled from "@emotion/styled";

const InputFile = (props: any) => {
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

    return (
        <div>
            <InputLabel>
                {props.label}
                <RowSpacer size="10px" /> {props.required && <RedBall />}
            </InputLabel>
            <Spacer size={"15px"} />
            <label htmlFor={props.id}>
                <Button>
                    <Icon className="material-symbols-rounded">
                        drive_folder_upload
                    </Icon>
                    <RowSpacer size={"10px"} />
                    {props.fileName ? (
                        <FileName>
                            {props.fileName.substring(0, 32)}
                            {props.fileName.length > 32 && "..."}
                        </FileName>
                    ) : (
                        props.placeholder
                    )}
                </Button>
            </label>
            <Input
                id={props.id}
                type={"file"}
                accept="image/jpg, image/png, image/jpeg"
                onChange={(base64: ChangeEvent<HTMLInputElement>) => {
                    if (!base64.target.files) return;
                    const file = base64.target.files[0];
                    props.setFileName(file.name);
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
                                props.setFile(dataUrl);
                            }
                        };
                    };
                    reader.readAsDataURL(file);
                }}
            />
        </div>
    );
};

const Icon = styled.span`
    color: #808088;
`;

const FileName = styled.div`
    font-weight: 500;
    font-size: 17px;
    color: #63636c;
`;

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
`;

const Option = styled.div`
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

const Placeholder = styled.div`
    font-weight: 500;
    font-size: 17px;

    color: #bdbdc2;
`;

const Input = styled.input`
    &[type="file"] {
        display: none;
        overflow: hidden;
    }
    &:focus-within label > div {
        box-shadow: inset 0 0 0 2px #5987ff;
    }
`;

const Button = styled.div`
    width: 100%;
    height: 54px;
    font-size: 17px;
    background: #ffffff;
    color: #bdbdc2;
    border: none;
    outline: none;
    border-radius: 8px;
    padding-left: 17px;
    box-shadow: inset 0 0 0 1px #e6e6e6;
    cursor: pointer;
    &:hover {
        border: none;
        outline: none;
        box-shadow: inset 0 0 0 2px #9bb7ff;
        transition: all 0.2s ease-in-out;
    }
    &:active {
        box-shadow: inset 0 0 0 2px #5987ff;
    }
    display: flex;
    align-items: center;
`;

const InputLabel = styled.div`
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 19px;
    line-height: 21px;
    color: var(--textPrimary);
`;

export default InputFile;
