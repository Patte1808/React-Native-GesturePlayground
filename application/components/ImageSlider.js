'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Image,
  View,
  PanResponder,
} = React;

var AnimationExperimental = require('AnimationExperimental');

var ImageSlider = React.createClass({

  _panResponder: {},

  componentWillMount: function() {
    var endXPosition = null;
    var startXPosition = null;

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.{x,y}0 will be set to zero now
        console.log(gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        if(startXPosition === null)
          startXPosition = gestureState.moveX;

        console.log(gestureState);
      },
      onResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        endXPosition = gestureState.moveX;
        console.log('Finished: ' + gestureState);
        console.log(gestureState);
        console.log('Startposition: ' + startXPosition);
        console.log('Endposition: ' + endXPosition);

        var position = {
          x: 0,
          y: 0
        }

        if(startXPosition > endXPosition)
          this.loadNextImage(position);
        else
          this.loadPreviousImage(position);

        startXPosition = null;
        endXPosition = null;
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
    });
  },

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

  loadPreviousImage: function(position) {
    var imageCount = this.state.images.length;
    var currentImageIndex = this.state.imageIndex;
    var newImageIndex = currentImageIndex - 1;

    console.log('Loading previous image at index ' + newImageIndex);

    return(newImageIndex >= 0 && newImageIndex <= imageCount - 1) ? this.setState({imageIndex: newImageIndex}) : currentImageIndex;
  },

  loadNextImage: function(position) {
    var imageCount = this.state.images.length;
    var currentImageIndex = this.state.imageIndex;
    var newImageIndex = currentImageIndex + 1;

    console.log('Loading next image at index ' + newImageIndex);

    AnimationExperimental.startAnimation({
      node: this.refs.image,
      duration: 400,
      easing: 'easeInQuad',
      property: 'position',
      toValue: position
    });

    return(newImageIndex >= 0 && newImageIndex <= imageCount - 1) ? this.setState({imageIndex: newImageIndex}) : currentImageIndex;
  },

  render: function() {
    return (
      <View
        style={styles.container}
        {...this._panResponder.panHandlers}>
        <Image
          ref="image"
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
