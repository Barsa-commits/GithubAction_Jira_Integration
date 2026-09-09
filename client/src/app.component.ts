import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="shell">
      <section class="card">
        <p class="eyebrow">Angular + Node.js</p>
        <h1>Lowercase converter</h1>
        <p class="intro">Enter a word or sentence. Capital letters will be converted into small letters.</p>

        <label for="value">Word or sentence</label>
        <input id="value" [(ngModel)]="value" placeholder="Example: HELLO WORLD" (keyup.enter)="convert()" />
        <button class="convert" (click)="convert()" [disabled]="loading">{{ loading ? 'Converting…' : 'Convert to lowercase' }}</button>

        <p class="error" *ngIf="error">{{ error }}</p>
        <div class="result" *ngIf="result !== null">
          <span>Result</span>
          <strong>{{ result }}</strong>
        </div>
      </section>
    </main>
  `,
  styleUrls: ['./styles.css']
})
export class AppComponent {
  private readonly http = inject(HttpClient);
  value = '';
  result: string | null = null;
  error = '';
  loading = false;

  convert() {
    this.loading = true;
    this.result = null;
    this.error = '';
    this.http.post<{ result: string }>('http://20.115.51.41:3001/api/convert', { value: this.value }).subscribe({
      next: (response) => {
        this.result = response.result;
        this.loading = false;
      },
      error: (response) => {
        this.error = response.error?.error ?? 'Could not connect to the Node.js API.';
        this.loading = false;
      }
    });
  }
}
