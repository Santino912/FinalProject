export function booleanFilter(search, posts) {
  if (!search && posts.length > 0) {
    return true;
  }
  return false;
}

export function booleanFilterToShort(search) {
  if (!search) return false;
  return true;
}

export function searchBooleanFilter(filters) {
  if (
    !filters?.name &&
    !filters?.type &&
    filters?.genres.length <= 0 &&
    !filters?.order
  ) {
    return true;
  }
  return false;
}
