import React, { useContext } from "react";
import { ThemeContext, themes } from "../../contexts/theme-context";
import { ButtonToggler } from "./button-toggler/button";

export const ThemeTogglerButton =() =>{

    const {theme, setTheme} = useContext(ThemeContext)

    return(
        <div>
            <ButtonToggler onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}>Mudar-tema</ButtonToggler>
        </div>
    )
}