
const getErrorMessage = (
  error,
  fallback = 'Something went wrong. Please try again.'
) => {
  if (!error) {
    return fallback;
  }

  const data = error.data || error.response?.data;

  if (typeof data === 'string' && data.trim()) {
    return data;
  }

  if (data?.status_message) {
    return data.status_message;
  }

  if (Array.isArray(data?.errors) && data.errors[0]) {
    return data.errors[0];
  }

  if (error.message && error.message !== 'Network Error') {
    return error.message;
  }

  if (error.status) {
    return `Request failed (${error.status}). ${fallback}`;
  }

  return fallback;
};

const isAbortError = error => (
  error?.name === 'AbortError'
  || error?.code === 'ABORT_ERR'
  || error?.message === 'The user aborted a request.'
);

export {
  isAbortError
};

export default getErrorMessage;
