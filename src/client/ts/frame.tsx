import * as React from "react";
import * as ReactDOM from "react-dom";

export class Frame extends React.Component<Frame.Props, Frame.State> {
  public frame: HTMLIFrameElement;
  public div = document.createElement('div');

  public state = {
    height: "0%"
  }
  componentDidMount () {
    this.frame.contentDocument.body.appendChild(this.div);
    //@ts-ignore
    ReactDOM.render(this.props.children, this.div, () => {
      this.setState({ height: `${this.frame.contentDocument.body.scrollHeight}px` });
      Object.assign(this.frame.contentDocument.body.style, {
        fontFamily: "Helvetica",
        overflow: "hidden",
      })
    });
  }

  render(): JSX.Element {
    // if(this.frame) {
    // }
    // console.log(this.state)
    return (
      <iframe
        id={this.props.id}
        style={{
          ...this.props.style,
          height: this.state.height,
        }}
        ref={frame => this.frame = frame}
      />
    )
  }
}

export namespace Frame {
  export interface Props {
    id?: string;
    style?: React.CSSProperties;
  }
  export interface State {
    height: string;
  }
}
