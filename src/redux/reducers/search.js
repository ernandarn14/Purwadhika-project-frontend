const init_state = {
    searchInput: "",
  };
  
  export default (state = init_state, action) => {
    switch (action.type) {
      case "ON_SEARCH_INPUT":
        return { ...state, searchInput: action.payload };
      default:
        return { ...state };
    }
  };