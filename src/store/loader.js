const SHOW_LOADER = 'SHOW_LOADER'
const HIDE_LOADER = 'HIDE_LOADER'

const initialState = {
    show: false
};

export default function loader(state = initialState, action) {
    switch( action.type ) {
        case SHOW_LOADER: {
            return {
                ...state,
                show: true
            }
        }
        case HIDE_LOADER: {
            return {
                ...state,
                show: false
            }
        }
        default:
            return state;
    }
}

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}