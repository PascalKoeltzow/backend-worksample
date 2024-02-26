export const getSortDirection = (created: string): string | null => {
    const validSortDirections = ['asc', 'desc'];
    return validSortDirections.includes(created.toLowerCase()) ? created.toLowerCase() : null;
};