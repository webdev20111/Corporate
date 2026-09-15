<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        $root = dirname(__DIR__, 3);
        $files = [
            'index.html',
            'about.html',
            'alliances.html',
            'careers.html',
            'careers-registration.html',
            'contact.html',
            'hms-platforms.html',
            'hrms-solutions.html',
            'industries.html',
            'insights.html',
            'products-platforms.html',
            'research-innovation.html',
            'services.html',
            'software-development.html',
            'support-maintenance.html',
            'web-development.html',
            'best-computer-science-internship.html',
        ];

        foreach ($files as $file) {
            $path = $root . DIRECTORY_SEPARATOR . $file;
            if (!file_exists($path)) {
                continue;
            }

            $html = file_get_contents($path) ?: '';
            $body = $this->extractTag($html, '/<body[^>]*>(.*)<\\/body>/is') ?? $html;
            $slug = pathinfo($file, PATHINFO_FILENAME);
            if ($slug === 'index') {
                $slug = 'home';
            }

            $title = $this->extractTag($html, '/<title>(.*?)<\\/title>/i') ?: ucfirst(str_replace('-', ' ', $slug));
            $description = $this->extractTag($html, '/<meta\\s+name="description"\\s+content="([^"]*)"/i');
            $keywords = $this->extractTag($html, '/<meta\\s+name="keywords"\\s+content="([^"]*)"/i');
            $canonical = $this->extractTag($html, '/<link\\s+rel="canonical"\\s+href="([^"]*)"/i');
            $ogTitle = $this->extractTag($html, '/<meta\\s+property="og:title"\\s+content="([^"]*)"/i');
            $ogDescription = $this->extractTag($html, '/<meta\\s+property="og:description"\\s+content="([^"]*)"/i');

            Page::updateOrCreate(
                ['slug' => $slug],
                [
                    'title' => $title,
                    'meta_title' => $title,
                    'meta_description' => $description,
                    'meta_keywords' => $keywords,
                    'canonical_url' => $canonical,
                    'og_title' => $ogTitle,
                    'og_description' => $ogDescription,
                    'content_html' => $body,
                    'is_active' => true,
                    'published_at' => now(),
                ]
            );
        }
    }

    private function extractTag(string $html, string $pattern): ?string
    {
        if (preg_match($pattern, $html, $matches)) {
            return trim($matches[1]);
        }

        return null;
    }
}
