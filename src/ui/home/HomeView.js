import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  Button
} from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import { Styles } from '../../styles/Styles';
import { getStocks } from '../../action/HomeActions';
import { buildQuery, ActivityIndicatorElement } from '../../utils/Utils';
import SearchView from '../search/SearchView';
import { storeObject, getObject } from '../../utils/Storage';


const HomeView = () => {
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState('')
  useEffect(() => {
    dispatch(getStocks(buildQuery('TIME_SERIES_INTRADAY', 'GOOG', '1min', 'compact')))
    let timer = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      if (hour >= 6) {
        clearInterval(timer)
      }
      dispatch(getStocks(buildQuery('TIME_SERIES_INTRADAY', 'SHOP', '1min', 'compact')))
    }, 30000);
    return () => clearInterval(timer)
  }, [])

  const home = useSelector((state) => state.HomeReducer);
  const { isStockSuccess, stocks, stockLoading } = home
  let mapData = []
  let open;
  let close;
  if (isStockSuccess) {
    const data = stocks
    let index = 0
    data.close.forEach((item) => {
      const json = {
        x: item, y: index
      }
      mapData.push(json)
      index += 1
    })
    open = stocks.open[stocks.open.length - 1]
    close = stocks.close[0]
  }

  const onSymboChange = (value) => {
    setSymbol(value)
    console.log(value)
    if (value.length > 2) {
      dispatch(getStocks(buildQuery('TIME_SERIES_INTRADAY', value.toUpperCase(), '1min', 'compact')))
    }
  }
  const onPressAddStock = () => {
    if (stocks) {
      let storedStock = getObject('Stocks');
      const json = {
        name: stocks.name,
        info: stocks.info,
        open: stocks.open[0],
        close: stocks.close[0]
      }
      if (storedStock.length > 0 && storedStock.hasOwnProperty('Stocks')) {
        storedStock.data.push(json)
        storeObject(storedStock)
      } else {
        storedStock = {}
        storedStock.data = []
        storedStock.data.push(json)
        storeObject('Stocks', storedStock)
      }
      alert('Stock Added you may change it from Settings')
    }
  }
  return (
    <View style={Styles.mainView}>
      <SearchView
        search={(symbol) => onSymboChange(symbol)}
      />
      {ActivityIndicatorElement(stockLoading)}
      <ScrollView>
        <View style={Styles.mainView}>
          <View style={Styles.mainView}>
            <Text style={Styles.title}>
              Stock: {stocks.name}
            </Text>
            <Text style={Styles.subTitle}>
              Information: {stocks.info}
            </Text>
          </View>

          <View style={Styles.mainSubView}>
            <Text style={{ ...Styles.title, padding: 0 }}>
              Open: {open}
            </Text>
            <Text style={{ ...Styles.subTitle, padding: 0 }}>
              Close: {close}
            </Text>
          </View>
          <View style={Styles.mainSubView}>
            <Text style={{ ...Styles.title, padding: 0, color: 'green', fontSize: 16 }}>
              {isStockSuccess ? `Intraday High: ${Math.max(...stocks.high)}` : null}
            </Text>
            <Text style={{ ...Styles.subTitle, padding: 0, color: 'red', fontSize: 16 }}>
              {isStockSuccess ? `Intraday Low: ${Math.min(...stocks.low)}` : null}
            </Text>
          </View>
        </View>
        {
          isStockSuccess ? <View>
            <VictoryChart
              theme={VictoryTheme.material}
            >
              <VictoryLine
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc" }
                }}
                data={mapData}
              />
            </VictoryChart>
          </View> : null
        }
        <View style={{
          justifyContent: 'flex-end', flex: 1, margin: 4, height: 42
        }}>
          {isStockSuccess ?
            <Button
              onPress={onPressAddStock}
              title="Add Stock"
              color="#2196F3"
              accessibilityLabel="Learn more about this purple button"
            /> :
            null}
        </View>
      </ScrollView>
    </View>
  )
}
export default HomeView;