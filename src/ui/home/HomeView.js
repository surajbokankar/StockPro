import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Strings } from '../../constant/TextConstant';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  ScrollView,
} from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import { Styles } from '../../styles/Styles';
import { getStocks } from '../../action/HomeActions';
import { buildQuery, ActivityIndicatorElement } from '../../utils/Utils';


const HomeView = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState('')
  useEffect(() => {
    dispatch(getStocks(buildQuery('TIME_SERIES_INTRADAY', 'GOOG', '1min', 'compact')))
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
  return (
    <View style={Styles.mainView}>
      <TextInput
        autoCapitalize="characters"
        style={{ ...Styles.input }}
        placeholder={Strings.SEARCH_STOCK}
        showSoftInputOnFocus={false}
        value={symbol}
        onChangeText={(value) => {
          onSymboChange(value)
        }}
      />
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
              Open: ${open}
            </Text>
            <Text style={{ ...Styles.subTitle, padding: 0 }}>
              Close: ${close}
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
      </ScrollView>


      {ActivityIndicatorElement(stockLoading)}
    </View>
  )

}
export default HomeView;