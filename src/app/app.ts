import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryCard } from "./ui/category-card/category-card";
import { Header } from "./layout/header/header";
import { Home } from "./pages/home/home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CategoryCard, Header, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('nekomarket');
}
