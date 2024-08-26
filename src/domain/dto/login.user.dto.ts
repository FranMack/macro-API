import { regularExps } from "../../config";

export class LoginUserDto {
  constructor(
    readonly username: string,
    readonly password: string
  ) {}

  static create(object: { [key: string]: string }): [string?, LoginUserDto?] {
    const { username, password } = object;

   

    // Validaciones del username
    if (!username) {
      return ["Falta el nombre de usario", undefined];
    }

    // Validaciones de la contraseña
    if (!password) {
      return ["Falta la contraseña", undefined];
    }
    

    return [undefined, new LoginUserDto(username, password)];
  }
}
