import * as React from "react";
import { AppliedFilter, Badge, Caption, Card, Filter, FilterType, FormLayout, Heading, Layout, Link, Modal, Page, Pagination, ResourceList, ResourceListSelectedItems, SkeletonBodyText, Stack, TextContainer, TextStyle } from "@shopify/polaris";

import { OrderSchema, TemplateSchema } from "../../../../shared/ts/shcema";
import { resource } from "../../resource";
import { Printer } from "../../printer";
import * as util from "../../util";

export class OrdersPrintView extends React.Component<OrdersPrintView.Props, OrdersPrintView.State> {
  private meta: OrdersPrintView.Meta = {
    title: "Orders",
    filters: []
  };

  public state: OrdersPrintView.State = {
    item: OrderSchema.empty(),
    templates: [],
    orderPreview: "",
    loadingView: false,
  };

  public async componentDidMount (): Promise<void> {
    /** TODO: manage data elsewhere */
    Promise.resolve()
      .then(() => this.setState({ loadingView: true }))
      .then(() => resource.shopify.handler({ method: "GET", path: `/admin/orders/${this.props.match.params.id}.json` }))
      .then((response) => this.setState({ item: OrderSchema.parse(response.data.order)[0] }))
      .then(() => resource.database.find.handler({ model: "template" }))
      .then((response) => this.setState({ templates: response.data.items }))
      .then(() => this.setState({ loadingView: false }))
      .catch((error) => console.log("error", error))
  }

  public render (): JSX.Element {
    return (
      <Page
        title={this.meta.title}
        secondaryActions={[{
          content: "Templates",
          url: "templates",
        },{
          content: "Settings",
          url: "/shopify/settings",
        }]}
      >
        {this.state.loadingView ? this.skeleton() : this.content()}
      </Page>
    );
  }

  private content (): JSX.Element {

    return (
      <Card>
        {JSON.stringify(this.state.item)}
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

}

export namespace OrdersPrintView {
  export type OrderTypes = "info"|"success"|"error";
  export interface Meta {
    title: string;
    filters: Filter[];
  }
  export interface State {
    item: OrderSchema.Object;
    templates: TemplateSchema.Object[];
    orderPreview: string;
    loadingView: boolean;
  }
  export interface Props {
    match: {
      params: {
        id: string;
      }
    }
  }
}
