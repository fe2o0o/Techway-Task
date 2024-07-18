import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive  } from '@angular/router';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatIconModule,RouterLink,RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

}
