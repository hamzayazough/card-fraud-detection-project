import { Component } from '@angular/core';
import { CardInfo } from '../../card-info.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { CardInfoService } from '../../services/card-info.service';
@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.css'
})
export class ValidationComponent {
  cardInfo: CardInfo = {} as CardInfo;
  errorMessages: string[] = [];
  showErrorPopup = false;
  showLoadingPopup = false;
  showSuccessPopup = false;

  count = 0;

  constructor(private cardInforService: CardInfoService) {}

  verifyCard() {
    this.errorMessages = [];
    this.showErrorPopup = false;
    console.log('Card Info:', this.cardInfo);
    if (!this.cardInfo.creditCardNumber) {
      this.errorMessages.push('Credit Card Number is required.');
    } else if (!/^\d{16}$/.test(this.cardInfo.creditCardNumber)) {
      this.errorMessages.push('Credit Card Number must be 16 digits.');
    }

    if (!this.cardInfo.cardHolder) {
      this.errorMessages.push('Card Holder name is required.');
    } else if (!/^[a-zA-Z\s]+$/.test(this.cardInfo.cardHolder)) {
      this.errorMessages.push('Card Holder name can only contain letters and spaces.');
    }

    if (!this.cardInfo.expirationDate) {
      this.errorMessages.push('Expiration Date is required.');
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(this.cardInfo.expirationDate)) {
      this.errorMessages.push('Expiration Date must be in MM/YY format.');
    }

    if (!this.cardInfo.ccv) {
      this.errorMessages.push('CCV is required.');
    } else if (!/^\d{3}$/.test(this.cardInfo.ccv)) {
      this.errorMessages.push('CCV must be a 3-digit number.');
    }
    console.log('Errors:', this.errorMessages);
    if (this.errorMessages.length > 0) {
      this.showErrorPopup = true;
    } else {
      this.showLoadingPopup = true;

      this.startCountdown();

      setTimeout(() => {
        this.showLoadingPopup = false;

        this.cardInforService.saveCardInfo(this.cardInfo).subscribe({
          next: (response: any) => {
            console.log('Card info saved:', response);
            this.showSuccessPopup = true;
          },
          error: (error: any) => {
            console.error('Error saving card info:', error);
            alert('An error occurred while saving the card info.');
          },
        });
      }, 5000);
    }
  }

  startCountdown() {
    const totalDuration = 5000;
    const targetCount = 4369;
    const interval = 50;
    const increment = targetCount / (totalDuration / interval);

    const intervalId = setInterval(() => {
      this.count += increment;
      if (this.count >= targetCount) {
        this.count = targetCount;
        clearInterval(intervalId);
      }
    }, interval);
  }

  closeErrorPopup() {
    this.showErrorPopup = false;
  }

  closeSuccessPopup() {
    this.showSuccessPopup = false;
  }

}
