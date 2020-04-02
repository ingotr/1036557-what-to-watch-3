import * as React from 'react';

interface Props {
  children: (React.ReactNode | React.ReactNode[]);
}

class VideoPlayer extends React.PureComponent<Props, {}> {
  render() {
    const {children} = this.props;

    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }
}

export default VideoPlayer;
