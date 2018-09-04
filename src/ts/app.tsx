import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppProvider } from '@shopify/polaris';

export class App extends React.Component<App.Props> {
  public render(): JSX.Element {
    return (
      <AppProvider>
        <React.Fragment />
      </AppProvider>
    )
  }

  static start(): void {
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    )
  }
}

export namespace App {
  export interface Props {}
}
