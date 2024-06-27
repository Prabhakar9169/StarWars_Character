import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  HStack,
  useBreakpointValue,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./pages.css";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage, 10) : 1;
  });
  const [totalPages, setTotalPages] = useState(1);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [loading, setLoading] = useState(false);
  console.log(characters,"Char")
  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.dev/api/people/?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        const totalCount = data.count;
        setTotalPages(Math.ceil(totalCount / 10));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);
  useEffect(() => {
    localStorage.setItem("currentPage", page.toString());
  }, [page]);

  const toggleFavorite = (character) => {
    const isFavorite = favorites.some((fav) => fav.name === character.name);
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.name !== character.name);
    } else {
      updatedFavorites = [...favorites, character];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <>
      {loading ? (
        <Center height="100vh">
          <Spinner size="xl" />
        </Center>
      ) : (
        <Box p={5} className="main">
          <Center>
            <Heading mb={4}>
              <span className="heading">Star Wars Characters</span>
            </Heading>
          </Center>
          <SimpleGrid columns={2} spacing={10}>
            {characters.map((character) => (
              <Box
                key={character.name}
                p={5}
                shadow="md"
                borderWidth="1px"
                className="character-Box"
              >
                <Heading fontSize="xl">{character.name}</Heading>
                <Text mt={4}>
                  Height:
                  <span style={{ fontWeight: "bold" }}>
                    {character.height} cm
                  </span>
                </Text>
                <Text mt={4}>
                  Mass:
                  <span style={{ fontWeight: "bold" }}>
                    {character.mass} kg
                  </span>
                </Text>
                <Box mt={4}>
                  <Button
                    size={buttonSize}
                    mr={2}
                    mb={2}
                    colorScheme={
                      favorites.some((fav) => fav.name === character.name)
                        ? "red"
                        : "green"
                    }
                    onClick={() => toggleFavorite(character)}
                  >
                    {favorites.some((fav) => fav.name === character.name)
                      ? "Unfavorite"
                      : "Favorite"}
                  </Button>
                  <Button
                    size={buttonSize}
                    mb={2}
                    as={Link}
                    to={`/character/${character.url.split("/").slice(-2, -1)}`}
                    colorScheme="blue"
                  >
                    View Details
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
          <HStack mt={4} justify="center">
            <button
              className="btn"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <Text fontWeight="bold">
              Page {page} of {totalPages}
            </Text>
            <button
              className="btn"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </HStack>
        </Box>
      )}
    </>
  );
};

export default CharacterList;
