import {
  ComponentFactory,
  ComponentFactoryResolver, ComponentRef,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';

/**
 * A directive that creates a spinning button when a spin flag is set.
 * The leaves directive keeps width and hight of the button, kidy running spinner, min width is set to 130px
 */
@Directive({
  selector: '[appSpinning]',
})
export class SpinnButtonDirective implements OnInit {
  _spinning: boolean;
  /**
   * Spinner dot color, default black
   * @type {string}
   */
  @Input() dotColor = '#ffffff';
  /**
   * Spinner dot count, from 3 - 8;
   * @type {number}
   */
  @Input() dotCount = 8;
  @Input()
  set appSpinning(spinningValue) {
    this._spinning = spinningValue;
    this.changeState();
  }

  get spinning() {
    return this._spinning;
  }

  private readonly factory: ComponentFactory<any>;
  private componentRef: ComponentRef<any>;
  private initialHeight: string | number;
  private initialWidth: string | number;
  private initialContent: any;
  private button: HTMLButtonElement;
  private ready;

  constructor(
    private elementRef: ElementRef,
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2,
  ) {
    this.factory = this.componentFactoryResolver.resolveComponentFactory(SpinnerComponent);
  }

  ngOnInit(): void {
    this.setWrapperButtonStyle();
    this.ready = true;
  }

  private setWrapperButtonStyle() {
    this.button = this.renderer.parentNode(this.elementRef.nativeElement);
    this.initialContent = this.elementRef.nativeElement.innerHTML;
    this.initialHeight = this.button.offsetHeight;
    this.initialWidth = this.button.offsetWidth;
    if (this.initialWidth < 130) {
      this.initialWidth = 130;
    }
    this.renderer.setStyle(this.button, 'min-width', `${this.initialWidth}px`);
    this.renderer.setStyle(this.button, 'min-height', `${this.initialHeight}px`);
  }

  private changeState(): void {
    if (!this.ready) {
      return;
    }
    this.viewContainer.clear();
    if (this.spinning) {
      this.componentRef = this.viewContainer.createComponent(this.factory);
      this.componentRef.instance.dotColor = this.dotColor;
      this.componentRef.instance.dotCount = this.dotCount;
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.button, 'min-height', this.initialHeight);
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'initial');
      this.elementRef.nativeElement.innerHTML = this.initialContent;
    }
  }
}
