import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendemailService {

  constructor() { }

  sendEmail(mail: String) {
    try {
      const response = fetch("https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send", {
        method: 'POST',
        headers: {
          'X-RapidAPI-Key': '010476f643msha15ff586936f4f0p1eeccdjsne4d90f359c5d',
          'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [
                {
                  email: mail
                }
              ],
              subject: 'Cambio de contraseña'
            }
          ],
          from: {
            email: 'PasswordRecover@Registrapp.com'
          },
          content: [
            {
              type: 'text/plain',
              value: 'Su contraseña es 123456'
            }
          ]
        })
      });
    } catch (err) {
      console.error(err);
    }
  }



}
