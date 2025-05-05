import { Injectable } from "@angular/core";
import { TokenResponseModel } from "../../domain/auth/models/token.model";
import { AuthRepository } from "../../domain/auth/resporitory/auth.repository";

@Injectable({
    providedIn: 'root'
})

export class AuthUseCases {

    constructor(private _authRepository: AuthRepository) { }

    login(email: string, password: string): Promise<TokenResponseModel> {
        return this._authRepository.login(email, password);
    }
   
}