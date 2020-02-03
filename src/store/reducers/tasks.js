import * as TASKS from '../constans/tasks';

const initState = {
    loaded:false,
    tasks: [],
    count:0,
};

export default function (state = initState, action) {

    switch (action.type) {

        case TASKS.TASKS_REQUEST_SENT:
            return {
                ...state,
                ...{
                    loaded: false,
                }
            };

        case TASKS.TASKS_FETCH:
            return {
                ...state,
                ...{
                    loaded: true,
                    tasks: action.data.message.tasks,
                    count: action.data.message.total_task_count,
                }
            };

        default:
            return state
    }
}