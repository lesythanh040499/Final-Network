import {MESS_TYPES} from '../Action/messageAction'

const initialState = {
    users: [],
    resultUser : 0,
    data : [],
    resultData: 0,
    firstLoad: false
}

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MESS_TYPES.ADD_USER:
            return {
                ...state,
                users: [action.payload, ...state.users]
            };
        default:
            return state;
    }
}

export default messageReducer;