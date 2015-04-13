'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Image,
  View,
} = React;

var ImageSlider = React.createClass({

  getInitialState: function() {
    return {
      images: [
        'http://dummyimage.com/600x400/000/fff',
        'http://dummyimage.com/600x400/ad10ad/0011ff',
        'http://dummyimage.com/600x400/44c92c/0011ff'
      ],
      imageIndex: 0
    };
  },

  loadPreviousImage: function() {
    var imageCount = this.state.images.length;
    var currentImageIndex = this.state.imageIndex;
    var newImageIndex = currentImageIndex - 1;

    return(newImageIndex < 0 || newImageIndex >= imageCount) ? this.setState({imageIndex: newImageIndex}) : currentImageIndex;
  },

  loadNextImage: function() {
    var imageCount = this.state.images.length;
    var currentImageIndex = this.state.imageIndex;
    var newImageIndex = currentImageIndex + 1;

    return(newImageIndex < 0 || newImageIndex >= imageCount) ? this.setState({imageIndex: newImageIndex}) : currentImageIndex;
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: this.state.images[this.state.imageIndex]}}
          style={styles.image}
        />
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
  image: {
    width: 38,
    height: 38,
  },
});

module.exports = ImageSlider;
