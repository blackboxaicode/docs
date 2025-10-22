// This is a hack to work around the global navbar configuration limitation
// It updates the navbar button href based on the current page path so that we can have a page level or a goroup level control on the navbar button href



// Configuration object mapping paths to their corresponding href URLs
const PATH_HREF_CONFIG = {
  '/features/vscode-agent/': 'https://marketplace.visualstudio.com/items?itemName=Blackboxapp.blackbox',
  '/features/blackbox-cloud': 'https://cloud.blackbox.ai/',
  '/features/robocoder': 'https://build.blackbox.ai/'
  // Add more path-to-href mappings here as needed
  // Example: '/features/another-path': 'https://example.com',
};

// Default href to use when no path matches
const DEFAULT_HREF = 'https://www.blackbox.ai';

// Function to update navbar button href based on current page
function updateNavbarButtonText() {
  const currentPath = window.location.pathname;  
  // Target the anchor tag inside the topbar-cta-button
  const navbarButtonLink = document.querySelector('#topbar-cta-button a');
  
  // console.log('Current Path:', currentPath);
  
  if (navbarButtonLink) {
    // Find matching href from configuration
    let targetHref = DEFAULT_HREF;
    
    // Check each configured path to find a match
    for (const [path, href] of Object.entries(PATH_HREF_CONFIG)) {
      if (currentPath.startsWith(path)) {
        targetHref = href;
        break;
      }
    }
    
    // Update the href
    navbarButtonLink.href = targetHref;
  }
}

// Run on initial load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateNavbarButtonText);
} else {
  updateNavbarButtonText();
}

// Watch for navigation changes (for SPA behavior)
let lastPath = window.location.pathname;

// Use MutationObserver to detect DOM changes that indicate navigation
const observer = new MutationObserver(() => {
  if (lastPath !== window.location.pathname) {
    lastPath = window.location.pathname;
    // Small delay to ensure DOM is updated
    setTimeout(updateNavbarButtonText, 100);
  }
});

// Start observing when DOM is ready
if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

// Also listen for popstate (browser back/forward)
window.addEventListener('popstate', updateNavbarButtonText);

// Listen for pushstate/replacestate (programmatic navigation)
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function() {
  originalPushState.apply(this, arguments);
  setTimeout(updateNavbarButtonText, 100);
};

history.replaceState = function() {
  originalReplaceState.apply(this, arguments);
  setTimeout(updateNavbarButtonText, 100);
};
