const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';

const initialState = {
    show: false,
    text: {
        200: 'form submitted successfully',
        400: 'server error, try again later',
        422: 'validation error, try again'
    },
    status: 0
}

export default function modal(state = initialState, action) {
    switch( action.type ) {
        case SHOW_MODAL: {
            return {
                ...state,
                show: true,
                status: action.payload
            }
        }
        case HIDE_MODAL: {
            return {
                ...state,
                show: false,
                status: 0
            }
        }
        default:
            return state;
    }
}

export function showModal(status) {
    return {
        type: SHOW_MODAL,
        payload: status
    }
}

export function hideModal(status) {
    return {
        type: HIDE_MODAL,
        payload: status
    }
}

