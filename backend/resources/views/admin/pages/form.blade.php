@extends('admin.layout')

@section('title', $page->exists ? 'Edit Page' : 'New Page')

@section('content')
  <form class="space-y-4" method="post" enctype="multipart/form-data" action="{{ $page->exists ? route('admin.pages.update', $page) : route('admin.pages.store') }}">
    @csrf
    @if ($page->exists)
      @method('put')
    @endif
    <div class="grid gap-4 md:grid-cols-2">
      <div>
        <label class="block text-sm font-medium">Slug</label>
        <input class="mt-1 w-full rounded border px-3 py-2" name="slug" value="{{ old('slug', $page->slug) }}" required>
      </div>
      <div>
        <label class="block text-sm font-medium">Title</label>
        <input class="mt-1 w-full rounded border px-3 py-2" name="title" value="{{ old('title', $page->title) }}" required>
      </div>
      <div>
        <label class="block text-sm font-medium">Meta Title</label>
        <input class="mt-1 w-full rounded border px-3 py-2" name="meta_title" value="{{ old('meta_title', $page->meta_title) }}">
      </div>
      <div>
        <label class="block text-sm font-medium">Canonical URL</label>
        <input class="mt-1 w-full rounded border px-3 py-2" name="canonical_url" value="{{ old('canonical_url', $page->canonical_url) }}">
      </div>
      <div>
        <label class="block text-sm font-medium">Meta Description</label>
        <textarea class="mt-1 w-full rounded border px-3 py-2" name="meta_description" rows="2">{{ old('meta_description', $page->meta_description) }}</textarea>
      </div>
      <div>
        <label class="block text-sm font-medium">Meta Keywords</label>
        <textarea class="mt-1 w-full rounded border px-3 py-2" name="meta_keywords" rows="2">{{ old('meta_keywords', $page->meta_keywords) }}</textarea>
      </div>
      <div>
        <label class="block text-sm font-medium">OG Title</label>
        <input class="mt-1 w-full rounded border px-3 py-2" name="og_title" value="{{ old('og_title', $page->og_title) }}">
      </div>
      <div>
        <label class="block text-sm font-medium">OG Image URL</label>
        <input class="mt-1 w-full rounded border px-3 py-2" name="og_image" value="{{ old('og_image', $page->og_image) }}">
      </div>
      <div class="md:col-span-2">
        <label class="block text-sm font-medium">OG Description</label>
        <textarea class="mt-1 w-full rounded border px-3 py-2" name="og_description" rows="2">{{ old('og_description', $page->og_description) }}</textarea>
      </div>
      <div>
        <label class="block text-sm font-medium">Published At</label>
        <input class="mt-1 w-full rounded border px-3 py-2" type="datetime-local" name="published_at" value="{{ old('published_at', $page->published_at ? $page->published_at->format('Y-m-d\\TH:i') : '') }}">
      </div>
      <div class="flex items-center gap-2 pt-6">
        <input id="is_active" type="checkbox" class="rounded border" name="is_active" value="1" {{ old('is_active', $page->is_active) ? 'checked' : '' }}>
        <label for="is_active" class="text-sm">Active</label>
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium">Content HTML</label>
      <textarea class="mt-1 w-full rounded border px-3 py-2 font-mono text-xs" name="content_html" rows="12">{{ old('content_html', $page->content_html) }}</textarea>
    </div>
    <div class="grid gap-4 md:grid-cols-2">
      <div>
        <label class="block text-sm font-medium">Upload image</label>
        <input class="mt-1 w-full rounded border px-3 py-2 text-sm" type="file" name="upload_image" accept="image/*">
        <p class="text-xs text-slate-500 mt-1">Image will be appended to content.</p>
      </div>
      <div>
        <label class="block text-sm font-medium">Upload video</label>
        <input class="mt-1 w-full rounded border px-3 py-2 text-sm" type="file" name="upload_video" accept="video/*">
        <p class="text-xs text-slate-500 mt-1">Video will be appended to content.</p>
      </div>
    </div>
    <button class="rounded bg-slate-900 px-4 py-2 text-sm text-white" type="submit">Save</button>
  </form>
@endsection
