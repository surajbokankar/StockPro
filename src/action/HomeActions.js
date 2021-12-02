import {connect} from 'react-redux';
import * as Actions from '../action/AppActions';
import Fetch from '../services/RequestBuilder';
import {APP} from '../services/Config';

const mapStateToProps = (state) => ({
    isStockSuccess:state.HomeReducer.isStockSuccess,
    isError:state.HomeReducer.isError,
    stockLoading:state.HomeReducer.stockLoading,
    stocks:state.HomeReducer.stocks,
  });

  export const getStocks=(input)=>{
    return (dispatch) => {
      dispatch(stockLoading());
      Fetch.get(APP.BASE_URL,input)
        .then((response) => {
          const res=modifyData(response,input)
          dispatch(stockSuccess(res));
        })
        .catch((error) => {
          dispatch(stockError(error));
        });
    };
  }

  function modifyData(response,input){
    const rawSeries = response[`Time Series (${input.interval})`]
    const low=[]
    const high=[]
    const open=[]
    const close=[]
    const volume=[]
    Object.keys(rawSeries).reverse().forEach(timestamp => {      
      open.push(rawSeries[timestamp]['1. open'])
      high.push(rawSeries[timestamp]['2. high'])
      low.push(rawSeries[timestamp]['3. low'])
      close.push(rawSeries[timestamp]['4. close'])
      volume.push(rawSeries[timestamp]['5. volume'])
    })
    const name=response['Meta Data'][`2. Symbol`]
    const info=response['Meta Data'][`1. Information`]
    const json={
      name,info,open,high,low,close,volume
    }
    return json
  }

const stockLoading = () => ({
    type: Actions.GET_INTRADAY_STOCK,
  });
    
const stockSuccess = (data) => ({
    type: Actions.GET_INTRADAY_STOCK_SUCCESS,
    data: data,
  });

const stockError = (data) => ({
    type: Actions.GET_INTRADAY_STOCK_FAILURE,
    data: data,
  });
  export default connect(mapStateToProps);
