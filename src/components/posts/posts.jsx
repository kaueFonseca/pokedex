import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { ThemeContext } from "../../contexts/theme-context";
import { ThemeTogglerButton } from "../theme-toggler-button/theme-toggler-button";

async function getPokemonApi() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=1500&offset=0"
  );
  const data = await response.json();
 
  const detailedData = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();
      return {
        name: details.name,
        image: details.sprites.front_default,
        url: pokemon.url,
        types: details.types.map((typeInfo) => typeInfo.type.name),
      };
    })
  );
  return detailedData;
}

const Posts = () => {
  const { theme } = useContext(ThemeContext);
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(""); 

  useEffect(() => {
    async function fetchData() {
      const posts = await getPokemonApi();
      setPosts(posts);
    }

    fetchData();
  }, []);

  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 10);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleTypeFilter = (e) => {
    setSelectedType(e.target.value);
  };

  const filteredPosts = posts
    .filter((post) =>
      post.name.toLowerCase().includes(searchTerm)
    )
    .filter((post) =>
      selectedType === "" || post.types.includes(selectedType)
    );

  return (
    <>
      <GlobalStyle theme={theme} />
      <Header>
        <Nav>
          <Logo>
            <Link to="/"> 
            <img
              width={200}
              src="src/assets/180619084-a56960ab-7efa-4e34-9d33-4e3e581d62ff.png"
              alt="logo"
            />
            </Link>
          </Logo>
          <Menu>
            <ul>
              <li>
                <SearchInput
                  placeholder="Search Pokémon"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </li>
              <li>
                <TypeFilter value={selectedType} onChange={handleTypeFilter}>
                  <option value="">All Types</option>
                  <option value="grass">Grass</option>
                  <option value="fire">Fire</option>
                  <option value="water">Water</option>
                  <option value="bug">Bug</option>
                  <option value="normal">Normal</option>
                  <option value="poison">Poison</option>
                  <option value="electric">Electric</option>
                  <option value="ground">Ground</option>
                  <option value="fairy">Fairy</option>
                  <option value="fighting">Fighting</option>
                  <option value="psychic">Psychic</option>
                  <option value="rock">Rock</option>
                  <option value="ghost">Ghost</option>
                  <option value="ice">Ice</option>
                  <option value="dragon">Dragon</option>
                  <option value="dark">Dark</option>
                  <option value="steel">Steel</option>
                  <option value="flying">Flying</option>
                </TypeFilter>
              </li>
              <li>
                <ThemeTogglerButton />
              </li>
            </ul>
          </Menu>
        </Nav>
      </Header>

      <Section >
        <PokemonList>
          {filteredPosts.slice(0, visiblePosts).map((post) => (
            <PokemonItem key={post.name} style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
              <StyledLink to={`/detail/${post.name}`}>
                <img src={post.image} alt={post.name}></img>
                <p>{post.name}</p>
              </StyledLink>
            </PokemonItem>
          ))}
        </PokemonList>
       { visiblePosts < filteredPosts.length && (
         <LoadMoreButton onClick={loadMorePosts}>Carregar mais</LoadMoreButton>
       )}
      </Section>
    </>
  );
};

export { Posts };



//estilos
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};
  }

  li,p {
  color: ${(props) => props.theme.secondaryColor};
  }
  
`;
const Header = styled.header`
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  img {
    width: 200px;
  }
`;

const Menu = styled.div`
  ul {
    display: flex;
    gap: 20px;
  }

  li {
    display: inline-block;
    padding: 5px 10px;
  }
`;

const SearchInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Section = styled.section`
  padding: 20px;
  max-width: 3000px;
`;

const PokemonList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  list-style: none;
  padding: 0;
`;

const PokemonItem = styled.li`
  text-align: center;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100px;
    height: 100px;
  }

  p {
    margin: 10px 0 0;
    font-weight: bold;
    text-transform: capitalize;
  }
`;

const TypeFilter = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
`;


const StyledLink = styled(Link)`
  text-decoration: none; 
  color: inherit; 
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;
