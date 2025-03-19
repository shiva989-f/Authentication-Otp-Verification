export const VERIFICATION_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html>

    <head>
        <title>OTP Verification</title>
    </head>

    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
            style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td align="center">
                    <table role="presentation" width="100%" max-width="600px" cellspacing="0" cellpadding="0" border="0"
                        style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                        <tr>
                            <td align="center"
                                style="padding: 20px; background-color: #007bff; border-radius: 8px 8px 0 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                                OTP Verification
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="padding: 20px; font-size: 16px; color: #333333;">
                                <p>Hello,</p>
                                <p>Your One-Time Password (OTP) for verification is:</p>
                                <p style="font-size: 24px; font-weight: bold; text-align: center; color: #007bff;">
                                    123456</p>
                                <p>Please enter this OTP to verify your account. This OTP is valid for 10 minutes.</p>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="padding: 20px; font-size: 14px; color: #555555;">
                                <p>If you didn’t request this, please ignore this email.</p>
                                <p>Best regards,</p>
                                <p>AI Writerly</p>
                                <p style="text-align: center; font-size: 12px;">This is an automated message, please do not reply to this email</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

</html>`;

export const WELCOME_TEMPLATE = `<!DOCTYPE html>
<html>

    <head>
        <title>Welcome to Our App</title>
    </head>

    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
            style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td align="center">
                    <table role="presentation" width="100%" max-width="600px" cellspacing="0" cellpadding="0" border="0"
                        style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                        <tr>
                            <td align="center"
                                style="padding: 20px; background-color: #007bff; border-radius: 8px 8px 0 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                                Welcome to AI Writerly!
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="padding: 20px; font-size: 16px; color: #333333;">
                                <p>Hello,</p>
                                <p>We're excited to have you on board. Our platform is designed to help you achieve your
                                    goals efficiently.</p>
                                <p>Click the button below to get started:</p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 10px;">
                                <a href="#"
                                    style="background-color: #007bff; color: #ffffff; padding: 12px 24px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 5px; display: inline-block;">Get
                                    Started</a>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="padding: 20px; font-size: 14px; color: #555555;">
                                <p>Need help? Contact our support team anytime.</p>
                                <p>Best regards,</p>
                                <p>AI Writerly</p>
                                <p style="text-align: center; font-size: 12px;">This is an automated message, please do not reply to this email</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

</html>
`;

export const RESET_PASSWORD_TEMPLATE = `<!DOCTYPE html>
<html>

    <head>
        <title>Password Reset</title>
    </head>

    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
            style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td align="center">
                    <table role="presentation" width="100%" max-width="600px" cellspacing="0" cellpadding="0" border="0"
                        style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
                        <tr>
                            <td align="center"
                                style="padding: 20px; background-color: #007bff; border-radius: 8px 8px 0 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                                Password Reset
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="padding: 20px; font-size: 16px; color: #333333;">
                                <p>Hello,</p>
                                <p>We received a request to reset your password. If you didn't make this request, please
                                    ignore this email.</p>
                                <p>To reset your password, click the button below:</p>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 10px;">
                                <a href="{resetURL}"
                                    style="background-color: #007bff; color: #ffffff; padding: 12px 24px; font-size: 16px; font-weight: bold; text-decoration: none; border-radius: 5px; display: inline-block;">Reset
                                    Password</a>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="padding: 20px; font-size: 14px; color: #555555;">
                                <p>This link will expire in 1 hour for security reasons.</p>
                                <p>Best regards,</p>
                                <p>AI Writerly</p>
                                <p style="text-align: center; font-size: 12px;">This is an automated message, please do not reply to this email</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

</html>`;

export const RESET_PASSWORD_SUCCESSFUL_EMAIL = `<!DOCTYPE html>
<html>

    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Successful</title>
    </head>

    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
            style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 5px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <tr>
                <td
                    style="background-color: #007bff; padding: 20px; text-align: center; color: white; font-size: 20px; font-weight: bold;">
                    Password Reset Successful
                </td>
            </tr>
            <tr>
                <td style="padding: 20px; color: #333333; font-size: 16px;">
                    <p>Hello,</p>
                    <p>We're writing to confirm that your password has been successfully reset.</p>
                    <p style="text-align: center;"><img src="https://img.icons8.com/color/48/000000/checked.png"
                            alt="Success Icon" /></p>
                    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
                    <p><strong>For security reasons, we recommend that you:</strong></p>
                    <ul>
                        <li>Use a strong, unique password</li>
                        <li>Avoid using the same password across multiple sites</li>
                    </ul>
                    <p>Thank you for helping us keep your account secure.</p>
                    <p>Best regards,</p>
                    <p><strong>AI Writerly</strong></p>
                    <p style="text-align: center; font-size: 12px;">This is an automated message, please do not reply to this email</p>
                </td>
            </tr>
        </table>
        
    </body>

</html>
`;