import React from "react";
import { storiesOf } from "@storybook/react";
import LeftMenu from "./index";

class LeftMenuSample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: <h1>Drawer Header Title</h1>,
      /* 4 types of list: 
        1. reg - will render the body component provided
        2. slide - "" + children components when slided to next panel
        3. menu - "" + children component under the body component as children
        4. undefined - will insert whatever component is given to the drawer
      */
      list: [
        {
          type: "reg",
          body: (
            <div
              onClick={() => {
                console.log("reg");
              }}
            >
              reg body
            </div>
          )
        },
        {
          type: "slide",
          body: <div onClick={this.handleClick}>slide body</div>,
          children: [
            {
              type: "reg",
              body: (
                <div
                  onClick={() => {
                    console.log("custom func");
                  }}
                >
                  Slide Sample
                </div>
              )
            },
            {
              type: "menu",
              body: <div onClick={this.changeContent}>menu body</div>,
              children: [
                {
                  type: "reg",
                  body: <div>reg child Body</div>
                }
              ]
            }
          ]
        },
        {
          type: "menu",
          body: <div onClick={this.changeContent}>menu body</div>,
          children: [
            {
              type: "reg",
              body: <div>reg child Body</div>
            },
            {
              type: "slide",
              body: <div onClick={this.handleClick}>Slide children body</div>,
              children: [
                {
                  type: "reg",
                  body: <div>Slide Sample2</div>
                }
              ]
            }
          ]
        },
        {
          type: "reg",
          body: (
            <div
              onClick={() => {
                console.log("reg222");
              }}
            >
              reg body
            </div>
          )
        }
      ]
    };
  }

  changeContent = () => {
    console.log("chainging content");
  };
  handleClick = () => {
    console.log("slide outside func");
  };

  render() {
    const { header, list } = this.state;
    //Need to follow this specific structure....
    return (
      <LeftMenu
        header={header}
        list={list}
        //NOTE: optional props
        backButtonString={"Main Menu"}
        search={true}
        filter={true}
        // width={600}
      >
        {/* <div type="reg">REg Body</div>
        <div type="slide">
          Slide buddy
          <div type="reg">regular2</div>
          <div type="menu">
            menu2
            <div type="reg">life is </div>
            <div type="reg">life is </div>
            <div type="reg">life is </div>
          </div>
        </div>
        <div type="menu">
          Menu Menu
          <div type="slide" leftDrawerPanel>
            Slide 2
            <div type="reg">menu>slide>reg</div>
          </div>
        </div> */}
      </LeftMenu>
    );
  }
}

storiesOf("LeftMenu-non_material").add("render", () => <LeftMenuSample />);
