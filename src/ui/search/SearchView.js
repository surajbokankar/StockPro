import React, { useState, useCallback } from "react";
import _ from "lodash";
import {
    View,
    StyleSheet,
    TextInput
} from 'react-native';
const sendQuery = (query, props) => {
    props.search(query)
};
export default function SearchFixedWithUseCallback(props) {
    const [userQuery, setUserQuery] = useState('');
    const delayedQuery = useCallback(_.debounce(q => sendQuery(q, props), 500), []);
    const onChange = e => {
        setUserQuery(e);
        delayedQuery(e);
    };

    return (
        <View>
            <TextInput
                autoCapitalize="characters"
                style={styles.search}
                placeholder="Search Stock"
                showSoftInputOnFocus={false}
                value={userQuery}
                onChangeText={(value) => {
                    onChange(value)
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    search: {
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 30,
        borderColor: '#eee',
        backgroundColor: '#F3F6F9',
        color: 'grey',
        paddingLeft:16,
        fontSize:18
    },
});