import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";

import { AppProvider, TextStyle } from "@shopify/polaris";
import { LogsView, OrdersView, SettingsView, TemplatesView } from "./views";
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
            <Route exact path="/">
              <Redirect to="/shopify/settings"></Redirect>
            </Route>
            <Route exact path="/shopify/logs" component={LogsView} />
            <Route exact path="/shopify/orders" component={OrdersView} />
            <Route exact path="/shopify/templates" component={TemplatesView} />
            <Route exact path="/shopify/settings" component={SettingsView} />
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
