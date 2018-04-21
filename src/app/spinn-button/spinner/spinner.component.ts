import {Component, OnInit, Input, Sanitizer} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {log} from 'util';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  count: Array<any>;
  public color: any;
  @Input() dotColor;
  @Input() set dotCount(count) {
    this.count = Array(count);
  }
  constructor(private sanitizer: DomSanitizer) {


}

  ngOnInit() {
    console.log('[SpinnerComponent/ngOnInit] ', this.color);
    this.color = this.sanitizer.bypassSecurityTrustStyle(this.dotColor);

  }
}
