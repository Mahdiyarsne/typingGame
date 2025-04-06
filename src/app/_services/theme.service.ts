import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private render: Renderer2;
  private currnetTheme: string = 'default';

  constructor(renderFactory: RendererFactory2) {
    this.render = renderFactory.createRenderer(null, null);
  }

  setTheme(theme: string): void {
    const htmlElement = document.documentElement;
    this.render.setAttribute(htmlElement, 'data-theme', theme);
    this.currnetTheme = theme;
    localStorage.setItem('theme', theme);
  }

  loadTheme(): void {
    const saveTheme = localStorage.getItem('theme') || 'default';
    this.setTheme(saveTheme);
  }

  getTheme(): string {
    return this.currnetTheme;
  }
}
