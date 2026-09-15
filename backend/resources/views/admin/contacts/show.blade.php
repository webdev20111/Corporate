@extends('admin.layout')

@section('title', 'Contact Inquiry')

@section('content')
  <div class="grid gap-4 md:grid-cols-3">
    <div class="md:col-span-2 rounded bg-white p-4 shadow">
      <div class="space-y-2 text-sm">
        <div><span class="font-semibold">Name:</span> {{ $inquiry->full_name }}</div>
        <div><span class="font-semibold">Email:</span> {{ $inquiry->email }}</div>
        <div><span class="font-semibold">Phone:</span> {{ $inquiry->phone }}</div>
        <div><span class="font-semibold">Company:</span> {{ $inquiry->company }}</div>
        <div><span class="font-semibold">Service:</span> {{ $inquiry->service_interest }}</div>
        <div><span class="font-semibold">Budget:</span> {{ $inquiry->budget_range }}</div>
        <div><span class="font-semibold">Message:</span> {{ $inquiry->message }}</div>
      </div>
    </div>
    <div class="rounded bg-white p-4 shadow">
      <form method="post" action="{{ route('admin.contacts.update', $inquiry) }}" class="space-y-3">
        @csrf
        @method('patch')
        <label class="block text-sm font-medium">Status</label>
        <input class="w-full rounded border px-3 py-2 text-sm" name="status" value="{{ old('status', $inquiry->status) }}">
        <button class="rounded bg-slate-900 px-4 py-2 text-sm text-white" type="submit">Update</button>
      </form>
    </div>
  </div>
@endsection
