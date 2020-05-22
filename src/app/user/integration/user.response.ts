export interface UserResponse {
  id: number;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  picture: string;
  watchedMovies: any[];   // TODO: type it
  token?: string;
}
