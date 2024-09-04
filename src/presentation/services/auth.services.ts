import { Users } from "../../data/Mongo/Models/user.models";
import { RegisterUserDto, LoginUserDto } from "../../domain/dto";
import { bcryptAdapter } from "../../config";
import { CustomError } from "../../domain/errors/custom.errors";
import { JWTadapter } from "../../config/jwt.adapter";
import { EmailService } from "./email.services";
import { envs } from "../../config";
import { where } from "sequelize";

export class AuthServices {


  static async login(userLoginDto: LoginUserDto) {
    const { username, password } = userLoginDto;

    try {
      const userExist = await Users.findOne({ where: { username: username } });
      if (!userExist) {
        throw CustomError.badRequest("Wrong credentials");
      }

     

     const{id,name,lastname,emailValidated,email,role,}=userExist.dataValues

      const validatedPassword = bcryptAdapter.compare(
        password,
        userExist.dataValues.password
      );
      if (!validatedPassword) {
        throw CustomError.badRequest("Credenciales incorrectas");
      }
      if (!emailValidated) {
        throw CustomError.badRequest("Su correo no ha sido validado");
      }

      const token = JWTadapter.generateToken({
        id: id,
        email: email,
        role:role[0],
        username,
      });

      if (!token) {
        throw CustomError.internalServer("Token erroneo");
      }

      return {
        name: name,
        lastname: lastname,
        email:email,
        username:username,
        token,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  

  static async register(userRegisterDto: RegisterUserDto) {
    const { name, lastname, email,username, password,address,phone } = userRegisterDto;

    try {
      const emailExist = await Users.findOne({ where: { email: email } });
      const userExist = await Users.findOne({ where: { username: username } });

      if (userExist || emailExist) {
        throw new Error("User allready exist");
      }

      
      const hashedPassword = bcryptAdapter.hash(password);

      const newUser = await Users.create({
        name,
        lastname,
        email,
        username,
        address,
        phone,
        password: hashedPassword,
      });

      //token para validacion de cuenta
      const token = JWTadapter.generateToken({ email });

      const link = `${envs.API_DOMAIN}/api/auth/validate-email/${token}`;

      const htmlBody = `
        
            <h1>Validate your Email</h1>
            <p>Click the followieng link to validate your email</p>
            <a href="${link}">Validate your email: ${email}</a>
            
            `;

      await EmailService.sendEmail({
        to: email,
        subject: "Nueva cuenta",
        htmlBody,
      });

      const user = await Users.findOne({ where: { username: username } });

      return { email, name, lastname, token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  static async validateUser(token: string) {
    try {
      const payload = JWTadapter.validateJWT(token);

      if (!payload || !payload.email) {
        throw CustomError.badRequest("Invalid token");
      }

      const user = await Users.findOne({where:{ email: payload.email }});
      if (!user) {
        throw CustomError.badRequest("User not found");
      }



    const [afectedRows,updated] = await Users.update(
      { emailValidated: true }, // Datos a actualizar
      { where: { email: payload.email },returning: true, } // Condición de búsqueda
    );
    

    if (afectedRows === 0) {
      throw CustomError.badRequest("User not found or already validated");
    }

    


      return {email:updated[0].dataValues.email,emailValidated:updated[0].dataValues.emailValidated}
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  static async forgotPassword(username:string){

    try{
      const userExist = await Users.findOne({ where: { username: username } });
      if (!userExist) {
        throw CustomError.badRequest("Wrong credentials");
      }

      const{email}=userExist.dataValues



        //token para validacion de cuenta
      const token = JWTadapter.generateToken({ email });

      const link = `${envs.API_DOMAIN}/api/auth/new-password/${token}`;

      const htmlBody = `
        
            <h1>Restore your password</h1>
            <p>Click the followieng link to </p>
            <a href="${link}">Change your password: ${username}</a>
            
            `;

      await EmailService.sendEmail({
        to:email,
        subject: "Recuperar contraseña",
        htmlBody,
      });



    }

    catch (error) {
        console.log(error);
        throw error;
      }

  }

  static async restorePassword(password:string,token:string){

    try{
        const {email} = JWTadapter.validateJWT(token);

        if(!email){
            throw CustomError.badRequest("Invalid token")
        }
        const user =await Users.findOne({where:{email}})

        if(!user){
            throw CustomError.badRequest("User not found");
        }

        const newPassword=bcryptAdapter.hash(password)

        const [afectedRows,updated] = await Users.update(
          { password: newPassword }, // Datos a actualizar
          { where: { email:email },returning: true, } // Condición de búsqueda
        );
        

        return


    }

    catch (error) {
        console.log(error);
        throw error;
      }

  }


  static async getUserInfo(username:string){

    try{
      const userInfo=await Users.findOne({ where: { username: username } });

      if(!userInfo){
        throw CustomError.badRequest("User not found");
      }

      return [{title:"Email",
        category:"email",
          value:userInfo.email
        },
        {title:"Telefono",
          category:"phone",
          value:userInfo.phone
        },
        {title:"Direccion",
          category:"address",
          value:userInfo.address
        }]
      



    }

    catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async editUserInfo(username:string,newInfo:any){

    try{
      const userInfo=await Users.findOne({ where: { username: username } });
      if(!userInfo){
        throw CustomError.badRequest("User not found");
      }

      const [afectedRows, updated] = await Users.update(
        newInfo, // Datos a actualizar
        { where: { username:username }, returning: true } // Condición de búsqueda
      );

      const { address,phone,email } =
          updated[0].dataValues;

        return { address,phone,email };

    }

    catch(error){
      console.log(error);
      throw error

    }

  }

  
}
