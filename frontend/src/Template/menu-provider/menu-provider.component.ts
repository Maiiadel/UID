import { Component } from '@angular/core';
import { AuthService } from '../../app/shared/services/auth.service';
import { FirebaseService } from '../../app/shared/services/firebase.service';

@Component({
  selector: 'app-menu-provider',
  templateUrl: './menu-provider.component.html',
  styleUrls: ['./menu-provider.component.scss'],
})
export class MenuProviderComponent {
  loggedin: boolean = true;

  user_is_provider: boolean = false;
  user_is_client: boolean = false;
  logo_src: string = '/assets/finances-money-svgrepo-com.svg';

  constructor(private db: FirebaseService, public authService: AuthService) {}
  ngOnInit(): void {
    if (this.db.user.user_type === undefined) {
      return;
    }
    if (this.db.user.user_type === 'provider') {
      this.user_is_provider = true;
    } else if (this.db.user.user_type === 'client') {
      this.user_is_client = true;
    }
  }

  logout() {
    this.user_is_provider = false;
    this.user_is_client = false;
    console.log('Logged out Entered');

    let result = this.authService.SignOut();
    console.log(result);
  }
}
