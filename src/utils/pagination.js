export const getPagination = (page = 1, limit = 10) => {
  const pageNumber = parseInt(page);
  const pageLimit = parseInt(limit);
  const skip = (pageNumber - 1) * pageLimit;

  return {
    skip,
    pageLimit
  }
};