export interface AuthorInterface {
  id: number,
  name: string,
}

export interface ReviewsInterface {
id: number,
rating: number,
date: string,
author: AuthorInterface,
text: string,
}

export interface MovieInterface {
  id: string,
  name: string,
  genre: string,
  year: number,
  image: string,
  poster: string,
  cover: string,
  previewSrc: string,
  runtime: string,
  rating: number,
  votes: number,
  director: string,
  description: string,
  starring: string[],
  reviews: ReviewsInterface[],
  favorite: boolean,
}

export type MoviesInterface = MovieInterface[]
