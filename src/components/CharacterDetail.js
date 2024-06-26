import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Spinner,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

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
        {" "}
        <Heading mb={4} className="character-name">
          {character.name}
        </Heading>
      </Center>
      <Center>
        {" "}
        <Box>
          {" "}
          <Text>
            Height:{" "}
            <span style={{ fontWeight: "bold" }}>{character.height} cm </span>
          </Text>
          <Text>
            Mass:{" "}
            <span style={{ fontWeight: "bold" }}>{character.mass} kg </span>
          </Text>
          <Text>
            Hair Color:
            <span style={{ fontWeight: "bold" }}>
              {" "}
              {character.hair_color.toUpperCase()}
            </span>
          </Text>
          <Text>
            Skin Color:
            <span style={{ fontWeight: "bold" }}>
              {" "}
              {character.skin_color.toUpperCase()}
            </span>
          </Text>
          <Text>
            Eye Color:{" "}
            <span style={{ fontWeight: "bold" }}>
              {character.eye_color.toUpperCase()}
            </span>
          </Text>
          <Text>
            Birth Year:
            <span style={{ fontWeight: "bold" }}>
              {character.birth_year.toUpperCase()}
            </span>
          </Text>
          <Text>
            Gender:
            <span style={{ fontWeight: "bold" }}>
              {" "}
              {character.gender.toUpperCase()}
            </span>
          </Text>
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
              Release Date:{" "}
              <span style={{ fontWeight: "bold" }}>{film.release_date}</span>
            </Text>
            <Text mt={4}>
              Director:
              <span style={{ fontWeight: "bold" }}>{film.director}</span>{" "}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CharacterDetail;
