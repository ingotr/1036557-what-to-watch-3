import * as React from 'react';

interface Props {
  isPlaying: boolean;
  image: string;
  src: string;
}

interface State {
  progress: number;
  isMuted: boolean;
  isLoading: boolean;
  isPlaying: boolean;
}

const MOVIE_OVER_TIMEOUT = 1000;

const withVideo = (Component) => {
  class WithVideo extends React.PureComponent<Props, State> {
    private _videoRef: React.RefObject<HTMLVideoElement>;

    private timeoutOnMouseOver: ReturnType<typeof setTimeout>;

    constructor(props) {
      super(props);

      this._videoRef = React.createRef();

      this.state = {
        progress: 0,
        isLoading: true,
        isPlaying: props.isPlaying,
        isMuted: true,
      };
    }

    onMouseEnter() {
      this.timeoutOnMouseOver = setTimeout(() => {
        this.setState({isPlaying: true});
      }, MOVIE_OVER_TIMEOUT);
    }

    componentDidMount() {
      if (!this._videoRef.current) {
        return;
      }

      const videoRef = this._videoRef.current;

      videoRef.className = `player__video--${this.state.isPlaying ? `pause` : `play`}`;

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
        this.onMouseEnter();
      };
      videoRef.onmouseout = () => {
        this.setState({isPlaying: false});
        clearTimeout(this.timeoutOnMouseOver);
      };
      videoRef.src = this.props.src;
      videoRef.poster = this.props.image;
      videoRef.muted = this.state.isMuted;
    }

    componentWillUnmount() {
      const videoRef = this._videoRef.current;

      videoRef.oncanplaythrough = null;
      videoRef.onplay = null;
      videoRef.onpause = null;
      videoRef.ontimeupdate = null;
      videoRef.onmouseover = null;
      videoRef.onmouseout = null;

      videoRef.src = ``;
      clearTimeout(this.timeoutOnMouseOver);
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

  return WithVideo;
};

export default withVideo;

