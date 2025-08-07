/**
 * Global error handler to prevent unhandled promise rejections from showing error dialogs
 */

// Suppress unhandled promise rejection dialogs for network errors
window.addEventListener('unhandledrejection', (event) => {
  const error = event.reason;
  
  // Check if this is a network-related error that we want to suppress
  if (error && (
    error.message?.includes('fetch') ||
    error.message?.includes('Failed to fetch') ||
    error.message?.includes('NetworkError') ||
    error.message?.includes('CORS') ||
    error.name === 'TypeError' ||
    String(error).includes('TypeError: Failed to fetch') ||
    String(error).includes('fetch')
  )) {
    console.warn('Network error suppressed:', error.message || String(error));
    event.preventDefault(); // Prevent the error dialog from showing
    event.stopPropagation(); // Stop the event from bubbling
    event.stopImmediatePropagation(); // Stop all other handlers
    return false;
  }
  
  // Let other types of errors show normally
  console.error('Unhandled promise rejection:', error);
});

// Also suppress error events
window.addEventListener('error', (event) => {
  if (event.message?.includes('Failed to fetch') || event.message?.includes('fetch')) {
    console.warn('Error event suppressed:', event.message);
    event.preventDefault();
    return false;
  }
});

export {}; // Make this a module