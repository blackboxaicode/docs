# Git Search Components

This project contains React components for searching and selecting Git repositories and branches using the Command UI pattern.

## Components

### RepositorySearch
A searchable command interface for selecting Git repositories with:
- Real-time search by name, full name, or description
- Visual indicators for private repositories
- Loading states with skeleton placeholders
- Keyboard navigation support

### BranchSearch  
A searchable command interface for selecting Git branches with:
- Search by branch name or commit message
- Visual indicators for default and protected branches
- Last commit information display
- Keyboard navigation support

## Usage

```tsx
import { RepositorySearch } from "@/components/repository-search"
import { BranchSearch } from "@/components/branch-search"

// Repository search
<RepositorySearch
  onSelect={handleRepositorySelect}
  selectedRepository={selectedRepo}
  repositories={repositories}
  loading={loading}
  placeholder="Search repositories..."
  emptyText="No repositories found."
/>

// Branch search
<BranchSearch
  onSelect={handleBranchSelect}
  selectedBranch={selectedBranch}
  branches={branches}
  loading={loading}
  repositoryName="my-repo"
  placeholder="Search branches..."
  emptyText="No branches found."
/>
```

## Features

- **Command UI Pattern**: Uses the modern command palette interface
- **Real-time Search**: Instant filtering as you type
- **Visual Indicators**: Clear badges for private repos, default branches, protected branches
- **Loading States**: Skeleton placeholders during data loading
- **Accessibility**: Full keyboard navigation and screen reader support
- **Customizable**: Configurable placeholders, empty states, and styling
- **TypeScript**: Full type safety with detailed interfaces

## File Structure

```
components/
├── ui/
│   ├── command.tsx          # Base Command UI components
│   ├── dialog.tsx           # Dialog components for Command UI
│   └── skeleton.tsx         # Loading skeleton component
├── repository-search.tsx    # Repository search component
├── branch-search.tsx       # Branch search component
└── git-search-demo.tsx     # Demo page showing both components
```

## Dependencies

- `@radix-ui/react-dialog` - Dialog primitives
- `cmdk` - Command menu for React
- `lucide-react` - Icon library
- `clsx` + `tailwind-merge` - Utility classes
- `tailwindcss` - Styling

## Integration

These components are designed to integrate with:
- GitHub API
- GitLab API
- Bitbucket API
- Any Git provider API

Replace the mock data in the example components with real API calls to your Git provider.
