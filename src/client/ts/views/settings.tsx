import * as React from "react";
import { Card, FormLayout, Layout, Link, Page, PageActions, SkeletonBodyText, SkeletonDisplayText, TextContainer, TextField } from "@shopify/polaris";

export class SettingsView extends React.Component<SettingsView.Props, SettingsView.State> {
  private meta: SettingsView.Meta = {
    title: "Settings",
  };

  public state: SettingsView.State = {
    loadingSave: false,
    loadingView: false,
    endpoint: "",
    frequency: 1,
    mapping: ""
  };

  public async componentDidMount(): Promise<void> {
    // this.setState({ loadingView: true });
    // await new Promise(r => setTimeout(() => r(), 1000));
    // this.setState({ loadingView: false });
  }

  public render(): JSX.Element {
    if(this.state.loadingView) {
      return this.skeleton();
    }
    return (
      <Page
        title={this.meta.title}
        primaryAction={{
          content: "Save",
          loading: this.state.loadingSave,
          onAction: () => this.save(),
        }}
        secondaryActions={[{
          content: "Templates",
          url: "/shopify/templates",
        },{
          content: "Settings",
          url: "/shopify/settings",
        }]}
      >
        <Layout>
          {this.renderEndpoint()}
          {this.renderMapping()}
        </Layout>
        <div style={{ paddingTop: "20px" }}>
          <PageActions
            primaryAction={{
              content: 'Save',
              loading: this.state.loadingSave,
              onAction: () => this.save(),
            }}
            secondaryActions={[{
              content: 'View Logs',
              url: '/shopify/logs'
            }]}
          />
        </div>
      </Page>
    );
  }

  private renderEndpoint(): JSX.Element {
    return (
      <Layout.AnnotatedSection
        title="Endpoint"
        description="Configure where the data is coming from"
      >
        <Card sectioned>
          <FormLayout>
            <TextField
              label="Endpoint URL"
              helpText="Provide the URL which will be used to collect data"
              type="url"
              prefix="https://"
              value={this.state.endpoint}
              onChange={(value) => this.setState({ endpoint: value })}
            />
            <TextField
              label="Sync Frequency"
              helpText="How often do you want the sync to occur?"
              suffix="hours"
              type="number"
              value={String(this.state.frequency)}
              onChange={(value) => this.setState({ frequency: parseInt(value) })}
            />
          </FormLayout>
        </Card>
      </Layout.AnnotatedSection>
    );
  }

  private renderMapping(): JSX.Element {
    return (
      <Layout.AnnotatedSection
        title="Mapping"
        description={<span>Map fields between your Endpoint and Shopify. <Link url="/shopify/help/mapping">Learn more</Link></span>}

      >
        <Card sectioned actions={[{content: "Learn More"}]}>
          <FormLayout>
            <TextField
              multiline={3}
              label="Mapping JSON"
              type="text"
              placeholder="{ ... }"
              value={this.state.mapping}
              onChange={(value) => this.setState({ mapping: value })}
            />
          </FormLayout>
        </Card>
      </Layout.AnnotatedSection>
    );
  }
  private async save () {
    this.setState({ loadingSave: true });
    await new Promise(r => setTimeout(() => r(), 2000));
    this.setState({ loadingSave: false });

  }

  private skeleton(): JSX.Element {
    return (
      <Page
        title={this.meta.title}
      >
        <Layout>
          {this.skeletonEndpoint()}
          {this.skeletonMapping()}
        </Layout>
      </Page>
    );
  }

  private skeletonEndpoint(): JSX.Element {
    return (
      <Layout.AnnotatedSection
        title="Endpoint"
        description="Configure where the data is coming from"
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

  private skeletonMapping(): JSX.Element {
    return (
      <Layout.AnnotatedSection
        title="Mapping"
        description={<span>Map fields between your Endpoint and Shopify. <Link url="https://shopify-product-sync.com/mapping">Learn more</Link></span>}
      >
        <Card sectioned>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText />
          </TextContainer>
        </Card>
      </Layout.AnnotatedSection>
    );
  }

}

export namespace SettingsView {
  export interface Meta {
    title: string;
  }
  export interface State {
    loadingView: boolean;
    loadingSave: boolean;
    endpoint: string;
    frequency: number;
    mapping: string;
  }
  export interface Props {
    syncItem: null;
  }
}

/*
  * Example Mapping (JSON) *
  {
    product_title: "title",
    price: "price",
    images: "photos",
  }
*/
