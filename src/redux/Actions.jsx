export const currentUser = (user) => {
    return { type: "CURRENT_USER", payload: user }
}
export const setAllPosts = (posts) => {
    return { type: "SET_ALL_POSTS", payload: posts }
}
