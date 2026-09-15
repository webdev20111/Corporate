@extends('admin.layout')

@section('title', 'Career Applications')

@section('content')
  <div class="overflow-hidden rounded bg-white shadow">
    <table class="w-full text-sm">
      <thead class="bg-slate-50 text-left text-slate-600">
        <tr>
          <th class="px-4 py-2">Candidate</th>
          <th class="px-4 py-2">Role</th>
          <th class="px-4 py-2">Status</th>
          <th class="px-4 py-2">Submitted</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        @foreach ($applications as $application)
          <tr class="border-t">
            <td class="px-4 py-2">
              <div class="font-medium">{{ $application->full_name }}</div>
              <div class="text-xs text-slate-500">{{ $application->email }}</div>
            </td>
            <td class="px-4 py-2">{{ $application->role }}</td>
            <td class="px-4 py-2">{{ $application->status }}</td>
            <td class="px-4 py-2">{{ optional($application->submitted_at)->format('Y-m-d H:i') }}</td>
            <td class="px-4 py-2">
              <a class="text-slate-700 hover:text-slate-900" href="{{ route('admin.careers.show', $application) }}">View</a>
            </td>
          </tr>
        @endforeach
      </tbody>
    </table>
  </div>
  <div class="mt-4">{{ $applications->links() }}</div>
@endsection
