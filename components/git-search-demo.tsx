"use client"

import * as React from "react"
import { RepositorySearch, RepositorySearchExample } from "./repository-search"
import { BranchSearch, BranchSearchExample } from "./branch-search"

// Combined component that shows both repository and branch search
export function GitSearchDemo() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Git Search Components</h2>
        <p className="text-gray-600 mb-8">
          These components use the Command UI pattern for searching and selecting repositories and branches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <RepositorySearchExample />
        </div>
        
        <div className="space-y-4">
          <BranchSearchExample />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Features:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Search repositories by name, full name, or description</li>
          <li>• Search branches by name or commit message</li>
          <li>• Visual indicators for private repos, default branches, and protected branches</li>
          <li>• Loading states with skeleton placeholders</li>
          <li>• Keyboard navigation and accessibility</li>
          <li>• Fully customizable styling and behavior</li>
        </ul>
      </div>
    </div>
  )
}

export default GitSearchDemo
