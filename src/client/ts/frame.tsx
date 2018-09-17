import * as React from "react";
import * as ReactDOM from "react-dom";
import * as util from "./util";

export class Frame extends React.Component<Frame.Props, Frame.State> {
  public iframe: HTMLIFrameElement;
  public div = document.createElement("div");

  public state = {
    height: "0%",
  }

  componentDidMount () {
    this.iframe.contentDocument.body.appendChild(this.div);

    ReactDOM.render((
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    ), this.div, () => this.handleChildrenRender());
  }

  public handleChildrenRender () {
    this.setState({ height: `${this.iframe.contentDocument.body.scrollHeight}px` });
    Object.assign(this.iframe.contentDocument.body.style, {
      fontFamily: "Helvetica",
      overflow: "hidden",
    })
  }

  public async print(html: string): Promise<{}> {
    const deferred = new util.Deferred();

    this.iframe.contentWindow.onafterprint = () => deferred.resolve();

    ReactDOM.render((
      <React.Fragment>
        <div dangerouslySetInnerHTML={{ __html: html }}/>
      </React.Fragment>
    ), this.div, () => {
      this.iframe.contentWindow.print();
    });
    deferred.resolve();

    return deferred.promise;
  }

  render(): JSX.Element {
    const style = {
      ...this.props.style,
      height: this.state.height,
    }
    return (
      <iframe
        className={this.props.className}
        style={style}
        ref={iframe => this.iframe = iframe}
      />
    )
  }
}

export namespace Frame {
  export interface Props {
    className?: string;
    style?: React.CSSProperties;
  }
  export interface State {
    height: string;
  }
}
