import * as TASKS from "../constans/tasks";
import TasksAPI from "../../services/tasksAPI";

export function getTasks(field, direction, page){
    return function (dispatch) {
        dispatch({
            type: TASKS.TASKS_REQUEST_SENT
        });
        (new TasksAPI()).getTasks(field, direction, page).then(res => {
            return dispatch({
                type: TASKS.TASKS_FETCH,
                data: res
            });
        });
    };
}

