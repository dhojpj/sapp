import React, { useState } from "react";
import {
  Button,
  Card,
  Layout,
  MediaCard
} from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";
import { gql, useQuery } from '@apollo/client';

const GET_PRODUCTS = gql`
  query getProducts($ids: [ID!]!){
    nodes(ids: $ids) {
      ...on Product{
        title
        handle
        descriptionHtml
        id
        images(first: 1){
          edges{
            node{
              originalSrc
              altText
            }
          }
        }
        variants(first: 1){
          edges{
            node{
              price
              id
            }
          }
        }
      }
    }
  }`;

export default function ProductInfo(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [productChoice, setProductChoice] = useState(false);

  function handleResourcePicker(resources) {
    console.log("resources.selection",resources.selection)
    const products = resources.selection.map((product) => product.id);
    setModalOpen(false);
    store.set("productIds", products);
    setProductChoice(true);
    const product = resources.selection[0];
    console.log("product",product)

    props.setProductInfoState({
      id: product.id,
      title: product.title,
      description: product.descriptionHtml,
      image_url: product.images[0].originalSrc
    });

  }
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {"ids": store.get("productIds")}
  });
  
  function showMediaCard() {
    if(productChoice) {
      if (loading) {
        return (
          <div>Loading Product...</div>
        );
      }
      else if(error) {
        return (
          <div>Error loading product...</div>
        );
      } else {
        console.log('show media card',data.nodes[0])
        const result = data.nodes[0];
        const images = result.images.edges[0].node;
        return (
          <MediaCard
          title={ result.title }
          primaryAction={{
            content: "Choose another product",
            onAction: () => {
              setModalOpen(true);
            },
          }}
          description={ result.descriptionHtml }
        >
          <img
            alt={ images.altText }
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            src={ images.originalSrc }
          />
        </MediaCard>
        );
      }
    }
  }
  

  return (
    <>
      <ResourcePicker
        resourceType="Product"
        open={modalOpen}
        onSelection={(resource) => handleResourcePicker(resource)}
        onCancel={() => setModalOpen(false)}
        showVariants={false}
      ></ResourcePicker>
      <Layout.AnnotatedSection
      title="Product Information"
      description="Info"
    >
      <Card sectioned>
        {!productChoice ? <Button onClick={() => {setModalOpen(true)}}>Choose a Product</Button> : ''}
        {showMediaCard()}
      </Card>
    </Layout.AnnotatedSection></>
  );
}