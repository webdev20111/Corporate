<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PageAdminController extends Controller
{
    public function index(): View
    {
        $pages = Page::query()->orderBy('slug')->get();

        return view('admin.pages.index', compact('pages'));
    }

    public function create(): View
    {
        return view('admin.pages.form', [
            'page' => new Page(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['is_active'] = $request->boolean('is_active');
        $data['content_html'] = $this->appendMedia($request, $data['content_html'] ?? '');
        Page::create($data);

        return redirect()->route('admin.pages.index')
            ->with('status', 'Page created.');
    }

    public function edit(Page $page): View
    {
        return view('admin.pages.form', compact('page'));
    }

    public function update(Request $request, Page $page): RedirectResponse
    {
        $data = $this->validated($request, $page->id);
        $data['is_active'] = $request->boolean('is_active');
        $data['content_html'] = $this->appendMedia($request, $data['content_html'] ?? '');
        $page->update($data);

        return redirect()->route('admin.pages.index')
            ->with('status', 'Page updated.');
    }

    private function validated(Request $request, ?int $pageId = null): array
    {
        return $request->validate([
            'slug' => ['required', 'string', 'max:120', 'unique:pages,slug,' . $pageId],
            'title' => ['required', 'string', 'max:160'],
            'meta_title' => ['nullable', 'string', 'max:160'],
            'meta_description' => ['nullable', 'string', 'max:255'],
            'meta_keywords' => ['nullable', 'string', 'max:255'],
            'canonical_url' => ['nullable', 'string', 'max:255'],
            'og_title' => ['nullable', 'string', 'max:160'],
            'og_description' => ['nullable', 'string', 'max:255'],
            'og_image' => ['nullable', 'string', 'max:255'],
            'content_html' => ['nullable', 'string'],
            'is_active' => ['nullable'],
            'published_at' => ['nullable', 'date'],
            'upload_image' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp,gif', 'max:5120'],
            'upload_video' => ['nullable', 'file', 'mimes:mp4,webm,ogg', 'max:51200'],
            'image_url' => ['nullable', 'url', 'max:255'],
            'video_url' => ['nullable', 'url', 'max:255'],
        ]);
    }

    private function appendMedia(Request $request, string $content): string
    {
        $tags = [];

        if ($request->hasFile('upload_image')) {
            $path = $request->file('upload_image')->store('media', 'public');
            $url = asset('storage/' . $path);
            $tags[] = '<img src="' . $url . '" alt="" class="img-fluid">';
        }

        if ($request->hasFile('upload_video')) {
            $path = $request->file('upload_video')->store('media', 'public');
            $url = asset('storage/' . $path);
            $tags[] = '<video controls class="w-100"><source src="' . $url . '"></video>';
        }

        $imageUrl = $request->string('image_url')->toString();
        if ($imageUrl !== '') {
            $tags[] = '<img src="' . e($imageUrl) . '" alt="" class="img-fluid">';
        }

        $videoUrl = $request->string('video_url')->toString();
        if ($videoUrl !== '') {
            $tags[] = '<video controls class="w-100"><source src="' . e($videoUrl) . '"></video>';
        }

        if (count($tags) === 0) {
            return $content;
        }

        return trim($content . "\n" . implode("\n", $tags));
    }
}
