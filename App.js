import React, { Component } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
 
import Firebase from './js/Firebase';
import Quote from './js/components/Quote';
import NewQuote from './js/components/NewQuote';
 
const StyledButton = props => {
  let button = null;
  if(props.visible) {
    button = (
      <View style={props.style}>
        <Button 
          title={props.title} 
          onPress={props.onPress}
        />
      </View>
    );
  }
  return button;
};
 
export default class App extends Component {
  state = { index: 0, showNewQuoteScreen: false, quotes: [] };
 
  _retrieveData = async () => {
    let quotes = [];
    let query = await Firebase.db.collection('quotes').get();
 
    query.forEach(quote => {
      quotes.push({
        id: quote.id,
        text: quote.data().text,
        author: quote.data().author
      });
    });
    this.setState({ quotes });
  };
 
  _saveQuoteToDB (text, author, quotes) {
    Firebase.db.collection('quotes').add({ text, author });
  };
 
  _removeQuoteFromDB () {
    // TODO: delete from Firebase
  };
 
  _addQuote = (text, author) => {
    let { quotes } = this.state;
    if (text && author) {
      quotes.push({ text, author });
      this._saveQuoteToDB(text, author, quotes);
    }
    this.setState({ index: quotes.length-1, quotes, showNewQuoteScreen: false });
  };
 
  _deleteButton () {
    Alert.alert('Zitat jetzt löschen?', 'Kann nicht rückgängig gemacht werden.', [
      { text: 'Abbrechen' },
      { text: 'Löschen', onPress: () => this._deleteQuote()}
    ]);
  };
 
  _deleteQuote () {
    let { index, quotes } = this.state;
    this._removeQuoteFromDB(quote[index].id);
    quotes.splice(index, 1);
    this.setState({ index: 0, quotes });
  };
 
  _displayChangeQuote (dir) {
    let {index, quotes} = this.state;
    if (dir === 'prev') {
      index === 0 ? newIndex = quotes.length - 1 : newIndex = index - 1;
    } else {
      index === quotes.length - 1 ? newIndex = 0 : newIndex = index + 1;
    }
    this.setState({ index: newIndex });
  };
 
  componentDidMount () {
    Firebase.init();
    this._retrieveData();
  };
 
  render() {
    let { index, quotes } = this.state;
    const quote = quotes[index];
    let content = <Text>Keine Zitate</Text>;
    if (quote) {
      content = <Quote text={quote.text} author={quote.author}/>
    };
 
    return (
      <View style={styles.container}>
        <StyledButton 
          style={styles.deleteButton}
          visible={quotes.length >= 1}
          title="Zitat entfernen"
          onPress={() => this._deleteButton()}
        />
        <StyledButton 
          style={styles.newButton}
          visible={true}
          title="Neues Zitat"
          onPress={() => this.setState({showNewQuoteScreen: true})}
        />
        <NewQuote 
          visible={this.state.showNewQuoteScreen}
          onSave={this._addQuote}
          />
        {content}
        <StyledButton
          style={styles.nextButton}
          visible={quotes.length >= 2}
          title="Nächstes Zitat" 
          onPress={() => this._displayChangeQuote('next')}
        />
        <StyledButton
          style={styles.prevButton} 
          visible={quotes.length >= 2}
          title="Vorheriges Zitat" 
          onPress={() => this._displayChangeQuote('prev')}
        />
      </View>
    );
  };
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  nextButton: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 50
  },
 
  prevButton: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 10
  },
 
  newButton: {
    position: 'absolute',
    right: 0,
    bottom: 50
  },
 
  deleteButton: {
    position: 'absolute',
    left: 0,
    bottom: 50
  }
});