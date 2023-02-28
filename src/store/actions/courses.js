import { STATUS_COURSES, FETCH_COURSES, WATCH_COURSE, MESSAGE_COURSES } from "../../constants/types/courses";

export const statusCourses = (status) => ({
    type: STATUS_COURSES,
    payload: status
})

export const fetchCourses = (courses) => ({
    type: FETCH_COURSES,
    payload: courses
})

export const watchCourses = (course) => ({
    type: WATCH_COURSE,
    payload: course
})

    export const messageCourses = (message) => ({
        type: MESSAGE_COURSES,
        payload:message
    })