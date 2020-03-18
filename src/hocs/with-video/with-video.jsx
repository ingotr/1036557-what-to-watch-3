import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";

const MOVIE_OVER_TIMEOUT = 1000;

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
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

      videoRef.className = `player__video--${this.state.isPlaying ? `pause` : `play`}`;
      videoRef.disabled = this.state.isLoading;
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
      videoRef.onmouseover = () => {
        setTimeout(this.setState({isPlaying: true}), MOVIE_OVER_TIMEOUT);
      };
      videoRef.onmouseout = () => {
        this.setState({isPlaying: false});
      };
      videoRef.src = this.props.src;
      videoRef.poster = this.props.poster;
      videoRef.muted = this.state.isMuted;
    }

    componentWillUnmount() {
      const videoRef = this._videoRef.current;

      videoRef.oncanplaythrough = null;
      videoRef.onplay = null;
      videoRef.onpause = null;
      videoRef.ontimeupdate = null;
      videoRef.src = ``;
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

    render() {
      return (
        <Component
          {...this.props}
        >
          <video
            height={`175`}
            width={`250`}
            ref={this._videoRef}
          />
        </Component>
      );
    }
  }

  WithVideo.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    poster: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  };

  return WithVideo;
};

export default withVideo;

