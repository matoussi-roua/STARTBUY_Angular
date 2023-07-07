import { LocationClient } from "./location";
export class Client {
    id!:number;
    first_name!: string;
    last_name!:string;
    email!:string;
    password!:string;
    role!:string;
    phone_number1!:number;
    phone_number2!:number;
    location!:LocationClient;
    post_code!:number;

}
