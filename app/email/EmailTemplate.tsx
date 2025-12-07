export const NGO_Registration_Template = (ngoName: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NGO Registration Successful</title>
  <style>
    :root {
      --gradient-secondary: linear-gradient(135deg, hsl(25 95% 60%) 0%, hsl(25 85% 50%) 100%);
      --secondary-foreground: #ffffff;
      --background: #f4f4f4;
      --card-bg: #ffffff;
      --text-muted: #777777;
    }

    body {
      font-family: 'Arial', sans-serif;
      background-color: var(--background);
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 500px;
      margin: 50px auto;
      background: var(--card-bg);
      padding: 40px 30px;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    }

    .header {
      font-size: 28px;
      font-weight: bold;
      background: var(--gradient-secondary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 20px;
    }

    .message {
      font-size: 16px;
      color: #333;
      line-height: 1.6;
    }

    .highlight {
      font-weight: bold;
      color: hsl(25, 95%, 60%);
    }

    .button {
      display: inline-block;
      margin-top: 25px;
      padding: 12px 25px;
      font-size: 16px;
      font-weight: bold;
      color: var(--secondary-foreground);
      background: var(--gradient-secondary);
      border-radius: 8px;
      text-decoration: none;
    }

    .footer {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">NGO Registration Successful</div>
    <p class="message">
      Dear <span class="highlight">${ngoName}</span>,<br>
      Your NGO account has been successfully registered on <strong>Share_Hope</strong>.
    </p>
    <p class="message">
      You can now log in and start creating impactful donation campaigns to help those in need.
    </p>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Share_Hope. All rights reserved.
    </div>
  </div>
</body>
</html>

`;


export const Donor_Donation_Template = (donorName: string, ngoName: string, amount: number) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Donation Confirmation</title>
  <style>
    :root {
      --gradient-secondary: linear-gradient(135deg, hsl(25 95% 60%) 0%, hsl(25 85% 50%) 100%);
      --color-foreground: hsl(220 25% 12%);
      --color-muted-foreground: hsl(220 10% 45%);
      --color-destructive-foreground: hsl(0 0% 100%);
      --card-bg: #ffffff;
      --background: hsl(20 30% 98%);
    }

    body {
      font-family: 'Arial', sans-serif;
      background-color: var(--background);
      margin: 0;
      padding: 0;
      color: var(--color-foreground);
    }

    .container {
      max-width: 500px;
      margin: 40px auto;
      background: var(--card-bg);
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }

    .header {
      font-size: 24px;
      font-weight: bold;
      background: var(--gradient-secondary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 20px;
    }

    .donation-details {
      margin: 20px 0;
      font-size: 18px;
      color: var(--color-foreground);
    }

    .highlight {
      font-weight: bold;
      background: var(--gradient-secondary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .footer {
      font-size: 12px;
      color: var(--color-muted-foreground);
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Donation Confirmation</div>
    <p>Dear <span class="highlight">${donorName}</span>,</p>
    <p>Thank you for your generous donation to <span class="highlight">${ngoName}</span>.</p>
    <div class="donation-details">
      Amount Donated: <strong>₹${amount.toFixed(2)}</strong>
    </div>
    <p>Your support makes a real impact!</p>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Share_Hope
    </div>
  </div>
</body>
</html>
`;
