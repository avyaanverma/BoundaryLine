/**
 * Extract a user-friendly error message from an API error.
 * Distinguishes between connection failures and server errors.
 */
export const getErrorMessage = (error) => {
  // Network error — backend is down or unreachable
  if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
    return "Cannot reach the server. Make sure the backend is running on localhost:5000 and try again.";
  }

  // Timeout
  if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
    return "Server took too long to respond. Please check your connection and try again.";
  }

  // Server returned an error response
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  // HTTP status-based fallbacks
  if (error.response?.status === 400) {
    return "Invalid request. Please check your input.";
  }
  if (error.response?.status === 401) {
    return "Invalid email or password.";
  }
  if (error.response?.status === 403) {
    return "You don't have permission to perform this action.";
  }
  if (error.response?.status === 404) {
    return "The requested resource was not found.";
  }
  if (error.response?.status === 409) {
    return "This account already exists. Try logging in instead.";
  }
  if (error.response?.status === 429) {
    return "Too many requests. Please wait a moment and try again.";
  }
  if (error.response?.status >= 500) {
    return "Server error. Please try again later.";
  }

  // Generic fallback
  return error.message || "Something went wrong. Please try again.";
};
