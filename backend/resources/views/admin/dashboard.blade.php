@extends('admin.layout')

@section('title', 'Dashboard')

@section('content')

<div class="grid gap-4 md:grid-cols-4">

    <div class="rounded bg-white p-4 shadow">
        <div class="text-sm text-slate-500">Pages</div>
        <div class="text-2xl font-semibold">
            {{ \App\Models\Page::count() }}
        </div>
    </div>

    <div class="rounded bg-white p-4 shadow">
        <div class="text-sm text-slate-500">
            Career Applications
        </div>

        <div class="text-2xl font-semibold">
            {{ \App\Models\CareerApplication::count() }}
        </div>
    </div>

    <div class="rounded bg-white p-4 shadow">
        <div class="text-sm text-slate-500">
            Contact Inquiries
        </div>

        <div class="text-2xl font-semibold">
            {{ \App\Models\ContactInquiry::count() }}
        </div>
    </div>

    <div class="rounded bg-white p-4 shadow">
        <div class="text-sm text-slate-500">
            Internship Applications
        </div>

        <div class="text-2xl font-semibold">
            {{ \App\Models\InternshipApplication::count() }}
        </div>
    </div>

</div>

@endsection
