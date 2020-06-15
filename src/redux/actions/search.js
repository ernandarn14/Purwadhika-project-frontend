export const navbarSearchHandler = (e) => {
    const { value } = e.target;

    return {
        type: "ON_SEARCH_INPUT",
        payload: value,
    };
    
};