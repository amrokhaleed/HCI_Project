import { Component, Input, Output, EventEmitter, ElementRef,inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsDataService } from '../services/accounts-data.service';
@Component({
  selector: 'app-job-details-popup',
  templateUrl: './job-details-popup.component.html',
  styleUrls: ['./job-details-popup.component.css']
})
export class JobDetailsPopupComponent {
  @Input() jobDetails: any;
  @Output() closePopupEvent = new EventEmitter();
  accountType = inject(AccountsDataService);
  jobDetailsUserType: string = '';
  popupTop: string = '50%';
  popupLeft: string = '50%';

  constructor(private elRef: ElementRef,private router: Router) { }

  ngOnInit() {
    document.body.classList.add('disable-scroll');
    this.jobDetailsUserType = this.accountType.gettype(); 
    this.calculatePopupPosition();
    window.addEventListener('scroll', this.calculatePopupPosition.bind(this));
    window.addEventListener('resize', this.calculatePopupPosition.bind(this));
  }

  ngOnDestroy() {
    document.body.classList.remove('disable-scroll');
    window.removeEventListener('scroll', this.calculatePopupPosition.bind(this));
    window.removeEventListener('resize', this.calculatePopupPosition.bind(this));
  }

  calculatePopupPosition() {
    const popupElement = this.elRef.nativeElement.querySelector('.popup');
    if (popupElement) {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const popupHeight = popupElement.offsetHeight;
      const popupWidth = popupElement.offsetWidth;

      this.popupTop = `${(viewportHeight - popupHeight) / 2}px`;
      this.popupLeft = `${(viewportWidth - popupWidth) / 2}px`;
    }
  }
  closePopup() {
    this.closePopupEvent.emit();
  }

  onApply() {
    this.router.navigate(['/job-apply'])
  }
}
