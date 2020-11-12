import React from 'react';
import Create from './create';
// import Head from "next/head";
// import { useRouter } from 'next/router';
// import {
//   Page,
//   Layout,
//   EmptyState,
//   Link as PLink,
// } from "@shopify/polaris";


export default function Home() {
  // const router = useRouter();

  // function goToCreatePage() {
  //   router.push('/create');
  // }

  return (
    <Create />
  );
}

    // <Page>
    //   <Head>
    //     <title>Index Paige</title>
    //     <meta charSet="utf-8" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>
    //   <Layout>
    //     <Layout.Section>         
    //       <EmptyState
    //         heading="Create a Sales Banner"
    //         action={{ content: "Start", onAction: goToCreatePage }}
    //         secondaryAction={{
    //           content: "Learn more",
    //           url: "https://help.shopify.com",
    //         }}
    //         image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    //       >
    //         <p>Get more sales with this banner.</p>
    //       </EmptyState>
    //     </Layout.Section>
    //   </Layout>
    // </Page>