const initialState = {
    user: null
}

export const userProfileReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case "SET_USER_DATA":
            return {...state, user:payload}
        default:
            return {...state};
    }
}