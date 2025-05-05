import { Injectable } from "@angular/core";
import { TokenResponseModel } from "../../../domain/auth/models/token.model";
import { AuthRepository } from "../../../domain/auth/resporitory/auth.repository";
import { AuthAdapter } from "../adapters/auth.adapter";

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AuthRepository {

  constructor(private readonly _authAdapter: AuthAdapter,
  ) {
    super();
  }

  async login(email: string, password: string): Promise<TokenResponseModel> {
    return this._authAdapter.login(email, password);
  }

}
