import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Spinner,
  SimpleGrid,
  Center,Flex, Table, Tbody, Tr, Td, Image,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";


const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const imagePath = require(`../assets/${id}.jpeg`);

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setCharacter(data);
        return Promise.all(
          data.films.map((url) => fetch(url).then((res) => res.json()))
        );
      })
      .then((filmsData) => {
        setFilms(filmsData);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={5}>
      <Center>
        <Heading mb={4} className="character-name">
          {character.name}
        </Heading>
      </Center>
      <Center>
      <Box width="100%">
  <Flex justifyContent="space-evenly">
    <Box >
      <Table variant="simple" width="100%">
        <Tbody>
          <Tr fontWeight="bold">
            <Td>Height</Td>
            <Td>{character.height} cm</Td>
          </Tr>
          <Tr fontWeight="bold">
            <Td>Mass</Td>
            <Td>{character.mass} kg</Td>
          </Tr>
          <Tr fontWeight="bold">
            <Td>Hair Color</Td>
            <Td>{character.hair_color.toUpperCase()}</Td>
          </Tr>
          <Tr fontWeight="bold">
            <Td>Skin Color</Td>
            <Td>{character.skin_color.toUpperCase()}</Td>
          </Tr>
          <Tr fontWeight="bold">
            <Td>Eye Color</Td>
            <Td>{character.eye_color.toUpperCase()}</Td>
          </Tr>
          <Tr fontWeight="bold">
            <Td>Birth Year</Td>
            <Td>{character.birth_year.toUpperCase()}</Td>
          </Tr>
          <Tr fontWeight="bold">
            <Td>Gender</Td>
            <Td>{character.gender.toUpperCase()}</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
    <Box  
      height="10%" 
      width="20%" 
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Image 
        src={imagePath}
        alt={character.name} 
        objectFit="cover"
        height="100%"
        width="100%" 
      />
    </Box>
  </Flex>
</Box>
      </Center>
      <Heading mt={6} mb={4} size="lg">
        Films
      </Heading>
      <SimpleGrid columns={2} spacing={10}>
        {films.map((film) => (
          <Box
            key={film.title}
            p={5}
            shadow="md"
            borderWidth="1px"
            className="film-box"
          >
            <Heading fontSize="xl" color="red">
              {film.title}
            </Heading>
            <Text mt={4}>
              Release Date:
              <span style={{ fontWeight: "bold" }}>{film.release_date}</span>
            </Text>
            <Text mt={4}>
              Director:
              <span style={{ fontWeight: "bold" }}>{film.director}</span>
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CharacterDetail;
