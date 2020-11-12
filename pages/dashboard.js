import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  Avatar,
  Badge,
  Page,
  Thumbnail,
  Card,
  Layout,
  Banner,
  FormLayout,
  TextField,
  TextStyle,
  ResourceList,
} from "@shopify/polaris";

export default function Home() {
  return (
    <Page
      title="3/4 inch Leather pet collar"
      titleMetadata={<Badge status="success">Paid</Badge>}
      subtitle="Perfect for any pet"
      thumbnail={
        <Thumbnail
          source="https://www.hellenic-art.com/images/thumbnails/635/487/detailed/7/macedonian-sword.png"
          alt="Macedonian sword"
        />
      }
      primaryAction={{ content: "Save", disabled: false }}
      secondaryActions={[
        {
          content: "Duplicate",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
        {
          content: "View on your store",
          onAction: () => alert("View on your store action"),
        },
      ]}
      actionGroups={[
        {
          title: "Promote",
          accessibilityLabel: "Action group label",
          actions: [
            {
              content: "Share on Facebook",
              accessibilityLabel: "Individual action label",
              onAction: () => alert("Share on Facebook action"),
            },
          ],
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
      additionalNavigation={
        <Avatar size="small" initials="CD" customer={false} />
      }
      separator
    >
      <Head>
        <title>Dashboard Paige</title>
        <meta charSet="utf-8" />
      </Head>
      <Layout>
        <Layout.Section>
          <Banner title="Order archived" onDismiss={() => {}}>
            <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
          </Banner>
        </Layout.Section>
        <Layout.AnnotatedSection
          title="Store details"
          description="Shopify and your customers will use this information to contact you."
        >
          <Card sectioned>
            <FormLayout>
              <TextField label="Store name" onChange={() => {}} />
              <TextField
                type="email"
                label="Account email"
                onChange={() => {}}
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.Section oneThird>
          <Card title="Florida" actions={[{ content: "Manage" }]}>
            <Card.Section>
              <TextStyle variation="subdued">455 units available</TextStyle>
            </Card.Section>
            <Card.Section title="Items">
              <ResourceList
                resourceName={{ singular: "product", plural: "products" }}
                items={[
                  {
                    id: 343,
                    url: "produdcts/343",
                    name: "Black & orange scarf",
                    sku: "9234194023",
                    quantity: "254",
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: 258,
                    url: "produdcts/258",
                    name: "Tucan scarf",
                    sku: "9234194010",
                    quantity: "201",
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const { id, url, name, sku, media, quantity } = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={`View details for ${name}`}
                    >
                      <h3>
                        <TextStyle variation="strong">{name}</TextStyle>
                      </h3>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section oneThird>
          <Card title="Nevada" actions={[{ content: "Manage" }]}>
            <Card.Section>
              <TextStyle variation="subdued">301 units available</TextStyle>
            </Card.Section>
            <Card.Section title="Items">
              <ResourceList
                resourceName={{ singular: "product", plural: "products" }}
                items={[
                  {
                    id: 344,
                    url: "produdcts/344",
                    name: "Black & orange scarf",
                    sku: "9234194023",
                    quantity: "100",
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: 259,
                    url: "produdcts/259",
                    name: "Tucan scarf",
                    sku: "9234194010",
                    quantity: "201",
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const { id, url, name, sku, media, quantity } = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={`View details for ${name}`}
                    >
                      <h3>
                        <TextStyle variation="strong">{name}</TextStyle>
                      </h3>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section oneThird>
          <Card title="Minneapolis" actions={[{ content: "Manage" }]}>
            <Card.Section>
              <TextStyle variation="subdued">1931 units available</TextStyle>
            </Card.Section>
            <Card.Section title="Items">
              <ResourceList
                resourceName={{ singular: "product", plural: "products" }}
                items={[
                  {
                    id: 345,
                    url: "produdcts/345",
                    name: "Black & orange scarf",
                    sku: "9234194023",
                    quantity: "1230",
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: 260,
                    url: "produdcts/260",
                    name: "Tucan scarf",
                    sku: "9234194010",
                    quantity: "701",
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const { id, url, name, sku, media, quantity } = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={`View details for ${name}`}
                    >
                      <h3>
                        <TextStyle variation="strong">{name}</TextStyle>
                      </h3>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
