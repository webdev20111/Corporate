<!DOCTYPE html>
<html>
<head>
    <title>Application Received</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #0b0b0c;">Thank You for Reaching Out!</h2>
    <p>Dear {{ $formData['full_name'] ?? 'Applicant' }},</p>
    <p>We have successfully received your submission. Our team is currently reviewing the details, and we will get back to you as soon as possible.</p>
    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
    <p style="font-size: 0.9em; color: #777;">This is an automated notification from MPS Software.</p>
</body>
</html>
