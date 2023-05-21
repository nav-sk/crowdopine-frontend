export const setRecentPolls = (data) => {
    return {
        type: "SET_POLL_DATA",
        payload: {recentData: data}
    }
}

export const setLivePolls = (data) => {
    return {
        type: "SET_POLL_DATA",
        payload: {liveData: data}
    }
}