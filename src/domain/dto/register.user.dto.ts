import { regularExps } from "../../config";

export class RegisterUserDto {
  constructor(
    readonly name: string,
    readonly lastname: string,
    readonly email: string,
    readonly username: string,
    readonly password: string,
    readonly phone: string,
    readonly address: string,
  ) {}

  static create(object: { [key: string]: string }): [string?, RegisterUserDto?] {
    const { name, lastname, email, password,username,phone,address } = object;

    // Validaciones del nombre
    if (!name) {
      return ["Falta el nombre", undefined];
    }
    if (!regularExps.only_letters.test(name)) {
      return ["El nombre debe contener letras y espacios", undefined];
    }

    //Validaciones del apellido

    if (!lastname) {
      return ["Falta el nombre", undefined];
    }
    if (!regularExps.only_letters.test(lastname)) {
      return ["El nombre debe contener letras y espacios", undefined];
    }

    // Validaciones del email
    if (!email) {
      return ["Falta el correo electrónico", undefined];
    }
    if (!regularExps.email.test(email)) {
      return ["El correo electrónico no es válido", undefined];
    }

    
    // Validaciones del usenamee
    if (!username) {
      return ["Falta el nombre de usuario", undefined];
    }

    // Validaciones del telefono
    if (!phone) {
      return ["Falta el número telefonico de usuario", undefined];
    }
   
    // Validaciones del dirección
    if (!address) {
      return ["Falta el número telefonico de usuario", undefined];
    }
   
   

    // Validaciones de la contraseña
    if (!password) {
      return ["Falta la contraseña", undefined];
    }
    if (!regularExps.contain_special_character.test(password)) {
      return [
        "La contraseña debe contener al menos un carácter especial",
        undefined,
      ];
    }
    if (!regularExps.contain_letter.test(password)) {
      return [
        "La contraseña debe contener al menos una letra minúscula",
        undefined,
      ];
    }
    if (!regularExps.contain_Capital_leter.test(password)) {
      return [
        "La contraseña debe contener al menos una letra mayúscula",
        undefined,
      ];
    }
    if (!regularExps.contain_number.test(password)) {
      return ["La contraseña debe contener al menos un número", undefined];
    }
    if (password.length < 6) {
      return ["La contraseña es demasiado corta", undefined];
    }

    return [undefined, new RegisterUserDto(name,lastname, email,username, password,phone,address)];
  }
}
