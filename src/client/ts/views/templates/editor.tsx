import * as React from "react";
import { AppliedFilter, Badge, Button, Caption, Card, Filter, FilterType, FormLayout, Heading, Layout, Link, Modal, Page, Pagination, ResourceList, ResourceListSelectedItems, SkeletonBodyText, Stack, TextContainer, TextStyle } from "@shopify/polaris";

import { TemplateSchema } from "../../../../shared/ts/shcema";
import { resource } from "../../resource";
import * as util from "../../util";

export class TemplatesEditorView extends React.Component<TemplatesEditorView.Props, TemplatesEditorView.State> {
  private meta: TemplatesEditorView.Meta = {
    title: "Templates",
  };

  public state: TemplatesEditorView.State = {
    item: TemplateSchema.empty(),
    items: [TemplateSchema.empty()],
    selectedItems: [],
    loadingView: false,
  };

  public async componentDidMount (): Promise<void> {
    /** TODO: manage data elsewhere */
    Promise.resolve()
      .then(() => this.setState({ loadingView: true }))
      .then(() => resource.database.find.handler({ model: "template" }))
      .then((response) => this.setState({ items: response.data.items, loadingView: false }))
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
          selectedItems={this.state.selectedItems}
          onSelectionChange={(selectedItems) => this.setState({ selectedItems: selectedItems })}
          renderItem={(item) => this.resourceListItem(item)}
          promotedBulkActions={[{
            content: "Set as default",
            onAction: () => {}
          },{
            content: "Remove",
            onAction: () => {}
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
        onClick={() => this.setState({ item: template })}
        >
          <div style={{ display: "flex", alignItems: "start" }}>
            <div style={{ width: "25%", paddingTop: "5px" }}>
              <TextStyle variation="strong">{template.title}</TextStyle>
            </div>
            <div style={{ width: "25%", paddingTop: "5px", paddingLeft: "20px", textAlign: template.title ? "left" : "center", textOverflow: "truncate" }}>
              <TextStyle variation="subdued">{util.formatDate(template.updatedAt) || <span>&#8212;</span>}</TextStyle>
            </div>
            <div style={{ width: "20%", paddingTop: "5px", paddingLeft: "20px", textAlign: template.title ? "left" : "center", textOverflow: "truncate" }}>
              {template.default ? <Badge status="success">Default</Badge> : null}
            </div>
            <div style={{ width: "30%", textAlign: "right" }}>
              <Button size="slim" url={`/shopify/templates/${template.id}`}>Edit</Button>
            </div>
          </div>
      </ResourceList.Item>
    );
  }
}

export namespace TemplatesEditorView {
  export type TemplateTypes = "info"|"success"|"error";
  export interface Meta {
    title: string;
  }
  export interface State {
    item: TemplateSchema.Object;
    items: TemplateSchema.Object[];
    selectedItems: ResourceListSelectedItems;
    loadingView: boolean;
  }
  export interface Props {}
}
