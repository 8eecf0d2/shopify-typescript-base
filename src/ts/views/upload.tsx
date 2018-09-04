import * as React from 'react';
import { Page, SkeletonPage } from '@shopify/polaris';

export class UploadView extends React.Component<UploadView.Props> {
  private meta: UploadView.Meta = {
    title: 'Upload View'
  }

  public render(): JSX.Element {
    return (
      <Page
        title={this.meta.title}
      ></Page>
    )
  }

  private skeleton(): JSX.Element {
    return (
      <SkeletonPage
        title={this.meta.title}
      >
      </SkeletonPage>
    )
  }
}

export namespace UploadView {
  export interface Meta {
    title: string;
  }
  export interface Props {}
}
