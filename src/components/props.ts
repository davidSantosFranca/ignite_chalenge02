export interface SideBarProps {
  handleClickButton: (genreId: number) => void;
  genres: GenreResponseProps[];
  selectedGenreId: number;
}

export interface ContentProps {
  movies: MovieProps[];
  selectedGenre: GenreResponseProps;
}

export interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

export interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}