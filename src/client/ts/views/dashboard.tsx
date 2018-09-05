import * as React from "react";
import { EmptyState, Page, SkeletonPage } from "@shopify/polaris";

export class DashboardView extends React.Component<DashboardView.Props> {
  private meta: DashboardView.Meta = {
    title: "Dashboard View",
  };

  public render(): JSX.Element {
    return (
      <Page
        title={this.meta.title}
      >
        <EmptyState
          heading="Keep your products in sync"
          action={{content: "Start Syncing", url: "/sync"}}
          secondaryAction={{content: "Learn more", url: "https://help.shopify.com"}}
          image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        >
          <p>Track and receive your incoming inventory from suppliers.</p>
        </EmptyState>

      </Page>
    );
  }

  private skeleton(): JSX.Element {
    return (
      <SkeletonPage
        title={this.meta.title}
      >
      </SkeletonPage>
    );
  }
}

export namespace DashboardView {
  export interface Meta {
    title: string;
  }
  export interface Props {}
}
