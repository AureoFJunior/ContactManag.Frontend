export interface User {
  id?: number
  firstName: string
  lastName: string
  userName: string
  password: string
  email: string
  isLogged: number
}

export interface UserDTO extends User {
  token: string
  refreshToken: string
}
