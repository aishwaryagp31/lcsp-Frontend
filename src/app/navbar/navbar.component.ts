import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  authService: any;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  logout()
  {
    
    localStorage.removeItem("key");
    localStorage.clear();
    this.router.navigate(['']);
    
    
  }


}
