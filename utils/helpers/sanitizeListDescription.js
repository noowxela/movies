
const MAX_LIST_DESCRIPTION_LENGTH = 1000;

const sanitizeListDescription = description => {
  const trimmed = String(description || '').trim();

  if (!trimmed) {
    return 'No description';
  }

  return trimmed.slice(0, MAX_LIST_DESCRIPTION_LENGTH);
};

export default sanitizeListDescription;
