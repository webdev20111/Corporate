<!DOCTYPE html>
<html>
<head>
    <title>New Submission Notification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #0b0b0c;">New {{ $subjectType ?? 'Submission' }} Received</h2>
    <p>A new form entry has been submitted. Details are below:</p>
    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        @foreach($formData as $key => $value)
            @if(!is_object($value) && !is_array($value))
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background: #f9f9f9; width: 30%;">{{ ucwords(str_replace('_', ' ', $key)) }}</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">{{ $value }}</td>
                </tr>
            @endif
        @endforeach
    </table>
    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
    <p style="font-size: 0.9em; color: #777;">MPS Software Administration Portal</p>
</body>
</html>
