import * as React from "react";
import { Card, FormLayout, Layout, Link, Page, SkeletonBodyText, SkeletonDisplayText, TextContainer, TextField } from "@shopify/polaris";

export class SyncView extends React.Component<SyncView.Props, SyncView.State> {
  private meta: SyncView.Meta = {
    title: "Sync",
    breadcrumbs: [{ content: "Dashboard", url: "/shopify" }],
  };

  public state = {
    loadingSave: false,
    loadingView: false,
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
        primaryAction={{
          content: "Save",
          loading: Boolean(this.state.loadingSave),
          onAction: async () => {
            this.setState({ loadingSave: true });
            await new Promise(r => setTimeout(() => r(), 2000));
            this.setState({ loadingSave: false });
          }
        }}
      >
        <Layout>
          {this.renderEndpoint()}
          {this.renderMapping()}
        </Layout>
      </Page>
    );
  }

  private skeleton(): JSX.Element {
    return (
      <Page
        title={this.meta.title}
        breadcrumbs={this.meta.breadcrumbs}
      >
        <Layout>
          {this.skeletonEndpoint()}
          {this.skeletonMapping()}
        </Layout>
      </Page>
    );
  }

  private renderDetails(): JSX.Element {
    return (
      <Layout.AnnotatedSection
        title="Details"
        description="Define general details about this sync"
      >
        <Card sectioned>
          <FormLayout>
            <TextField
              label="Name"
              helpText="Name this sync operation"
              onChange={() => {}}
            />
            <TextField
              multiline
              label="Purpose"
              helpText="Describe why this sync occurs"
              onChange={() => {}}
            />
          </FormLayout>
        </Card>
      </Layout.AnnotatedSection>
    );
  }

  private skeletonDetails(): JSX.Element {
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
              onChange={() => {}}
            />
            <TextField
              label="Sync Frequency"
              helpText="How often do you want the sync to occur?"
              suffix="hours"
              type="number"
              onChange={() => {}}
            />
          </FormLayout>
        </Card>
      </Layout.AnnotatedSection>
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

  private renderMapping(): JSX.Element {
    return (
      <Layout.AnnotatedSection
        title="Mapping"
        description={<span>Map fields between your Endpoint and Shopify. <Link url="https://shopify-product-sync.com/mapping">Learn more</Link></span>}

      >
        <Card sectioned actions={[{content: "Learn More"}]}>
          <FormLayout>
            <TextField
              multiline={3}
              label="Mapping JSON"
              type="text"
              placeholder="{ ... }"
              onChange={() => {}}
            />
          </FormLayout>
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

export namespace SyncView {
  export interface Meta {
    title: string;
    breadcrumbs: any[];
  }
  export interface State {
    loadingView: boolean;
    loadingSave: boolean;
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
