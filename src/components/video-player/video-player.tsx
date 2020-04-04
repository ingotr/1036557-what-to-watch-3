import * as React from 'react';

interface Props {
  children: (React.ReactNode | React.ReactNode[]);
}

const VideoPlayer: React.FunctionComponent<Props> = (Props) =>{
  const {children} = Props;

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default VideoPlayer;
