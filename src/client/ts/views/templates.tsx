import * as React from "react";
import { AppliedFilter, Badge, Caption, Card, Filter, FilterType, FormLayout, Heading, Layout, Link, Modal, Page, Pagination, ResourceList, ResourceListSelectedItems, SkeletonBodyText, Stack, TextContainer, TextStyle } from "@shopify/polaris";

import { TemplateSchema } from "../../../shared/ts/shcema";
import { resource } from "../resource";
import * as util from "../util";

export class TemplatesView extends React.Component<TemplatesView.Props, TemplatesView.State> {
  private meta: TemplatesView.Meta = {
    title: "Templates",
  };

  public state: TemplatesView.State = {
    item: TemplateSchema.empty(),
    items: [TemplateSchema.empty()],
    loadingView: false,
  };

  public async componentDidMount (): Promise<void> {
    Promise.resolve()
      .then(() => this.setState({ loadingView: true }))
      .then(() => resource.shopify.handler({ method: "GET", path: "/database/templates.json" }))
      .then(() => this.setState({ loadingView: false }))
      .catch((error) => console.log("error", error))
  }

  public render (): JSX.Element {
    return (
      <Page
        title={this.meta.title}
        secondaryActions={[{
          content: "Orders",
          url: "/shopify/orders",
        },{
          content: "Settings",
          url: "/shopify/settings",
        }]}
      >
        {this.state.loadingView ? this.skeleton() : this.content() }
      </Page>
    );
  }

  private content (): JSX.Element {
    const resourceName = {
      singular: "template",
      plural: "templates",
    };

    return (
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={this.state.items}
          renderItem={(item) => this.resourceListItem(item)}
          promotedBulkActions={[{
            content: "Prepare Templates",
            url: "/shopify/templates/prepare"
          }]}
        />
      </Card>
    )
  }

  private skeleton (): JSX.Element {
    return (
      <Card sectioned>
        <TextContainer>
          <SkeletonBodyText />
        </TextContainer>
      </Card>
    );
  }

  private resourceListItem (template: TemplateSchema.Object): JSX.Element {
    return (
      <ResourceList.Item
        accessibilityLabel={`View template details`}
        id={template.id}
        shortcutActions={[{
          content: "View Preview",
          onAction: () => this.setState({ item: template })
        }]}
        onClick={() => this.setState({ item: template })}
        >
          <div style={{ display: "flex", alignItems: "start" }}>
            <div>
              <TextStyle variation="strong">{template.title}</TextStyle>
            </div>
            <div style={{ width: "25%", paddingLeft: "20px", textAlign: template.title ? "left" : "center", textOverflow: "truncate" }}>
              <TextStyle variation="subdued">{template.title || <span>&#8212;</span>}</TextStyle>
            </div>
          </div>
      </ResourceList.Item>
    );
  }
}

export namespace TemplatesView {
  export type TemplateTypes = "info"|"success"|"error";
  export interface Meta {
    title: string;
  }
  export interface State {
    item: TemplateSchema.Object;
    items: TemplateSchema.Object[];
    loadingView: boolean;
  }
  export interface Props {}
}
