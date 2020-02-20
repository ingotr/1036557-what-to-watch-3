import React, {PureComponent, Fragment} from "react";
import PropTypes from 'prop-types';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      poster: props.poster,
      isLoading: true,
      isPlaying: props.isPlaying,
      isMuted: true,
    };
  }

  componentDidMount() {
    this._video = document.createElement(`VIDEO`);

    this._video.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    this._video.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    this._video.onpause = () => this.setState({
      isPlaying: false,
    });

    this._video.ontimeupdate = () => this.setState({
      progress: this._video.currentTime
    });
  }

  componentWillUnmount() {
    this._video.oncanplaythrough = null;
    this._video.onplay = null;
    this._video.onpause = null;
    this._video.ontimeupdate = null;
    this._video.src = ``;
    this._video = null;
  }

  render() {
    const {isLoading, isPlaying} = this.state;

    return (
      <Fragment>
        <video
          className={`player__video--${isPlaying ? `pause` : `play`}`}
          disabled={isLoading}
          onClick={() => this.setState({isPlaying: !this.state.isPlaying})}
          src={this.props.src}
          poster={this.props.poster}
        />
      </Fragment>
    );
  }

  componentDidUpdate() {
    if (this.state.isPlaying) {
      this._video.play();
    } else {
      this._video.pause();
    }
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default VideoPlayer;
