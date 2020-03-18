import React, {PureComponent} from "react";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null,
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
          onItemEnter={this.onItemEnter}
          onItemLeave={this.onItemLeave}
        />
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
