import * as React from "react";
import { AppliedFilter, Badge, Caption, Card, Filter, FilterType, FormLayout, Heading, Layout, Link, Modal, Page, Pagination, ResourceList, ResourceListSelectedItems, SkeletonBodyText, Stack, TextContainer, TextStyle } from "@shopify/polaris";

import { OrderSchema, TemplateSchema } from "../../../../../shared/ts/shcema";
import { resource } from "../../resource";
import { Printer } from "../../printer";
import * as util from "../../util";

export class OrdersListView extends React.Component<OrdersListView.Props, OrdersListView.State> {
  private meta: OrdersListView.Meta = {
    title: "Orders",
    filters: []
  };

  public state: OrdersListView.State = {
    item: OrderSchema.empty(),
    items: [],
    selectedItems: [],
    templates: [],
    orderPreview: "",
    loadingView: false,
    modalOpen: false,
    searchValue: "",
    appliedFilters: [],
    hasPaginationPrev: false,
    hasPaginationNext: false,
    currentPaginationPage: 0,
    firstPaginationPage: 0,
    lastPaginationPage: 0,
  };

  public async componentDidMount (): Promise<void> {
    /** TODO: manage data elsewhere */
    Promise.resolve()
      .then(() => this.setState({ loadingView: true }))
      .then(() => resource.shopify.handler({ method: "GET", path: "/admin/orders.json?status=any" }))
      .then((response) => this.setState({ items: OrderSchema.parse(response.data.orders) }))
      // .then(() => resource.database.find.handler({ schema: "templates" }))
      // .then((response) => this.setState({ templates: response.data.items }))
      .then(() => this.setState({ loadingView: false }))
      .catch((error) => console.log("error", error))
  }

  public render (): JSX.Element {
    return (
      <Page
        title={this.meta.title}
        secondaryActions={[{
          content: "Templates",
          url: "/shopify/templates",
        }]}
      >
        {this.state.loadingView ? this.skeleton() : this.content()}
        {this.modalOrderPreview()}
      </Page>
    );
  }

  private content (): JSX.Element {
    const resourceName = {
      singular: "order",
      plural: "orders",
    };

    return (
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={this.filter(this.state.items)}
          filterControl={this.resourceFilterControl()}
          renderItem={(item) => this.resourceListItem(item)}
          selectedItems={this.state.selectedItems}
          onSelectionChange={(selectedItems) => this.setState({ selectedItems: selectedItems})}
          promotedBulkActions={[{
            content: "Prepare Orders",
            url: "/shopify/orders/prepare"
          }]}
        />
        {this.state.items.length > 50 ? this.pagination() : null}
      </Card>
    )
  }

  private filter (items: OrderSchema.Object[]): OrderSchema.Object[] {
    return items.filter(item => {
      let matches = true;
      if(this.state.searchValue) {
        matches = Boolean(item.name.toLowerCase().match(this.state.searchValue.toLowerCase()))
      }
      return matches;
    });
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

  private resourceFilterControl (): JSX.Element {
    return (
      <ResourceList.FilterControl
        filters={this.meta.filters}
        appliedFilters={this.state.appliedFilters}
        onFiltersChange={(appliedFilters) => this.setState({ appliedFilters: appliedFilters })}
        searchValue={this.state.searchValue}
        onSearchChange={(searchValue) => this.setState({ searchValue: searchValue })}
        additionalAction={{ content: "Search" }}
      />
    );
  }

  private resourceListItem (order: OrderSchema.Object): JSX.Element {
    return (
      <ResourceList.Item
        accessibilityLabel={`View order details`}
        id={order.id}
        shortcutActions={[{
          content: "View Preview",
          onAction: async () => this.setState({
            item: order,
            orderPreview: await Printer.print(this.state.templates[0], order),
            modalOpen: true
          })
        }]}
        url={`/shopify/orders/${order.id}`}
        >
          <div style={{ display: "flex", alignItems: "start" }}>
            <div>
              <TextStyle variation="strong">{order.name}</TextStyle>
            </div>
            <div style={{ width: "25%", paddingLeft: "20px", textAlign: order.email ? "left" : "center", textOverflow: "truncate" }}>
              <TextStyle variation="subdued">{order.email || <span>&#8212;</span>}</TextStyle>
            </div>
            <div style={{ width: "30%" }}>
              <TextStyle variation="subdued">{util.formatDate(order.created_at)}</TextStyle>
            </div>
            <div style={{ width: "10%", textTransform: "capitalize" }}>
              <Badge status={order.financial_status === "paid" ? "info" : "warning" }>
                {order.financial_status}
              </Badge>
            </div>
            <div style={{ width: "10%", textTransform: "capitalize" }}>
              <Badge status={order.fulfillment_status === "fulfilled" ? "success" : "attention" }>
                {order.fulfillment_status || "unfulfilled" }
              </Badge>
            </div>
          </div>
      </ResourceList.Item>
    );
  }

  private modalOrderPreview (): JSX.Element {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={() => this.setState({ modalOpen: false })}
        title={<TextStyle variation="strong">Order Preview</TextStyle>}
        large
      >
        <Modal.Section>
          <div dangerouslySetInnerHTML={{ __html: this.state.orderPreview }}></div>
        </Modal.Section>
      </Modal>
    );
  }

  private pagination (): JSX.Element {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        borderTop: "1px solid #dfe4e8",
      }}>
        <Pagination
          hasPrevious={this.state.hasPaginationPrev}
          onPrevious={() => this.handlePaginationPrev()}
          hasNext={this.state.hasPaginationNext}
          onNext={() => this.handlePaginationNext()}
        />
      </div>
    );
  }

  private handlePaginationPrev (): void {
    this.handlePaginationGeneric(-1);
  }

  private handlePaginationNext (): void {
    this.handlePaginationGeneric(+1);
  }

  private handlePaginationGeneric (direction: number): void {
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

}

export namespace OrdersListView {
  export type OrderTypes = "info"|"success"|"error";
  export interface Meta {
    title: string;
    filters: Filter[];
  }
  export interface State {
    item: OrderSchema.Object;
    items: OrderSchema.Object[];
    selectedItems: ResourceListSelectedItems;
    templates: TemplateSchema.Object[];
    orderPreview: string;
    loadingView: boolean;
    modalOpen: boolean;
    searchValue: string;
    appliedFilters: AppliedFilter[];
    hasPaginationPrev: boolean;
    hasPaginationNext: boolean;
    currentPaginationPage: number;
    firstPaginationPage: number;
    lastPaginationPage: number;
  }
  export interface Props {}
}
