import React, { Fragment, PureComponent } from 'react'

const VERSION = {
  FOUR: '4.1.3',
  THREE: '3.3.7',
}
const renderNothing = () => null

class WithBootstrapStyle extends PureComponent {
  constructor() {
    super();

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.style.addEventListener('load', this.handleLoadEvent);
  }

  componentWillUnmount() {
    this.style.removeEventListener('load', this.handleLoadEvent);
  }

  handleLoadEvent = () => {
    this.setState({ loading: false })
  }

  render() {
    const { version = VERSION.FOUR, render } = this.props;

    const href = `bootstrap.${version}.min.css`;

    return (
      <div>
        <link href={href} rel="stylesheet" ref={(element) => this.style = element }/>
        { render(this.state.loading) }
      </div>
    )    
  }
}

export const bootstrapStyle = (version = VERSION.FOUR) => (story, context) => {

  return (
    <WithBootstrapStyle
      version={version}
      render={(loading) => {
        return loading ? renderNothing() : story()
      }}
    />
  )
};

export default WithBootstrapStyle
