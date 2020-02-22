import React, {PureComponent, Fragment, createRef} from "react";
import PropTypes from 'prop-types';

const MOVIE_OVER_TIMEOUT = 1000;

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: props.isPlaying,
      isMuted: true,
    };
  }

  componentDidMount() {
    if (!this._videoRef.current) {
      return;
    }

    const videoRef = this._videoRef.current;

    videoRef.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    videoRef.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    videoRef.onpause = () => this.setState({
      isPlaying: false,
    });
  }

  componentWillUnmount() {
    const videoRef = this._videoRef.current;

    videoRef.oncanplaythrough = null;
    videoRef.onplay = null;
    videoRef.onpause = null;
    videoRef.ontimeupdate = null;
    videoRef.src = ``;
    videoRef = null;
  }

  render() {
    const {poster, src} = this.props;
    const {isLoading, isPlaying} = this.state;

    return (
      <Fragment>
        <video
          className={`player__video--${isPlaying ? `pause` : `play`}`}
          disabled={isLoading}
          onMouseOver={() => {
            setTimeout(this.setState({isPlaying: true}), MOVIE_OVER_TIMEOUT);
          }}
          onMouseOut={() => {
            this.setState({isPlaying: false});
          }}
          poster={poster}
          src={src}
          muted={`muted`}
          width={`250`}
          ref={this._videoRef}
        />
      </Fragment>
    );
  }

  componentDidUpdate() {
    if (!this._videoRef.current) {
      return;
    }

    const videoRef = this._videoRef.current;

    if (this.state.isPlaying) {
      videoRef.play();
    } else {
      videoRef.pause();
      videoRef.load();
    }
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  poster: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default VideoPlayer;
