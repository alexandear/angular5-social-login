import { BaseLoginProvider } from '../entities/base-login-provider';
import { SocialUser, LoginProviderClass } from '../entities/user';

declare let AppleID: any;

export class AppleLoginProvider extends BaseLoginProvider {

  public static readonly PROVIDER_ID = 'apple';
  public loginProviderObj: LoginProviderClass = new LoginProviderClass();
  private auth: any;

  constructor(private clientId: string, private redirectUri: string) {
    super();
    this.loginProviderObj.id = clientId;
    this.loginProviderObj.name = 'apple';
    this.loginProviderObj.url = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
  }

  initialize(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      this.loadScript(this.loginProviderObj, () => {
          AppleID.load('AppleID', () => {
            this.auth = AppleID.auth.init({
              client_id: this.clientId,
              scope: 'email',
              redirect_uri: this.redirectUri
            });
          });
      });
    });
  }

  drawUser(): SocialUser {
    return new SocialUser();
  }

  signIn(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      let promise = this.auth.signIn();
      promise.then(() => {
        resolve(this.drawUser());
      });
    });
  }

  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {});
  }

}
