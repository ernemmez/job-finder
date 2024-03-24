export const clearSearchParams = () => {
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url);
};