import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AuthService} from './auth.service';

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

    constructor(private authService : AuthService) {}

    ngOnInit() {
        this.user = {
            email: '',
            pass: ''
        };
    }

    clickRipples(event) {

        const parent = this.ripples.nativeElement.parentElement;

        console.log(event);
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

        this.authService.login(this.user.email, this.user.pass).subscribe(data => {
            console.log(data);
        });
    }

}
