import React, { useContext } from "react";
import { Post } from "../posts/post";
import { ThemeContext } from "../../contexts/theme-context";
import styled from "styled-components";

function Detail() {
  const { theme } = useContext(ThemeContext);

  return (
    <DetailSection theme={theme}>
      <Post />
    </DetailSection>
  );
}

export { Detail };

// Estilos

const DetailSection = styled.section`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
