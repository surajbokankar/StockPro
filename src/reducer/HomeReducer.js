import * as Actions from '../action/AppActions';

const initalState={
    isStockSuccess:false,
    isError:false,
    stockLoading:false,
    stocks:[],
}

const homeReducer=(state=initalState,action)=>{
    switch(action.type){
        case Actions.GET_INTRADAY_STOCK:
            return{
                ...state,
                stockLoading:true,
            }
        case Actions.GET_INTRADAY_STOCK_SUCCESS:
            return{
                ...state,
                stockLoading:false,
                isStockSuccess:true,
                stocks: action.data
            }
        case Actions.GET_INTRADAY_STOCK_FAILURE:
            return{
                ...state,
                stockLoading:false,
                isStockSuccess:false,
                stocks: action.data
            }

        default:
        return state;    
    }
}

export default homeReducer;