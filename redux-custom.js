const actionTypes = {
    LOGIN : "LOGIN",
    LOGOUT : "LOGOUT"
}

const actionCreators = {
    login : (id, nick) => ({
        type : actionTypes.LOGIN,
        id : id,
        nick : nick,
    }),
    /* product
        {
            type : actionTypes.LOGIN,
            id : id,
            nick : nick,
        }
    */
    logout : () => ({
        type : actionTypes.LOGOUT
    })
}

const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.LOGIN :
        return Object.assign({}, state, {
            isLoggedIn : true,
            id : action.id,
            nick : action.nick,
        })
        break
        case actionTypes.LOGOUT :
        return Object.assign({}, state, {
            isLoggedIn : false,
            id : null,
            nick : null,
        })
        break
    }
}

const createStore = (reducer) => {

    let currentState = {}
    const currentListeners = []
    const currentReducer = reducer

    const dispatch = (action) => {
        currentState = currentReducer(currentState, action)
        for(let i = 0; i < currentListeners.length; i++){
            currentListeners[i]()
        }
    }

    const getState = () => {
        return currentState
    }

    const subscribe = (listener) => {
        currentListeners.push(listener)
    }

    return ({
        dispatch,
        subscribe,
        getState,
    })
}

const store = createStore(reducer)

store.subscribe(() => {
    console.log('-- dispatch detection --')
    console.log('state : ', store.getState())
    console.log('component update\n')
})


setTimeout(() => {
    store.dispatch(actionCreators.login('kihyun', 'bpeak'))
}, 1500)

setTimeout(() => {
    store.dispatch(actionCreators.logout())
}, 3000)

setTimeout(() => {
    console.log('-- current state --')
    console.log(store.getState())
}, 4500)
