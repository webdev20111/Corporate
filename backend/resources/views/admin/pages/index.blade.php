@extends('admin.layout')

@section('title', 'Pages')

@section('content')
  <div class="mb-4">
    <a class="rounded bg-slate-900 px-3 py-2 text-sm text-white" href="{{ route('admin.pages.create') }}">New Page</a>
  </div>
  <div class="overflow-hidden rounded bg-white shadow">
    <table class="w-full text-sm">
      <thead class="bg-slate-50 text-left text-slate-600">
        <tr>
          <th class="px-4 py-2">Slug</th>
          <th class="px-4 py-2">Title</th>
          <th class="px-4 py-2">Status</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        @foreach ($pages as $page)
          <tr class="border-t">
            <td class="px-4 py-2">{{ $page->slug }}</td>
            <td class="px-4 py-2">{{ $page->title }}</td>
            <td class="px-4 py-2">{{ $page->is_active ? 'Active' : 'Draft' }}</td>
            <td class="px-4 py-2">
              <a class="text-slate-700 hover:text-slate-900" href="{{ route('admin.pages.edit', $page) }}">Edit</a>
            </td>
          </tr>
        @endforeach
      </tbody>
    </table>
  </div>
@endsection
