import * as React from "react";
import { AppliedFilter, Badge, Button, Caption, Card, ChoiceList, Filter, FilterType, FormLayout, Heading, Layout, Link, Modal, Page, Pagination, ResourceList, ResourceListSelectedItems, SkeletonBodyText, Stack, TextContainer, TextStyle } from "@shopify/polaris";

import { OrderSchema, TemplateSchema } from "../../../../shared/ts/shcema";
import { resource } from "../../resource";
import { Printer } from "../../printer";
import * as util from "../../util";

export class OrdersPrintView extends React.Component<OrdersPrintView.Props, OrdersPrintView.State> {
  private meta: OrdersPrintView.Meta = {
    title: `Order #${this.props.match.params.id}`,
    filters: []
  };

  public state: OrdersPrintView.State = {
    item: OrderSchema.empty(),
    templates: [],
    templatesSelected: [],
    previews: [],
    orderPreview: "",
    loadingView: false,
  };

  public async componentDidMount (): Promise<void> {
    /** TODO: manage data elsewhere */
    Promise.resolve()
      .then(() => this.setState({ loadingView: true }))
      .then(() => resource.shopify.handler({ method: "GET", path: `/admin/orders/${this.props.match.params.id}.json` }))
      .then((response) => this.setState({ item: OrderSchema.parse(response.data.order)[0] }))
      .then(() => resource.database.find.handler({ schema: "templates" }))
      .then((response) => this.setState({ templates: response.data.items} ))
      .then(() => this.selectDefaultTemplates())
      .then(() => this.createPreviews())
      .then(() => this.setState({ loadingView: false }))
      .catch((error) => console.log("error", error))
  }

  private selectDefaultTemplates (): void {
    this.setState({
      templatesSelected: this.state.templates.filter(template => template.default ).map(template => template.id)
    })
  }

  private async createPreviews (): Promise<void> {
    const previews = this.state.templates.map(async template => {
      return {
        ...template,
        html: await Printer.print(template, this.state.item)
      }
    })

    this.setState({ previews: await Promise.all(previews) })
  }

  public render (): JSX.Element {
    return (
      <Page
        title={this.meta.title}
        breadcrumbs={[{
          content: "Orders",
          url: "/shopify/orders"
        }]}
        secondaryActions={[{
          content: "Templates",
          url: "/shopify/templates",
        }]}
      >
        {this.state.loadingView ? this.skeleton() : this.content()}
      </Page>
    );
  }

  private content (): JSX.Element {
    return (
      <Layout>
        <Layout.Section>
        {this.state.previews.filter(preview => this.state.templatesSelected.includes(preview.id)).map(preview => {
          return (
            <Card sectioned key={preview.id}>
              <Heading>{preview.title}</Heading>
              <div
                style={{ border: "1px solid #dfe3e8", padding: "20px", marginTop: "12px" }}
                dangerouslySetInnerHTML={{ __html: preview.html }}
              />
            </Card>
          )
        })}
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned>
            <Heading>Templates</Heading>
            <ChoiceList
              allowMultiple
              title={'While the customer is checking out'}
              choices={this.state.templates.map(template => ({label: template.title, value: template.id }))}
              selected={this.state.templatesSelected}
              onChange={(templatesSelected) => this.setState({ templatesSelected: templatesSelected }) }
            />
            <div style={{ paddingTop: "15px" }}>
              <Button onClick={() => this.print()}>Print</Button>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
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

  private async print (): Promise<void> {
    for(const preview of this.state.previews) {

      console.log('preview', preview.title)
      const deferred = new util.Deferred();

      const printWindow = window.open('', 'Print-Window');
      printWindow.onbeforeunload = () => {
        console.log("unload")
        deferred.resolve();
      }
      printWindow.document.open();
      printWindow.document.write('<html><body>' + preview.html + '</body></html>');
      printWindow.document.close();

      await deferred.promise;
    }
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
    templatesSelected: any[];
    previews: (TemplateSchema.Object & { html: string })[];
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
