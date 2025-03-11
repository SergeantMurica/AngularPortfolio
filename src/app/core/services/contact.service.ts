import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) {}

  sendEmail(name: string, email: string, message: string): Observable<any> {
    const data = {
      service_id: environment.emailjs.serviceId,
      template_id: environment.emailjs.templateId,
      user_id: environment.emailjs.publicKey,
      template_params: {
        from_name: name,
        from_email: email,
        to_name: "Alexander Castro",
        message: message
      }
    };

    return this.http.post('https://api.emailjs.com/api/v1.0/email/send', data);
  }

  downloadCV(): void {
    const pdfUrl = "/AlexanderCastroCV.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "AlexanderCastroCV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
