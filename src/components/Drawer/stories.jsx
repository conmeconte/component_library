import React from 'react';
import {storiesOf} from '@storybook/react';
import Drawer from './Drawer';
import range from 'lodash/range';

const PageContent = ({what}) => (
  <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
    {range(0, 100).map(i => <div
      style={{height: 100, backgroundColor: i % 2 === 0 ? '#fbfbfb' : '#fefefe'}}>Some {what} content</div>)}
  </div>
);

const HeaderContent = () => (
  <div style={{height: 80, width: '100%'}}>Some header content</div>
);

class TestDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open
    }
  }

  render() {
    return (
      <Drawer
        onToggleClick={(open) => this.setState({open: !this.state.open})}
        headerContent={<HeaderContent/>}
        drawerContent={<PageContent what={"Drawer"}/>}
        pageContent={<PageContent what={"Page"}/>}
        {...this.props}
        open={this.state.open}
      />
    )
  }
}

storiesOf('Drawer', module)
  .add('Open', () =>
    <TestDrawer open={true}/>)
  .add('Closed', () =>
    <TestDrawer open={false}/>)
  .add('Style override', () =>
    <TestDrawer open={true} headerStyle={{}} contentStyle={{padding: 32, backgroundColor: 'pink'}} drawerContentStyle={{top: 0}}/>)
  .add('Empty', () =>
    <Drawer open={true} />);
