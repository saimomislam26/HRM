
export const reducer = (state, action) => {
    if (action.type === 'USER_MAIL') {
        if (action.payload.event.target.checked) {
            console.log(action.payload.event.target.checked)
            console.log(action.payload.event.target.value)

            console.log("it is checked")
            state.user.push(action.payload.mail)
            console.log(state.user)
            return { ...state, user: state.user }
        }
        else {
            console.log("it is un---checked")
            let newUserMails = state.user.filter(function (mail) {
                return (mail !== action.payload.mail)
            })
            console.log(newUserMails)
            return { ...state, user: newUserMails }
        }
    }

    if (action.type === 'CHANGE_DATA') {
        console.log(action.payload.target.files[0])

        state.files = action.payload.target.files[0]
        let check = typeof (state.files)
        console.log(check)

        console.log(state.files)
        return { ...state, files: state.files[0] }
    }

    return { ...state };
}