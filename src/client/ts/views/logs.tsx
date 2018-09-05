import * as React from "react";
import { Card, FormLayout, Layout, Link, Page, SkeletonBodyText, SkeletonDisplayText, SkeletonPage, Tabs, TextContainer, TextField } from "@shopify/polaris";

export class LogsView extends React.Component<LogsView.Props, LogsView.State> {
  private meta: LogsView.Meta = {
    title: "Logs",
    tabs: [
      {
        id: "all",
        content: "All",
        type: "all"
      },
      {
        id: "success",
        content: "Success",
        type: "success"
      },
      {
        id: "error",
        content: "Errors",
        type: "error"
      },
    ],
  };

  public state = {
    tab: 0,
  };

  public render(): JSX.Element {
    // return this.skeleton()
    return (
      <Page
        title={this.meta.title}
        breadcrumbs={[{ content: "Dashboard", url: "/" }]}
      >
        {this.renderTabs()}
      </Page>
    );
  }

  private skeleton(): JSX.Element {
    return (
      <SkeletonPage title={this.meta.title}>
        <Layout>
          {this.skeletonDetails()}
        </Layout>
      </SkeletonPage>
    );
  }

  public renderTabs(): JSX.Element {
    const tab = this.meta.tabs[this.state.tab];
    return (
      <Card>
        <Tabs
          fitted
          tabs={this.meta.tabs}
          selected={this.state.tab}
          onSelect={(index: number) => this.setState({ tab: index })}
        />
        <Card.Section>
          <p>Showing <strong>{tab.type}</strong> logs</p>
        </Card.Section>
      </Card>
    );
  }

  public skeletonDetails(): JSX.Element {
    return (
      <Layout.AnnotatedSection
        title="Details"
        description="Customize the syncs name and purpose."
      >
        <Card sectioned>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText />
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText />
          </TextContainer>
        </Card>
      </Layout.AnnotatedSection>
    );
  }

}

export namespace LogsView {
  export type LogTypes = "all"|"info"|"success"|"error";
  export interface Meta {
    title: string;
    tabs: LogsView.Tab[];
  }
  export interface Tab {
    id: string;
    content: string;
    type: LogsView.LogTypes;
  }
  export interface State {
    tab: number;
  }
  export interface Props {
    syncItem: null;
  }
}
