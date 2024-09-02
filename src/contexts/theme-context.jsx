import React, { createContext, useState } from "react";


export const themes = {
    light: {
        color: '#000000',
        backgroundColor: '#EEEEEE',
    },
    dark: {
        color: '#E0E0E0',
        backgroundColor: '#121212',
        secondaryColor: '#03DAC6',
        cardBackground: '#333333',
        borderColor: '#2C2C2C',
    }
}

export const ThemeContext = createContext({})

export const ThemeProvider = (props) => {

    const [theme, setTheme] = useState(themes.light)

    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}