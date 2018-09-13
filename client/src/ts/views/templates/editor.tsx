import * as React from "react";
//@ts-ignore
import Editor from 'react-simple-code-editor';
//@ts-ignore
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-liquid';
import 'prismjs/components/prism-clike';

import { AppliedFilter, Badge, Button, Caption, Card, Filter, FilterType, FormLayout, Heading, Layout, Link, Modal, Page, Pagination, ResourceList, ResourceListSelectedItems, SkeletonBodyText, Stack, Subheading, TextContainer, TextField, TextStyle } from "@shopify/polaris";

import { TemplateSchema } from "../../../../../shared/ts/shcema";
import { Printer } from "../../printer";
import { resource } from "../../resource";
import * as util from "../../util";

export class TemplatesEditorView extends React.Component<TemplatesEditorView.Props, TemplatesEditorView.State> {
  private meta: TemplatesEditorView.Meta = {
    title: "Templates",
  };

  public state: TemplatesEditorView.State = {
    item: TemplateSchema.empty(),
    variables: {},
    loadingView: false,
    loadingSave: false,
  };

  public async componentDidMount (): Promise<void> {
    /** TODO: manage data elsewhere */
    Promise.resolve()
      .then(() => this.setState({ loadingView: true }))
      .then(() => resource.database.find.handler({ schema: "templates", query: { id: this.props.match.params.id } }))
      .then((response) => this.setState({ item: response.data.items[0] }))
      .then(() => Printer.variables())
      .then((variables) => this.setState({ variables: this.flattenVariables(variables) }))
      .then(() => this.setState({ loadingView: false }))
      .catch((error) => console.log("error", error))
  }

  public render (): JSX.Element {
    return (
      <Page
        title={this.meta.title}
        breadcrumbs={[{
          content: "Templates",
          url: "/shopify/templates"
        }]}
        primaryAction={{
          content: 'Save',
          loading: this.state.loadingSave,
          onAction: () => Promise.resolve()
            .then(() => this.setState({ loadingSave: true }))
            .then(() => resource.database.save.handler({ schema: "templates", data: this.state.item }))
            .then(() => this.setState({ loadingSave: false }))
        }}
        secondaryActions={[{
          content: "Orders",
          url: "/shopify/orders",
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
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextField
              label="Title"
              value={this.state.item.title}
              onChange={(title) => this.setState((prevState) => ({ item: { ...prevState.item, title: title }}))}
            />
            <div style={{ marginTop: "20px" }} className="editor">
              <div style={{ marginBottom: "4px" }}>
                <TextStyle>Template</TextStyle>
              </div>
              <Editor
                value={this.state.item.content}
                onValueChange={(content: string) => this.setState((prevState) => ({ item: { ...prevState.item, content: content }}))}
                highlight={(code: string) => highlight(code, languages.liquid)}
                padding={10}
                style={{ fontFamily: "monospace", fontSize: "14px" }}
              />
            </div>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned>
            <Subheading>Variables</Subheading>
            {Object.keys(this.state.variables).map((key, index) => {
              return (
                <div key={index} style={{ width: "100%" }}>
                  <TextStyle variation="subdued">{key}</TextStyle>
                </div>
              )
            })}
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

  /** credit: https://gist.github.com/gdibble/9e0f34f0bb8a9cf2be43 */
  private flattenVariables (ob: any) {
    const data: any = {};
    let flatObject;
    for (const i in ob) {
      if (!ob.hasOwnProperty(i)) {
        continue;
      }
      if ((typeof ob[i]) === 'object') {
        flatObject = this.flattenVariables(ob[i]);
        for (const x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) {
            continue;
          }
          data[i + (!!isNaN(parseInt(x)) ? '.' + x : '')] = flatObject[x];
        }
      } else {
        data[i] = ob[i];
      }
    }
    return data;
  }
}

export namespace TemplatesEditorView {
  export type TemplateTypes = "info"|"success"|"error";
  export interface Meta {
    title: string;
  }
  export interface State {
    item: TemplateSchema.Object;
    variables: any;
    loadingView: boolean;
    loadingSave: boolean;
  }
  export interface Props {
    match: {
      params: {
        id: string;
      }
    }
  }
}
