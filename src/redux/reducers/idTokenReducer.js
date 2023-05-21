const initialState = {
    idToken: ""
}

export const idTokenReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case "SET_IDTOKEN":
            return {state, idToken: payload}
        default:
            return state;
    }
}