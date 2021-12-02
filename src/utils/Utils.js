import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Colors} from '../constant/ColorConstant';
export const buildQuery = (funName,symbol,interval,output) => {
   const json={
    function:funName,
    symbol:symbol,
    interval:interval,
    outputsize:output,
    apikey:'G35SULBND8TXM3MV'
   }
   return json;
}

export const ActivityIndicatorElement = (value,dismiss,color) => {
    return (
        <ActivityIndicator
          color={Colors.Black}
          size="large"
          animating={value}
          style={{
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            display: 'flex',
            backgroundColor: 'transparent',
          }}
        />
    );
  };