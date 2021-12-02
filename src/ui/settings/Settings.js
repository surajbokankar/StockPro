
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, Text, FlatList } from 'react-native';
import { getObject } from '../../utils/Storage';
import { Styles } from '../../styles/Styles';


const Settings = () => {
  const isFocused = useIsFocused();
  const [stockData, setStockData] = useState([])

  useEffect(() => {
    async function loadState() {
      const storedData = await getObject('Stocks')
      setStockData(storedData.data)
    }
    loadState()
  }, [isFocused])

  const renderItem = ({ item }) => {
    return (
      <View style={{ ...Styles.container }}>
        <View style={{ ...Styles.mainView, borderRadius: 12 }}>
          <View style={Styles.mainView}>
            <Text style={Styles.title}>
              Stock: {item.name}
            </Text>
            <Text style={Styles.subTitle}>
              Information: {item.info}
            </Text>
          </View>

          <View style={Styles.mainSubView}>
            <Text style={{ ...Styles.title, padding: 0 }}>
              Open: {item.open}
            </Text>
            <Text style={{ ...Styles.subTitle, padding: 0 }}>
              Close: {item.close}
            </Text>
          </View>
        </View>
      </View>
    )

  }

  return (
    <View>
      {stockData.length > 0 ?
        <FlatList
          styles={Styles.container}
          data={stockData}
          renderItem={(value) => renderItem(value)}
          keyExtractor={(x, i) => i.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        /> : null}
    </View>
  )
}

export default Settings;