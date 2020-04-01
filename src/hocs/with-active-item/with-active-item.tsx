import * as React from 'react';
import {MovieInterface} from '../../types';
import {Subtract} from 'utility-types';

interface State {
  activeItem: MovieInterface | string | null;
}

interface InjectingProps {
  onItemLeave: () => void;
  onItemEnter: () => void;
  activeItem: MovieInterface | string | null;
}

const withActiveItem = (Component) => {

  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActiveItem extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: ``,
      };
      this.onItemEnter = this.onItemEnter.bind(this);
      this.onItemLeave = this.onItemLeave.bind(this);
    }

    onItemEnter(item) {
      this.setState({
        activeItem: item
      });
    }

    onItemLeave() {
      this.setState({
        activeItem: null
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          activeItem={this.state.activeItem}
          onItemEnter={this.onItemEnter}
          onItemLeave={this.onItemLeave}
        />
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
