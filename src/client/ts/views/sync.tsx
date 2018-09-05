import * as React from 'react';
import { Card, FormLayout, Layout, Link, Page, SkeletonBodyText, SkeletonDisplayText, SkeletonPage, TextContainer, TextField } from '@shopify/polaris';

export class SyncView extends React.Component<SyncView.Props, SyncView.State> {
  private meta: SyncView.Meta = {
    title: 'Sync'
  }

  public state = {
    save_loading: false
  }

  componentDidMount() {}

  public render(): JSX.Element {
    // return this.skeleton()
    return (
      <Page
        title={this.meta.title}
        breadcrumbs={[{ content: 'Dashboard', url: '/' }]}
        primaryAction={{
          content: 'Save',
          loading: Boolean(this.state.save_loading),
          onAction: async () => {
            this.setState({ save_loading: true });
            await new Promise(r => setTimeout(() => r(), 2000));
            this.setState({ save_loading: false })
          }
        }}
      >
        <Layout>
          {/*{this.renderDetails()}*/}
          {this.renderEndpoint()}
          {this.renderMapping()}
        </Layout>
      </Page>
    )
  }

  private skeleton(): JSX.Element {
    return (
      <SkeletonPage title={this.meta.title}>
        <Layout>>
          {/*{this.skeletonDetails()}*/}
          {this.skeletonEndpoint()}
          {this.skeletonMapping()}
        </Layout>
      </SkeletonPage>
    )
  }

  public renderDetails(): JSX.Element {
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
    )
  }

  public skeletonDetails(): JSX.Element {
    return (
      <Layout.AnnotatedSection
        title="Details"
        description="Customize the sync's name and purpose."
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
    )
  }

  public renderEndpoint(): JSX.Element {
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
    )
  }

  public skeletonEndpoint(): JSX.Element {
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
    )
  }

  public renderMapping(): JSX.Element {
    return (
      <Layout.AnnotatedSection
        title="Mapping"
        description={<span>Map fields between your Endpoint and Shopify. <Link url="https://shopify-product-sync.com/mapping">Learn more</Link></span>}

      >
        <Card sectioned actions={[{content: 'Learn More'}]}>
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
    )
  }

  public skeletonMapping(): JSX.Element {
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
    )
  }

}

export namespace SyncView {
  export interface Meta {
    title: string;
  }
  export interface State {
    save_loading: boolean;
  }
  export interface Props {
    syncItem: null;
  }
}

/*
  * Example Mapping (JSON) *
  {
    product_title: 'title',
    price: 'price',
    images: 'photos',
  }
*/
