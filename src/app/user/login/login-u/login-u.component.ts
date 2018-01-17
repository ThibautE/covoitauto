import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-u',
  templateUrl: './login-u.component.html',
  styleUrls: ['./login-u.component.css']
})


export class LoginUComponent implements OnInit {
    
  model: any = {};

  loading = false;
  returnUrl: string; 
  
  constructor(private route: ActivatedRoute, private router: Router, private loginService : LoginService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.msgs = [];
    if (this.route.snapshot.queryParams['origin'] &&
      this.route.snapshot.queryParams['origin'] === 'register') {
      this.msgs.push({severity: 'success', summary: 'Compte créé', detail: 'Vous pouvez maintenant vous connecter'});
      this.model.mail = this.route.snapshot.queryParams['mail'] || '';
    }

  }

  login() {
    this.loading = true;
    this.loginService.login(this.model.mail, this.model.password)
      .subscribe(res => {
        this.loading = false;
        if (res[0]) {
          if (this.returnUrl === '/') {
            this.returnUrl = '/dashboard';
          }
          this.router.navigate([this.returnUrl]);
        }else {
          this.msgs = [];
          this.msgs.push({
            severity: 'error',
            summary: 'Erreur d\'authentification',
            detail: 'Vérifiez que votre adresse mail et votre mot de passe sont valides'
          });
        }


      });
  }
}