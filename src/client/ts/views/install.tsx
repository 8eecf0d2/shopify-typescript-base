import * as React from "react";
import { Button, DisplayText, FormLayout, Layout, TextField } from "@shopify/polaris";
import { Resource } from "../resource";

export class InstallView extends React.Component<InstallView.Props, InstallView.State> {
  private meta: InstallView.Meta = {
    title: `Install`,
  };

  public state: InstallView.State = {
    url: "",
  };

  public render (): JSX.Element {
    return (
      <Layout>
        <div style={{ marginTop: "150px", marginBottom: "100px", textAlign: "center" }}>
          <DisplayText size="large">Order Print Installer</DisplayText>
          <div style={{ marginTop: "40px" }}>
            <FormLayout>
              <TextField
                label="Shopify store URL"
                value={this.state.url}
                suffix=".myshopify.com"
                onChange={(url) => this.setState({ url: url })}
              />
              <Button onClick={() => this.install()} primary fullWidth>Install</Button>
            </FormLayout>
          </div>
        </div>
      </Layout>
    );
  }

  private install () {
    if(this.state.url.length > 1) {
      window.location.href = `${Resource.baseURL}/api/shopify/setup?shop=${this.state.url + ".myshopify.com"}`;
    }
  }
}

export namespace InstallView {
  export type OrderTypes = "info"|"success"|"error";
  export interface Meta {
    title: string;
  }
  export interface State {
    url: string;
  }
  export interface Props {}
}
