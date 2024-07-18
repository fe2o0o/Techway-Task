import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { LoaderService } from './services/loader.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private _LoaderService:LoaderService ) {
    this._LoaderService.isLoading.subscribe({
      next: () => {
        this._LoaderService.isLoading.getValue() ? this.isLoading.set(true) : this.isLoading.set(false)
      }
    })
  }

  isLoading = signal(false)
  title = 'techway-task';
}
