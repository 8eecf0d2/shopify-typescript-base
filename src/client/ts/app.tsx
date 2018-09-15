import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";

import { AppProvider, TextStyle } from "@shopify/polaris";
import * as Views from "./views";
import * as util from "./util";

export class App extends React.Component<App.Props> {
  public render(): JSX.Element {
    return (
      <BrowserRouter basename="/">
        <AppProvider
          shopOrigin={util.cookie("shop")}
          linkComponent={(props) => {
            return (
              <Link className={props.className} to={props.url}>{props.children}</Link>
            )
          }}
        >
          <Switch>
            <Route exact path="/shopify">
              <Redirect to="/shopify/orders"></Redirect>
            </Route>
            <Route exact path="/shopify/install" component={Views.InstallView} />
            <Route exact path="/shopify/orders" component={Views.OrdersListView} />
            <Route exact path="/shopify/orders/:id" component={Views.OrdersPrintView} />
            <Route exact path="/shopify/templates" component={Views.TemplatesListView} />
            <Route exact path="/shopify/templates/:id" component={Views.TemplatesEditorView} />
          </Switch>
        </AppProvider>
      </BrowserRouter>
    );
  }

  public static start(): void {
    ReactDOM.render(
      <App />,
      document.getElementById("root"),
    );
  }
}

export namespace App {
  export interface Props {}
}
