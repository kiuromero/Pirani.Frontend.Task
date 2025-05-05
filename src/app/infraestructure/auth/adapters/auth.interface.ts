import { TokenResponseModel } from "../../../domain/auth/models/token.model";

export interface IAuthAdapter {
    login(email: string, password: string): Promise<TokenResponseModel>;    
}
