<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CMS Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-slate-100 text-slate-900">
    <div class="min-h-screen flex">
      <aside class="w-64 bg-slate-900 text-white p-6">
        <div class="text-lg font-semibold">CMS Admin</div>
        <nav class="mt-6 space-y-2 text-sm">
          <a class="block text-slate-200 hover:text-white" href="{{ route('admin.dashboard') }}">Dashboard</a>
          <a class="block text-slate-200 hover:text-white" href="{{ route('admin.pages.index') }}">Pages</a>
          <a class="block text-slate-200 hover:text-white" href="{{ route('admin.careers.index') }}">Careers</a>
          <a class="block text-slate-200 hover:text-white" href="{{ route('admin.contacts.index') }}">Contacts</a>
        </nav>
      </aside>
      <main class="flex-1 p-8">
        <header class="flex items-center justify-between mb-6">
          <h1 class="text-2xl font-semibold">@yield('title')</h1>
          <form method="post" action="{{ route('logout') }}">
            @csrf
            <button class="text-sm text-slate-600 hover:text-slate-900" type="submit">Logout</button>
          </form>
        </header>
        @if (session('status'))
          <div class="mb-4 rounded bg-emerald-100 text-emerald-800 px-4 py-2 text-sm">
            {{ session('status') }}
          </div>
        @endif
        @yield('content')
      </main>
    </div>
  </body>
</html>
