"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Check, GitBranch, Loader2 } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"

interface Branch {
  id: string
  name: string
  isDefault: boolean
  isProtected: boolean
  lastCommit?: {
    message: string
    author: string
    date: string
  }
}

interface BranchSearchProps {
  onSelect: (branch: Branch) => void
  selectedBranch?: Branch
  branches?: Branch[]
  loading?: boolean
  placeholder?: string
  emptyText?: string
  repositoryName?: string
}

export function BranchSearch({
  onSelect,
  selectedBranch,
  branches = [],
  loading = false,
  placeholder = "Search branches...",
  emptyText = "No branches found.",
  repositoryName
}: BranchSearchProps) {
  const [searchValue, setSearchValue] = useState("")
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([])

  // Filter branches based on search value
  useEffect(() => {
    if (!searchValue) {
      setFilteredBranches(branches)
      return
    }

    const filtered = branches.filter((branch) =>
      branch.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      (branch.lastCommit?.message && 
        branch.lastCommit.message.toLowerCase().includes(searchValue.toLowerCase()))
    )
    setFilteredBranches(filtered)
  }, [searchValue, branches])

  const handleSelect = (branch: Branch) => {
    onSelect(branch)
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
        <CommandGroup heading={repositoryName ? `Branches in ${repositoryName}` : "Branches"}>
          {filteredBranches.map((branch) => (
            <CommandItem
              key={branch.id}
              value={branch.name}
              onSelect={() => handleSelect(branch)}
              className="flex items-center gap-2 p-2"
            >
              <GitBranch className="h-4 w-4 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate">{branch.name}</span>
                  <div className="flex gap-1">
                    {branch.isDefault && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                        Default
                      </span>
                    )}
                    {branch.isProtected && (
                      <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
                        Protected
                      </span>
                    )}
                  </div>
                </div>
                {branch.lastCommit && (
                  <div className="text-xs text-muted-foreground truncate">
                    {branch.lastCommit.message} • by {branch.lastCommit.author}
                  </div>
                )}
              </div>
              {selectedBranch?.id === branch.id && (
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
export function BranchSearchExample() {
  const [selectedBranch, setSelectedBranch] = useState<Branch | undefined>()
  const [loading, setLoading] = useState(false)

  // Mock data - in real implementation, this would come from an API
  const mockBranches: Branch[] = [
    {
      id: "1",
      name: "main",
      isDefault: true,
      isProtected: true,
      lastCommit: {
        message: "Add user authentication feature",
        author: "john.doe",
        date: "2024-10-22T10:30:00Z"
      }
    },
    {
      id: "2", 
      name: "feature/user-profile",
      isDefault: false,
      isProtected: false,
      lastCommit: {
        message: "Implement profile page layout",
        author: "jane.smith",
        date: "2024-10-21T15:45:00Z"
      }
    },
    {
      id: "3",
      name: "develop",
      isDefault: false,
      isProtected: true,
      lastCommit: {
        message: "Merge pull request #123",
        author: "alice.johnson",
        date: "2024-10-20T08:15:00Z"
      }
    },
    {
      id: "4",
      name: "hotfix/security-patch",
      isDefault: false,
      isProtected: false,
      lastCommit: {
        message: "Fix security vulnerability in auth",
        author: "security.team",
        date: "2024-10-19T12:00:00Z"
      }
    }
  ]

  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch)
    console.log("Selected branch:", branch)
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Branch Search</h3>
        <BranchSearch
          onSelect={handleBranchSelect}
          selectedBranch={selectedBranch}
          branches={mockBranches}
          loading={loading}
          repositoryName="my-awesome-project"
        />
      </div>
      
      {selectedBranch && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium">Selected Branch:</h4>
          <p className="text-sm text-gray-600">
            {selectedBranch.name}
            {selectedBranch.isDefault && " (Default)"}
            {selectedBranch.isProtected && " (Protected)"}
          </p>
          {selectedBranch.lastCommit && (
            <p className="text-xs text-gray-500">
              Last commit: {selectedBranch.lastCommit.message}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
