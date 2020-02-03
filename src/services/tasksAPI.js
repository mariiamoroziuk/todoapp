import axios from 'axios'

export default class Tasks  {
    constructor() {
        this.url = 'https://uxcandy.com/~shapoval/test-task-backend/v2';
    }

    getTasks(field, direction, page) {

        return axios.get(`${this.url}?developer=mariia&sort_direction=${direction}&sort_field=${field}&page=${page}`)
            .then(res => res.data)
    }

    addTask(data) {
        return axios.post(
            `${this.url}/create?developer=mariia`,
            data,
        )
            .then(res => res.data);
    }

    updateTask(data, id){
        return axios.post(
            `${this.url}/edit/${id}?developer=mariia`,
            data,
        )
            .then(res => res.data);
    }

}