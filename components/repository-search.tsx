"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Check, ChevronsUpDown, GitBranch, Loader2 } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"

interface Repository {
  id: string
  name: string
  fullName: string
  description?: string
  isPrivate: boolean
  updatedAt: string
}

interface RepositorySearchProps {
  onSelect: (repository: Repository) => void
  selectedRepository?: Repository
  repositories?: Repository[]
  loading?: boolean
  placeholder?: string
  emptyText?: string
}

export function RepositorySearch({
  onSelect,
  selectedRepository,
  repositories = [],
  loading = false,
  placeholder = "Search repositories...",
  emptyText = "No repositories found."
}: RepositorySearchProps) {
  const [searchValue, setSearchValue] = useState("")
  const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>([])

  // Filter repositories based on search value
  useEffect(() => {
    if (!searchValue) {
      setFilteredRepositories(repositories)
      return
    }

    const filtered = repositories.filter((repo) =>
      repo.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      repo.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchValue.toLowerCase()))
    )
    setFilteredRepositories(filtered)
  }, [searchValue, repositories])

  const handleSelect = (repository: Repository) => {
    onSelect(repository)
    setSearchValue("")
  }

  if (loading) {
    return (
      <div className="w-full max-w-md">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    )
  }

  return (
    <Command className="w-full max-w-md">
      <CommandInput 
        placeholder={placeholder}
        value={searchValue}
        onValueChange={setSearchValue}
      />
      <CommandList>
        <CommandEmpty>{emptyText}</CommandEmpty>
        <CommandGroup heading="Repositories">
          {filteredRepositories.map((repository) => (
            <CommandItem
              key={repository.id}
              value={repository.fullName}
              onSelect={() => handleSelect(repository)}
              className="flex items-center gap-2 p-2"
            >
              <GitBranch className="h-4 w-4 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate">{repository.name}</span>
                  {repository.isPrivate && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">
                      Private
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground truncate">
                  {repository.fullName}
                </div>
                {repository.description && (
                  <div className="text-xs text-muted-foreground truncate">
                    {repository.description}
                  </div>
                )}
              </div>
              {selectedRepository?.id === repository.id && (
                <Check className="h-4 w-4 shrink-0" />
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

// Example usage component
export function RepositorySearchExample() {
  const [selectedRepo, setSelectedRepo] = useState<Repository | undefined>()
  const [loading, setLoading] = useState(false)

  // Mock data - in real implementation, this would come from an API
  const mockRepositories: Repository[] = [
    {
      id: "1",
      name: "my-awesome-project",
      fullName: "user/my-awesome-project",
      description: "An awesome project that does amazing things",
      isPrivate: false,
      updatedAt: "2024-10-22T10:30:00Z"
    },
    {
      id: "2", 
      name: "secret-project",
      fullName: "user/secret-project",
      description: "Top secret development project",
      isPrivate: true,
      updatedAt: "2024-10-21T15:45:00Z"
    },
    {
      id: "3",
      name: "open-source-lib",
      fullName: "organization/open-source-lib",
      description: "A helpful open source library for developers",
      isPrivate: false,
      updatedAt: "2024-10-20T08:15:00Z"
    }
  ]

  const handleRepositorySelect = (repository: Repository) => {
    setSelectedRepo(repository)
    console.log("Selected repository:", repository)
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Repository Search</h3>
        <RepositorySearch
          onSelect={handleRepositorySelect}
          selectedRepository={selectedRepo}
          repositories={mockRepositories}
          loading={loading}
        />
      </div>
      
      {selectedRepo && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium">Selected Repository:</h4>
          <p className="text-sm text-gray-600">
            {selectedRepo.fullName} - {selectedRepo.description}
          </p>
        </div>
      )}
    </div>
  )
}
