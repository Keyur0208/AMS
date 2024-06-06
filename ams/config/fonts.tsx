import { Poppins as FontPoppins, Roboto as FontRobot , Open_Sans as FontOpenSans } from "next/font/google";

export const fontPoppin = FontPoppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight:["100","200","300","400","500","600","700","800","900"],
})

export const  fontRobot = FontRobot({
    subsets: ["latin"],
    variable: "--font-robots",
    weight:["100","300","400","500","700","900"]
})


export const  fontOpenSan = FontOpenSans({
    subsets: ["latin"],
    variable: "--font-fontopensans"
})