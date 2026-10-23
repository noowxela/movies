type SearchParams = Record<string, string | string[] | undefined>;

const readParam = (searchParams: SearchParams, key: string) => {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
};

export type {
  SearchParams
};

export {
  readParam
};
