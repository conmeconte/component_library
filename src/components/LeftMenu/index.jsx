import React from "react";
import "./leftMenu.css";
import { cloneDeep, get } from "lodash";
export default class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftDrawerOpen: false,
      leftDrawerPanel: [],
      //current menu only 1 layer. this will work. but need to modify if menu gets in deeper
      menuArrowTrack: []
    };
  }

  renderHeader = () => {
    const { header, search, filter } = this.props;
    return (
      <React.Fragment>
        {header}
        {search && (
          <span className="icon" id="search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </span>
        )}
        {filter && (
          <span className="icon" id="filter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </span>
        )}
      </React.Fragment>
    );
  };

  renderList = list => {
    //clone props to be able to insert custom style prop
    const clonedList = cloneDeep(list);
    const listCollection = clonedList.map((l, idx) => {
      let compBody = l.type;
      //insert style prop to overwrite css
      l.body.props.style = {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center"
      };
      switch (compBody) {
        case "reg":
          return (
            <li key={idx}>
              <div
                className="listItemWrapper"
                onClick={event => this.handleSelectHighlight(event)}
              >
                <div className="navListItemContent">{l.body}</div>
              </div>
            </li>
          );
        case "slide":
          return (
            <li key={idx}>
              <div
                className="listItemWrapper"
                onClick={event => {
                  this.handleSelectHighlight(event);
                  this.handleEnter(event);
                  this.setState({
                    leftDrawerPanel: l.children
                  });
                }}
              >
                <div className="navListItemContent">
                  {l.body}
                  <span className="icon chevRight enter">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                      <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                  </span>
                </div>
              </div>
            </li>
          );
        case "menu":
          return (
            <li key={idx}>
              <div
                className="listItemWrapper"
                onClick={event => this.handleSelectHighlight(event)}
              >
                <div className="navListItemContent">
                  {l.body}
                  <span
                    className="icon chevDown expand"
                    onClick={event => this.handleExpand(event)}
                  >
                    {true ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
              <ul className="navSubList">{this.renderList(l.children)}</ul>
            </li>
          );
        default:
          try {
            return l;
          } catch (e) {
            console.error(e);
            return null;
          }
      }
    });
    return listCollection;
  };

  handleExpand = e => {
    try {
      const sibling = e.target.closest(".listItemWrapper").nextElementSibling
        .classList;
      sibling && sibling.toggle("opened");
      e.target.closest(".icon").classList.toggle("opened");
    } catch (e) {
      console.error(e);
    }
  };

  handleEnter = e => {
    //Main menu exit/enter
    document.getElementById("navWrapper").classList.toggle("level2");
    document.getElementById("navWrapper2").classList.toggle("level2");
    if (this.state.leftDrawerOpen) {
      setTimeout(() => {
        this.setState({
          leftDrawerPanel: []
        });
      }, 300);
    }
    this.setState({
      leftDrawerOpen: !this.state.leftDrawerOpen
    });
  };

  handleSelectHighlight = e => {
    const wrappers = document.getElementsByClassName("listItemWrapper");
    for (var wIndex = 0; wIndex < wrappers.length; wIndex++) {
      wrappers[wIndex].classList.remove("selected");
    }
    //FIXME: possibility of clicking on navListItemContent. Need case to handle that.
    // e.target.parentElement.classList.toggle("selected");
    e.target.closest(".listItemWrapper").classList.toggle("selected");
  };

  render() {
    const { list, width, backButtonString } = this.props;
    const { leftDrawerOpen, leftDrawerPanel } = this.state;
    return (
      <div id="container">
        <div className="pageNav" style={{ width: width }}>
          {leftDrawerOpen ? (
            <span className="back" onClick={event => this.handleEnter()}>
              {`< ${backButtonString}`}
            </span>
          ) : null}
          <div className="navHeader">{this.renderHeader()}</div>
          <div className="navListWrapper">
            <div id="navWrapper">
              <ul id="navList">{this.renderList(list)}</ul>
            </div>
            <div id="navWrapper2">
              <ul id="navList2">
                {leftDrawerPanel.length && this.renderList(leftDrawerPanel)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LeftMenu.defaultProps = {
  width: 375,
  backButtonString: "Back to Main"
};
