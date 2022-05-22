import { SetStateAction, useEffect, useState } from 'react';

import { MovieCard } from './components/MovieCard';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

import {GenreResponseProps, MovieProps} from './components/props'

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response: { data: SetStateAction<GenreResponseProps[]>; }) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then((response: { data: SetStateAction<MovieProps[]>; }) => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then((response: { data: SetStateAction<GenreResponseProps>; }) => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        handleClickButton = {(id) => {
          handleClickButton(id);
        }}
        genres = {genres}
        selectedGenreId = {selectedGenreId}
      />
      <Content 
        movies={movies} 
        selectedGenre={selectedGenre} 
      />
    </div>
  );
}