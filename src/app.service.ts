import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Innogram</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
                background-color: #f5f5f5;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            h1 {
                color: #2c3e50;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #3498db;
                margin-bottom: 20px;
            }
              .author {
                color: #7f8c8d;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">Innogram</div>
            <h1>Welcome to Innogram API!</h1>
            <p>Explore the API endpoints that are working on NestJS, ExpressJS, PostgreSQL, MongoDB</p>
            <p class="author">Powered by Uladzimir Rubakhin</p>
        </div>
    </body>
    </html>
  `;
  }
}
