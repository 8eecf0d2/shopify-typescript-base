import * as React from "react";
import { Card, FormLayout, Layout, Link, Page, Pagination, ResourceList, SkeletonBodyText, TextContainer } from "@shopify/polaris";

import { LogModel } from '../../../shared/ts/model'

export class LogsView extends React.Component<LogsView.Props, LogsView.State> {
  private meta: LogsView.Meta = {
    title: "Logs",
    breadcrumbs: [{ content: "Dashboard", url: "/shopify" }],
  };

  public state = {
    loadingView: false,
    searchValue: "",
    hasPaginationPrev: false,
    hasPaginationNext: false,
    currentPaginationPage: 0,
    firstPaginationPage: 0,
    lastPaginationPage: 0,
  };

  public async componentDidMount(): Promise<void> {
    this.setState({ loadingView: true });
    await new Promise(r => setTimeout(() => r(), 1000));
    this.setState({ loadingView: false });
  }

  public render(): JSX.Element {
    if(this.state.loadingView) {
      return this.skeleton();
    }
    return (
      <Page
        title={this.meta.title}
        breadcrumbs={this.meta.breadcrumbs}
      >
        {this.renderLogResource()}
      </Page>
    );
  }

  private skeleton(): JSX.Element {
    return (
      <Page
        title={this.meta.title}
        breadcrumbs={this.meta.breadcrumbs}
      >
        {this.skeletonTabs()}
      </Page>
    );
  }

  private renderLogResource(): JSX.Element {
    return (
      <Card>
          <ResourceList
            resourceName={{ singular: "log", plural: "logs" }}
            items={[]}
            filterControl={
              <ResourceList.FilterControl
                searchValue={this.state.searchValue}
                onSearchChange={(searchValue) => this.setState({ searchValue: searchValue })}
                additionalAction={{
                  content: "Search",
                  onAction: () => {},
                }}
              />
            }
            renderItem={() => (<div></div>)}
          />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <Pagination
              hasPrevious={this.state.hasPaginationPrev}
              onPrevious={this.handlePaginationPrev.bind(this)}
              hasNext={this.state.hasPaginationNext}
              onNext={this.handlePaginationNext.bind(this)}
            />
          </div>
      </Card>
    );
  }

  private renderLogItem(logItem: LogModel): JSX.Element {
    return (
      <ResourceList.Item
        id={logItem.id}
        onClick={() => {}}
      >
        <TextContainer>{logItem.message}</TextContainer>
      </ResourceList.Item>
    );
  }

  private handlePaginationPrev(): void {
    this.handlePaginationGeneric(-1);
  }

  private handlePaginationNext(): void {
    this.handlePaginationGeneric(+1);
  }

  private handlePaginationGeneric(direction: number): void {
    this.setState((prevState) => {
      const currentPaginationPage = prevState.currentPaginationPage + direction;
      const hasPaginationPrev = currentPaginationPage > prevState.firstPaginationPage;
      const hasPaginationNext = currentPaginationPage < prevState.lastPaginationPage;
      return {
        ...prevState,
        currentPaginationPage,
        hasPaginationPrev,
        hasPaginationNext,
      }
    });
  }

  private skeletonTabs(): JSX.Element {
    return (
      <Card sectioned>
        <TextContainer>
          <SkeletonBodyText />
        </TextContainer>
      </Card>
    );
  }

}

export namespace LogsView {
  export type LogTypes = "info"|"success"|"error";
  export interface Meta {
    title: string;
    breadcrumbs: any[];
  }
  export interface State {
    loadingView: boolean;
    searchValue: string;
    hasPaginationPrev: boolean;
    hasPaginationNext: boolean;
    currentPaginationPage: number;
    firstPaginationPage: number;
    lastPaginationPage: number;
  }
  export interface Props {
    syncItem: null;
  }
}
