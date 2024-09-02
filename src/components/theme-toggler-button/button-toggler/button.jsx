import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/theme-context";

export const ButtonToggler = (props) => {

    const { theme } = useContext(ThemeContext)

    return(
        <button {...props} 
        style={{
            color: theme.color, 
            backgroundColor: theme.backgroundColor,
            border: '1px, solid',
            cursor: 'pointer',
            padding: '10px 20px',
            borderRadius: '4px',
        }}/>
    )
}