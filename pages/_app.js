// import '../styles/globals.css'
import App from "next/app";
import Head from "next/head";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { Provider, TitleBar } from "@shopify/app-bridge-react";
import Cookies from "js-cookie";
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from 'react-apollo';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "/graphql",
  fetchOptions: {
    credentials: 'include'
  },
  cache: new InMemoryCache()
});


class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    // shopOrigin is set in server.js
    const config = {
      apiKey: SHOPIFY_API_KEY,
      shopOrigin: Cookies.get("shopOrigin"),
      forceRedirect: true,
    };

    // const primaryAction = { content: "Foo", url: "/foo" };
    // const secondaryActions = [{ content: "Bar", url: "/bar" }];
    // const actionGroups = [
    //   { title: "Baz", actions: [{ content: "Baz", url: "/baz" }] },
    // ];

    // appbridge Provider > polaris AppProvider

    return (
      <React.Fragment>
        <Head>
          <title>App Paige!</title>
          <meta charSet="utf-8" />
        </Head>
        <Provider config={config}>
          <AppProvider i18n={translations}>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </AppProvider>

          <TitleBar
            title="Dashboard"
          />
        </Provider>
      </React.Fragment>
    );
  }
}

export default MyApp;
