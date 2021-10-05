import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // mock simulation of the load view with loading
    if (this.router.url.split('/').filter((x) => x.length > 0).length < 2) {
      setTimeout(() => this.router.navigateByUrl('pokemon')), 200;
    }
  }

  constructor(private readonly router: Router) {}
  title = 'Assignment';
}
