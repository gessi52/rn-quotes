import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Quote(props){
        const {text, author} = props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.author}>{author}</Text>
                
            </View>
        );
    
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ffffff',
        marginHorizontal:20,
        paddingHorizontal:10,
        elevation:3
        
    },
    text:{
        fontSize:36,
        textAlign:"center"
    }, 
    author:{
        fontSize:18, 
        textAlign:"right",
        marginBottom:20,
        color: 'red'
    }
});