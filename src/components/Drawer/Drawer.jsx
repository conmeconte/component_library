import React from 'react';
// import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import './styles.css';

const drawerWidth = 392;
// const transitionPeriod = '0.3s';

const Triangle = ({open, classes}) => (
  <div className={classNames({
    'triangle': true,
    'triangleClosed': !open
  })} style={{
    width: 0,
    height: 0,
    borderTop: '6px solid transparent',
    borderRight: '6px solid #757575',
    borderBottom: '6px solid transparent',
  }}/>
);

const ToggleButton = ({classes, onClick, open}) => (
  <div className={'toggleContainer'}>
    <div onClick={onClick} className={'toggleButton'}>
      <Triangle open={open} classes={classes}/>
    </div>
  </div>
);


class Drawer extends React.Component {

  render() {
    const {
      classes,
      headerContent,
      pageContent,
      drawerContent,
      open,
      headerHeight = '88px',
      onToggleClick,
      contentStyle,
      headerStyle,
      drawerContentStyle
    } = this.props;

    return (
      <div className={'container'}>
        <div className={'drawerContainer'} style={open ? {left: 0} : {left: -drawerWidth}}>
          <div style={Object.assign({height: headerHeight}, headerStyle)}
               className={'drawerHeaderContainer'}
          >
            {headerContent}
            <ToggleButton open={open} onClick={() => onToggleClick(open)} classes={classes}/>
          </div>
          <div style={Object.assign({top: headerHeight}, drawerContentStyle)} className={'drawerContentContainer'}>
            {drawerContent}
          </div>
        </div>
        <div className={'contentContainer'} style={Object.assign(
          {padding: 48, left: open ? drawerWidth : 0},
          contentStyle,
        )}>
          {pageContent}
        </div>
      </div>
    )
  }
}

export default (Drawer);
