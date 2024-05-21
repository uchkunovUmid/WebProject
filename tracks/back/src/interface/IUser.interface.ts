export interface IUserInterface {
    id:number;
    username:string;
    password?:string;
    token?:string;
		role:'admin' | 'user';
}