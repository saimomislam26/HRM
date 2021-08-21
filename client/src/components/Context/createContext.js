import React, { useReducer, createContext } from 'react'
import App from '../../App'
import { reducer } from '../reducer/reducer'

export const ProjectContext = createContext()

let initialState = {
    user: [],
    files: null,
    currPage: 1,
    pagePost: [],
}
const CreateContext = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const getUserMail = (data, mail, event) => {
        return dispatch({
            type: 'USER_MAIL',
            payload: {
                data: data,
                mail: mail,
                event: event
            }
        })
    }
    const onChange = (event) => {
        return dispatch({
            type: 'CHANGE_DATA',
            payload: event
        })
    }



    return (
        <ProjectContext.Provider value={{ ...state, getUserMail, onChange, }}>
            <App />
        </ProjectContext.Provider>
    )
}

export default CreateContext
