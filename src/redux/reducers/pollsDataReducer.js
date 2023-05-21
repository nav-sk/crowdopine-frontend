const initialState = {
    liveData: null,
    recentData: null
}

export const pollsDataReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case "SET_POLL_DATA":
            return {...state, ...payload}
        default:
            return {...state};
    }
}