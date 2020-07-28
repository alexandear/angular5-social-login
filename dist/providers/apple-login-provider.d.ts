import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser, LoginProviderClass } from '../entities/user';
export declare class AppleLoginProvider extends BaseLoginProvider {
    private clientId;
    private redirectUri;
    static readonly PROVIDER_ID: string;
    loginProviderObj: LoginProviderClass;
    private auth;
    constructor(clientId: string, redirectUri: string);
    initialize(): Promise<SocialUser>;
    drawUser(): SocialUser;
    signIn(): Promise<SocialUser>;
    signOut(): Promise<any>;
}
