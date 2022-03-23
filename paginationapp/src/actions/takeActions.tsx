const initialState={
    Data:[]
}

export default(state=initialState,action:any)=>{
switch (action.type) {
    case 'GET_DATA':
        return{
            ...state,
            Data:[action.payload]
        }
       
    default:
       return state
}
}