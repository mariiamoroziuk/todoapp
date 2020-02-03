import * as MODAL from "../constans/modal";

export function openTaskModal(payload){
    return function (dispatch) {
        dispatch({
            type: MODAL.OPEN_TASK_MODAL,
            data: payload,
        });
    };
}

export function openLoginModal(payload){
    return function (dispatch) {
        dispatch({
            type: MODAL.OPEN_LOGIN_MODAL,
            data: payload,
        });
    };
}