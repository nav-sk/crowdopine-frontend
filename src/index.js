import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const chakraTheme = extendTheme({
    colors: {
        black: {500:"#000"},
        white: {500:"#fff"},
        Wood: {
            100: "#f7f0ed",
            200: "#e8d2ca",
            300: "#d9b4a6",
            400: "#c99582",
            500: "#ba775f",
            600: "#a05e45",
            700: "#7d4936",
            800: "#593426",
            900: "#351f17",
            1000: "#120a08",
        },

        Sandal: {
            100: "#fff6e5",
            200: "#ffe4b3",
            300: "#ffd280",
            400: "#ffc04d",
            500: "#ffae1a",
            600: "#e69400",
            700: "#b37300",
            800: "#805200",
            900: "#4d3100",
            1000: "#1a1000",
        },

        Pink: {
            100: "#f9ebef",
            200: "#eec4cf",
            300: "#e39caf",
            400: "#d7748e",
            500: "#cc4d6e",
            600: "#b23355",
            700: "#8b2842",
            800: "#631c2f",
            900: "#3b111c",
            1000: "#140609",
        },

        DBlue: {
            100: "#eceff9",
            200: "#c5d0ed",
            300: "#9eb0e1",
            400: "#7791d5",
            500: "#5071c9",
            600: "#3658af",
            700: "#2a4488",
            800: "#1e3161",
            900: "#121d3a",
            1000: "#060a13",

        },

        Blue: {
            100: "#eaeffa",
            200: "#c0cff1",
            300: "#97afe8",
            400: "#6d8fdf",
            500: "#436fd6",
            600: "#2956bc",
            700: "#204392",
            800: "#173068",
            900: "#0e1d3f",
            1000: "#050a15",
        }
    }
})

root.render(
    <React.StrictMode>
        <ChakraProvider theme={chakraTheme}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
