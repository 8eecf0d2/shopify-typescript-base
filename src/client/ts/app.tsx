import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { AppProvider } from "@shopify/polaris";
import { LogsView, SettingsView } from "./views";

export class App extends React.Component<App.Props> {
  public render(): JSX.Element {
    return (
      <BrowserRouter basename="/shopify">
        <AppProvider>
          <Switch>
            <Route exact path="/">
              <Redirect to="/settings"></Redirect>
            </Route>
            <Route exact path="/logs" component={LogsView} />
            <Route exact path="/settings" component={SettingsView} />
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
