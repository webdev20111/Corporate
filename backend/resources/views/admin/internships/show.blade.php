@extends('admin.layout')

@section('title', 'Internship Details')

@section('content')

<div class="bg-white rounded shadow p-6">

    <table class="w-full text-sm">

        <tr class="border-b">
            <td class="font-semibold py-2 w-56">Full Name</td>
            <td>{{ $internship->full_name }}</td>
        </tr>

        <tr class="border-b">
            <td class="font-semibold py-2">Email</td>
            <td>{{ $internship->email }}</td>
        </tr>

        <tr class="border-b">
            <td class="font-semibold py-2">Phone</td>
            <td>{{ $internship->phone }}</td>
        </tr>

        <tr class="border-b">
            <td class="font-semibold py-2">College</td>
            <td>{{ $internship->college }}</td>
        </tr>

        <tr class="border-b">
            <td class="font-semibold py-2">Department</td>
            <td>{{ $internship->department }}</td>
        </tr>

        <tr class="border-b">
            <td class="font-semibold py-2">Year Of Study</td>
            <td>{{ $internship->year_of_study }}</td>
        </tr>

        <tr class="border-b">
            <td class="font-semibold py-2">Duration</td>
            <td>{{ $internship->duration }}</td>
        </tr>

        <tr class="border-b">
            <td class="font-semibold py-2">Start Date</td>
            <td>{{ $internship->start_date }}</td>
        </tr>

        <tr class="border-b">
            <td class="font-semibold py-2">Status</td>
            <td>{{ $internship->status }}</td>
        </tr>

        <tr class="border-b">
            <td class="font-semibold py-2">Submitted At</td>
            <td>{{ $internship->submitted_at }}</td>
        </tr>

        <tr class="border-b">
            <td class="font-semibold py-2">Message</td>
            <td>{{ $internship->message }}</td>
        </tr>

        <tr>
            <td class="font-semibold py-2">Resume</td>
            <td>
                @if($internship->resume_path)
                    <a href="{{ asset('storage/'.$internship->resume_path) }}"
                       target="_blank"
                       class="text-blue-600 hover:underline">
                        View Resume
                    </a>
                @else
                    No Resume Uploaded
                @endif
            </td>
        </tr>

    </table>

    <div class="mt-6">
        <a href="{{ route('admin.internships.index') }}"
           class="bg-slate-800 text-white px-4 py-2 rounded">
            Back
        </a>
    </div>

</div>

@endsection