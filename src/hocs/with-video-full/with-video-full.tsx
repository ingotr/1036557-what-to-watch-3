import * as React from 'react';
import {MovieInterface} from '../../types';

interface Props {
  movie: MovieInterface;
  onItemLeave: () => void;
}

interface State {
  isPlaying: boolean;
  progress: number;
  progressValue: number;
}

const withFullVideo = (Component) => {
  class WithFullVideoPlayer extends React.PureComponent<Props, State> {
    private _videoRef: React.RefObject<HTMLVideoElement>;
    constructor(props) {
      super(props);

      this._videoRef = React.createRef();

      this.state = {
        isPlaying: false,
        progress: 0,
        progressValue: 0
      };

      this.handlePlayClick = this.handlePlayClick.bind(this);
      this.handleFullScreenClick = this.handleFullScreenClick.bind(this);
    }

    componentDidMount() {
      const video = this._videoRef.current;

      video.src = this.props.movie.previewSrc;

      video.onended = () => {
        video.pause();
      };

      video.onpause = () => {
        this.setState({
          isPlaying: false,
        });
      };

      video.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      video.ontimeupdate = () => this.setState({
        progress: Math.floor(video.duration - video.currentTime),
        progressValue: (100 / video.duration) * video.currentTime,
      });
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.src = ``;
      video.ontimeupdate = null;
      video.onended = null;
      video.onplay = null;
      video.onpause = null;
    }

    play() {
      const video = this._videoRef.current;

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    handlePlayClick() {
      this.setState({isPlaying: !this.state.isPlaying}, this.play);
    }

    handleFullScreenClick() {
      const video = this._videoRef.current;
      video.requestFullscreen();
    }

    render() {
      const timer = this.state.progress ? `0:00:${(this.state.progress < 10) ? `0` + this.state.progress : this.state.progress}` : `0:00:00`;
      const progressBar = {
        left: this.state.progressValue + `%`,
      };
      const progressValue = this.state.progressValue ? this.state.progressValue : `0`;

      return (
        <Component
          {...this.props}
          progressBar={progressBar}
          timer={timer}
          isPlaying={this.state.isPlaying}
          onFullScreenClick={this.handleFullScreenClick}
          onPlayClick={this.handlePlayClick}
          progressValue={progressValue}
        >
          <video
            ref={this._videoRef}
            className="player__video"
            poster={this.props.movie.image}
            autoPlay
          />
        </Component>
      );
    }
  }

  return WithFullVideoPlayer;
};


export default withFullVideo;
