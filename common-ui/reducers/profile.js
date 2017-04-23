export default function (state = [], action) {
    switch (action.type) {
        case 'ADD_PERSONAL_INFO':
            return action.payload;
            break;
    }
    return state;
}
