@extends('admin.layout')

@section('title', 'Career Application')

@section('content')
  <div class="grid gap-4 md:grid-cols-3">
    <div class="md:col-span-2 rounded bg-white p-4 shadow">
      <div class="space-y-2 text-sm">
        <div><span class="font-semibold">Name:</span> {{ $application->full_name }}</div>
        <div><span class="font-semibold">Email:</span> {{ $application->email }}</div>
        <div><span class="font-semibold">Phone:</span> {{ $application->phone }}</div>
        <div><span class="font-semibold">Location:</span> {{ $application->location }}</div>
        <div><span class="font-semibold">Role:</span> {{ $application->role }}</div>
        <div><span class="font-semibold">Experience:</span> {{ $application->experience }}</div>
        <div><span class="font-semibold">Work Type:</span> {{ $application->work_type }}</div>
        <div><span class="font-semibold">Notice:</span> {{ $application->notice_period }}</div>
        <div><span class="font-semibold">Portfolio:</span> {{ $application->portfolio_url }}</div>
        <div><span class="font-semibold">About:</span> {{ $application->about }}</div>
        <div>
          <span class="font-semibold">Resume:</span>
          @if ($application->resume_path)
            <a class="text-slate-700 underline" href="{{ asset('storage/' . $application->resume_path) }}" target="_blank">Download</a>
          @else
            -
          @endif
        </div>
      </div>
    </div>
    <div class="rounded bg-white p-4 shadow">
      <form method="post" action="{{ route('admin.careers.update', $application) }}" class="space-y-3">
        @csrf
        @method('patch')
        <label class="block text-sm font-medium">Status</label>
        <input class="w-full rounded border px-3 py-2 text-sm" name="status" value="{{ old('status', $application->status) }}">
        <button class="rounded bg-slate-900 px-4 py-2 text-sm text-white" type="submit">Update</button>
      </form>
    </div>
  </div>
@endsection
