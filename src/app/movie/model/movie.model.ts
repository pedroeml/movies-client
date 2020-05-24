import { MovieResponse } from '../integration/movie.response';

export class MovieModel {
  public readonly id: string;
  public readonly name: string;
  public readonly genre: string;
  public readonly release: string;
  public readonly videoUrl: string;

  constructor(movie: MovieResponse) {
    this.id = movie.id;
    this.name = movie.name;
    this.genre = movie.genre;
    this.release = movie.release;
    this.videoUrl = movie.videoUrl;
  }
}
