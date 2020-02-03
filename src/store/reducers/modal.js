import * as MODAL from "../constans/modal";

const initState = {
    task:false,
    login: false,
};

export default function (state = initState, action) {

    switch (action.type) {

        case MODAL.OPEN_TASK_MODAL:
            return {
                ...state,
                ...{
                    task: action.data,
                }
            };

        case MODAL.OPEN_LOGIN_MODAL:
            return {
                ...state,
                ...{
                    login: action.data,
                }
            };

        default:
            return state
    }
}