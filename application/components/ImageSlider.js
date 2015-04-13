'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Image,
  View,
} = React;

var ImageSlider = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

module.exports = ImageSlider;
