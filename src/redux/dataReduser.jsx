import produce from 'immer'
const InitialState = {

    users: [],
    posts: [],
    currentUser: {},

}

export const dataReducer = produce((state, action) => {
    switch (action.type) {

        case "CURRENT_USER":
            state.currentUser = action.payload
            break;
        case "SET_ALL_POSTS":
            state.posts = action.payload
            break;
      
         default:  
            break;

    }
}, InitialState)