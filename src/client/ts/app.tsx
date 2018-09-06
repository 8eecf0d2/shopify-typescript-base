import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route} from "react-router-dom";

import { AppProvider } from "@shopify/polaris";
import { DashboardView, LogsView, SyncView } from "./views";

export class App extends React.Component<App.Props> {
  public render(): JSX.Element {
    return (
      <BrowserRouter basename="/shopify">
        <AppProvider>
          <Switch>
            <Route exact path="/" component={DashboardView} />
            <Route exact path="/logs" component={LogsView} />
            <Route exact path="/sync" component={SyncView} />
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
