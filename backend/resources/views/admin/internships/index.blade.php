@extends('admin.layout')

@section('title', 'Internship Applications')

@section('content')

<div class="overflow-hidden rounded bg-white shadow">

    <table class="w-full text-sm">

        <thead class="bg-slate-50 text-left text-slate-600">

            <tr>
                <th class="px-4 py-2">Candidate</th>
                <th class="px-4 py-2">College</th>
                <th class="px-4 py-2">Department</th>
                <th class="px-4 py-2">Status</th>
                <th class="px-4 py-2">Submitted</th>
                <th class="px-4 py-2">Action</th>
            </tr>

        </thead>

        <tbody>

            @forelse($internships as $internship)

            <tr class="border-t">

                <td class="px-4 py-2">
                    <div class="font-medium">
                        {{ $internship->full_name }}
                    </div>

                    <div class="text-xs text-slate-500">
                        {{ $internship->email }}
                    </div>
                </td>

                <td class="px-4 py-2">
                    {{ $internship->college }}
                </td>

                <td class="px-4 py-2">
                    {{ $internship->department }}
                </td>

                <td class="px-4 py-2">
                    {{ $internship->status }}
                </td>

                <td class="px-4 py-2">
                    {{ optional($internship->submitted_at)->format('Y-m-d H:i') }}
                </td>

                <td class="px-4 py-2">
                    <a
                        href="{{ route('admin.internships.show',$internship->id) }}"
                        class="text-blue-600 hover:underline">
                        View
                    </a>
                </td>

            </tr>

            @empty

            <tr>

                <td colspan="6" class="text-center py-5">
                    No Internship Applications Found
                </td>

            </tr>

            @endforelse

        </tbody>

    </table>

</div>

@endsection