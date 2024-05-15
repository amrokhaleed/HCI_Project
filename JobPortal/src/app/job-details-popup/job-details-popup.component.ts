import { Component, Input, Output, EventEmitter, ElementRef,inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsDataService } from '../services/accounts-data.service';
import { ApplyJopDataService } from '../services/apply-jop-data.service';
@Component({
  selector: 'app-job-details-popup',
  templateUrl: './job-details-popup.component.html',
  styleUrls: ['./job-details-popup.component.css']
})
export class JobDetailsPopupComponent {
  @Input() jobDetails: any;
  @Output() closePopupEvent = new EventEmitter();
  accountType = inject(AccountsDataService);
  applyjob = inject(ApplyJopDataService);
  jobDetailsUserType: string = '';
  popupTop: string = '50%';
  popupLeft: string = '50%';
  candidates:any;
  profileEmail:string='';
  constructor(private elRef: ElementRef,private router: Router) { }
  ngOnInit() {
    document.body.classList.add('disable-scroll');
    this.jobDetailsUserType = this.accountType.gettype();
    this.calculatePopupPosition();
    window.addEventListener('scroll', this.calculatePopupPosition.bind(this));
    window.addEventListener('resize', this.calculatePopupPosition.bind(this));
    this.candidates = this.applyjob.getapplicationsByidOfJob(this.jobDetails.id).subscribe(
      (data) => {
        // Handle emitted values/data
        // This function will be called when new data is emitted
        // `data` represents the emitted value
        // You can assign the value to `this.candidates` or perform any other necessary operations
        this.candidates = data;
        console.log(this.candidates);
      }
    );

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
    const queryParams = encodeURIComponent(JSON.stringify(this.jobDetails));
    this.router.navigate(['/job-apply'], { queryParams: { jobDetails: queryParams } });
  }
  toUserPage(email:string) {
    this.router.navigate(['/user-profile'],{ queryParams: { profileEmail: email } });
  }
}
