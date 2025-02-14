import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IformDetailes } from '../../core/interfaces/iform-detailes';
import { FormsModule } from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) { }
  private _ToastrService = inject(ToastrService)

  form: IformDetailes = {
    name: '',
    email: '',
    company: '',
    website: '',
    phone: '',
    country: '',
    message: ''
  }
  clearForm() {
    this.form.name = '';
    this.form.email = '';
    this.form.company = '';
    this.form.website = '';
    this.form.phone = '';
    this.form.country = '';
    this.form.message = '';

  }
  submitForm() {
    if (this.form.name && this.form.phone && this.form.country && this.form.email) {
      emailjs.send('service_rndzu0c', 'template_pgua6cr', { ...this.form }, {
        publicKey: 'eZaj--Qdt3Nx_HDQE'
      }).then(() => {
        this._ToastrService.success('Your message has been sent!');
        this.clearForm()

      })
    } else {
      this._ToastrService.info('All fields are required.');
    }





  }
}