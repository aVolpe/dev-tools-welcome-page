import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AuthService} from './auth.service';
import {NavigationExtras, Router} from '@angular/router';
import {ToastyService} from 'ng2-toasty';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    public user : {email:string, pass:string};

    @ViewChild('ripples')
    ripples : ElementRef;

    @ViewChild('ripplesCircle')
    ripplesCircle : ElementRef;

    constructor(
        private authService: AuthService,
        private toastyService:ToastyService,
        private router: Router) {}

    ngOnInit() {
        if (environment.production) {
            this.user = {
                email: '',
                pass: ''
            };
        } else {
            this.user = {
                email: 'juan@gmamil.com',
                pass: '134556666'
            };
        }
    }

    clickRipples(event) {

        this.addEffect(event);
        this.toastyService.clearAll();

        this.authService.login(this.user.email, this.user.pass).subscribe(data => {

            this.toastyService.success({
                msg: "Login",
                title: `Welcome ${data.name}`
            });

            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';

            // Set our navigation extras object
            // that passes on our global query params and fragment
            let navigationExtras: NavigationExtras = {
                queryParamsHandling: 'preserve',
                preserveFragment: true
            };

            // Redirect the user
            this.router.navigate([redirect], navigationExtras);
        }, error => {
            console.log(error);
            this.user.pass = '';
            this.toastyService.error({
                msg: "Login",
                title: `Wrong user/password combination`
            });
        });
    }

    private addEffect(event) {

        const parent = this.ripples.nativeElement.parentElement;

        const x = event.pageX - parent.offsetLeft;
        const y = event.pageY - parent.offsetTop;



        this.ripples.nativeElement.className += ' is-active';
        this.ripplesCircle.nativeElement.style['top'] = y + 'px';
        this.ripplesCircle.nativeElement.style['left'] = x + 'px';

        const removeIsActive = () => {
            this.ripples.nativeElement.className = 'ripples buttonRipples';
        };

        this.ripples.nativeElement.addEventListener('animationend', removeIsActive, false);
        this.ripples.nativeElement.addEventListener('webkitAnimationEnd', removeIsActive, false);
        this.ripples.nativeElement.addEventListener('oanimationend', removeIsActive, false);
        this.ripples.nativeElement.addEventListener('mozAnimationEnd ', removeIsActive, false);
        this.ripples.nativeElement.addEventListener('MSAnimationEnd ', removeIsActive, false);
    }
}
