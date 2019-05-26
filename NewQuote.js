import React, {Component} from 'react';
import {Button, TextInput, StyleSheet, Modal,View} from 'react-native';

export default class NewQuote extends Component{
    state = {content: null, author: null}
    render(){
        const {visible, onSave} = this.props;
        const {content, author} = this.state;
        return (
            <Modal 
                visible = {visible} 
                onRequestClose={() => {
                    this.setState({content: null, author: null}); 
                    onSave(null, null);
                } }
                animationType="slide"
            >
                <View style={styles.container}>
                    <TextInput  
                        multiline={true}
                        style={[styles.textinput, {height: 150}]} 
                        placeholder="Inhalt des Zitats" 
                        underlineColorAndroid="transparent"
                        onChangeText = {text => this.setState({content: text})}
                    />
                    <TextInput 
                        style={styles.textinput} 
                        placeholder="Author des Zitats" 
                        underlinecolorandroid="transparent"
                        onChangeText = {text => this.setState({author: text})}
                    />
                    <Button 
                        title="Speichern" 
                        onPress={() => {
                            this.setState({content:null, author:null});
                            onSave (content, author)}
                        }
                    />
                </View>
            </Modal>
        );
       
    }
}



/*******************   STYLES   ******************************/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 40
      },
      textinput:{
          padding:10,
          borderWidth: 1,
          borderColor: 'deepskyblue',
          borderRadius: 4,
          width:'80%',
          marginBottom:20,
          fontSize:20,
          height:50
      }
});