import React from "react";

export const LoaderHomeUser = ()=> {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ margin: "auto", background: "none" }}
            width="100"
            height="100"
            display="block"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 100 100"
        >
            <path fill="#e69400" d="M15 30H25V70H15z">
                <animate
                    attributeName="opacity"
                    begin="-0.6"
                    calcMode="spline"
                    dur="1s"
                    keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="1;0.2;1"
                ></animate>
            </path>
            <path fill="#ffd280" d="M35 30H45V70H35z">
                <animate
                    attributeName="opacity"
                    begin="-0.4"
                    calcMode="spline"
                    dur="1s"
                    keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="1;0.2;1"
                ></animate>
            </path>
            <path fill="#ffd280" d="M55 30H65V70H55z">
                <animate
                    attributeName="opacity"
                    begin="-0.2"
                    calcMode="spline"
                    dur="1s"
                    keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="1;0.2;1"
                ></animate>
            </path>
            <path fill="#e69400" d="M75 30H85V70H75z">
                <animate
                    attributeName="opacity"
                    begin="-1"
                    calcMode="spline"
                    dur="1s"
                    keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
                    keyTimes="0;0.5;1"
                    repeatCount="indefinite"
                    values="1;0.2;1"
                ></animate>
            </path>
        </svg>
    );
}
