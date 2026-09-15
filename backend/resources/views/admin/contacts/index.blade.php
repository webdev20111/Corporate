@extends('admin.layout')

@section('title', 'Contact Inquiries')

@section('content')
  <div class="overflow-hidden rounded bg-white shadow">
    <table class="w-full text-sm">
      <thead class="bg-slate-50 text-left text-slate-600">
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Service</th>
          <th class="px-4 py-2">Status</th>
          <th class="px-4 py-2">Submitted</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        @foreach ($inquiries as $inquiry)
          <tr class="border-t">
            <td class="px-4 py-2">
              <div class="font-medium">{{ $inquiry->full_name }}</div>
              <div class="text-xs text-slate-500">{{ $inquiry->email }}</div>
            </td>
            <td class="px-4 py-2">{{ $inquiry->service_interest }}</td>
            <td class="px-4 py-2">{{ $inquiry->status }}</td>
            <td class="px-4 py-2">{{ optional($inquiry->submitted_at)->format('Y-m-d H:i') }}</td>
            <td class="px-4 py-2">
              <a class="text-slate-700 hover:text-slate-900" href="{{ route('admin.contacts.show', $inquiry) }}">View</a>
            </td>
          </tr>
        @endforeach
      </tbody>
    </table>
  </div>
  <div class="mt-4">{{ $inquiries->links() }}</div>
@endsection
