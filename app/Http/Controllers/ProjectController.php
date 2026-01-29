<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of the projects.
     */
    public function index(Request $request): Response
    {
        $query = Project::query()
            ->where('user_id', $request->user()->id)
            ->search($request->input('search'))
            ->status($request->input('status'))
            ->priority($request->input('priority'))
            ->sorted(
                $request->input('sort_by'),
                $request->input('sort_direction', 'desc')
            );

        $projects = $query->paginate($request->input('per_page', 10))
            ->withQueryString();

        return Inertia::render('projects/index', [
            'projects' => $projects,
            'filters' => [
                'search' => $request->input('search', ''),
                'status' => $request->input('status', ''),
                'priority' => $request->input('priority', ''),
                'sort_by' => $request->input('sort_by', ''),
                'sort_direction' => $request->input('sort_direction', 'desc'),
                'per_page' => (int) $request->input('per_page', 10),
            ],
            'statuses' => [
                ['value' => 'concept', 'label' => 'Concept'],
                ['value' => 'actief', 'label' => 'Actief'],
                ['value' => 'voltooid', 'label' => 'Voltooid'],
                ['value' => 'geannuleerd', 'label' => 'Geannuleerd'],
            ],
            'priorities' => [
                ['value' => 'laag', 'label' => 'Laag'],
                ['value' => 'normaal', 'label' => 'Normaal'],
                ['value' => 'hoog', 'label' => 'Hoog'],
                ['value' => 'urgent', 'label' => 'Urgent'],
            ],
        ]);
    }

    /**
     * Show the form for creating a new project.
     */
    public function create(): Response
    {
        return Inertia::render('projects/create', [
            'statuses' => [
                ['value' => 'concept', 'label' => 'Concept'],
                ['value' => 'actief', 'label' => 'Actief'],
                ['value' => 'voltooid', 'label' => 'Voltooid'],
                ['value' => 'geannuleerd', 'label' => 'Geannuleerd'],
            ],
            'priorities' => [
                ['value' => 'laag', 'label' => 'Laag'],
                ['value' => 'normaal', 'label' => 'Normaal'],
                ['value' => 'hoog', 'label' => 'Hoog'],
                ['value' => 'urgent', 'label' => 'Urgent'],
            ],
        ]);
    }

    /**
     * Store a newly created project in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:concept,actief,voltooid,geannuleerd',
            'priority' => 'required|in:laag,normaal,hoog,urgent',
            'budget' => 'nullable|numeric|min:0',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $request->user()->projects()->create($validated);

        return redirect()->route('projects.index')
            ->with('success', 'Project succesvol aangemaakt.');
    }

    /**
     * Show the form for editing the specified project.
     */
    public function edit(Project $project): Response
    {
        $this->authorize('update', $project);

        return Inertia::render('projects/edit', [
            'project' => $project,
            'statuses' => [
                ['value' => 'concept', 'label' => 'Concept'],
                ['value' => 'actief', 'label' => 'Actief'],
                ['value' => 'voltooid', 'label' => 'Voltooid'],
                ['value' => 'geannuleerd', 'label' => 'Geannuleerd'],
            ],
            'priorities' => [
                ['value' => 'laag', 'label' => 'Laag'],
                ['value' => 'normaal', 'label' => 'Normaal'],
                ['value' => 'hoog', 'label' => 'Hoog'],
                ['value' => 'urgent', 'label' => 'Urgent'],
            ],
        ]);
    }

    /**
     * Update the specified project in storage.
     */
    public function update(Request $request, Project $project): RedirectResponse
    {
        $this->authorize('update', $project);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:concept,actief,voltooid,geannuleerd',
            'priority' => 'required|in:laag,normaal,hoog,urgent',
            'budget' => 'nullable|numeric|min:0',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $project->update($validated);

        return redirect()->route('projects.index')
            ->with('success', 'Project succesvol bijgewerkt.');
    }

    /**
     * Remove the specified project from storage.
     */
    public function destroy(Project $project): RedirectResponse
    {
        $this->authorize('delete', $project);

        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project succesvol verwijderd.');
    }
}
