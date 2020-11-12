import React, { useState, useCallback } from "react";
// // import Head from "next/head";
// import { ResourcePicker } from "@shopify/app-bridge-react";
import {
  // Avatar,
  // Badge,
  Card,
  ColorPicker,
  FormLayout,
  Frame,
  hsbToRgb,
  // Heading,
  Layout,
  MediaCard,
  Page,
  PageActions,
  Select,
  TextField,
  Toast,
  // TextStyle,
  // Thumbnail,
  // EmptyState,
  // Link as PLink,
} from "@shopify/polaris";
import store from "store-js";
import ProductInfo from "../components/ProductInfo";
// const router = useRouter();
const axios = require('axios');

export default function Home() {
  // const [resources, setResources] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [discount, setDiscount] = useState(0);
  // white
  const [textHsbColor, setTextHsbColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 0,
  });
  const [textRgbColor, setTextRgbColor] = useState(hsbToRgb(textHsbColor));

  // black
  const [bgHsbColor, setBgHsbColor] = useState({
    hue: 0,
    brightness: 0,
    saturation: 0,
  });
  const [bgRgbColor, setBgRgbColor] = useState(hsbToRgb(bgHsbColor));


  const [toastActive, setToastActive] = useState(false);
  const toggleToastActive = () => setToastActive(!toastActive);
  
  const toastMarkup = toastActive ? (
      <Toast content="Banner saved!" onDismiss={toggleToastActive} />
  ) : null;



  function handleResourcePicker(resources) {
    // console.log("picker", resources);
    const products = resources.selection.map((product) => product.id);
    store.set("productIds", products);
    // setResources(products)
    console.log("STORE PRODUCTS", store.get("productIds"));
    // setState(state, { modalOpen: true });
    // console.log("PRODUCTS", products);
    // console.log("state", state);
  }

  function handleColorChange(setHsbHandler, setRgbHandler, newColor) {
    setHsbHandler(newColor);
    // setHsbColor(newColor);
    setRgbHandler(hsbToRgb(newColor));
  }

  const bannerLocationOptions = [
    { label: "Top of Page", value: "top" },
    { label: "Bottom of Page", value: "bottom" },
    { label: "Custom", value: "custom" },
  ];

  const [bannerLocation, setBannerLocation] = useState("top");

  const handleBannerLocationChange = useCallback(
    (value) => setBannerLocation(value),
    []
  );

  const [productInfoState, setProductInfoState] = useState({id: "empty"});

  function showCustomCode() {
    return (
      <div>
        <p>Copy this code below</p>
          <pre>
            &lt;div className=&quot;sale-banner-app&quot;&gt;&lt;/div&gt;
          </pre>
      </div>
    );
  }

  return (
    <Frame>
    <Page
      // title="Create a Sales Banner"
      // titleMetadata={<Badge status="success">Paid</Badge>}
      // thumbnail={
      //   <Thumbnail
      //     source="https://www.hellenic-art.com/images/thumbnails/635/487/detailed/7/macedonian-sword.png"
      //     alt="Macedonian sword"
      //   />
      // }
      // breadcrumbs={[{ content: "Settings", url: "/settings" }]}
      // pagination={{
      //   hasPrevious: true,
      //   hasNext: true,
      // }}
      separator
    >
      {/* <Head>
        <title>Index Paige</title>
        <meta charSet="utf-8" />
      </Head> */}

      <Layout>
        <Layout.AnnotatedSection
          title="Banner Title"
          description="Create a banner"
        >
          <Card sectioned>
            <FormLayout>
              <TextField
                label="Title"
                type="text"
                value={title}
                onChange={(text, id) => {
                  setTitle(text);
                }}
              />
              <TextField
                label="Discount"
                type="text"
                value={discount}
                onChange={(discount, id) => {
                  setDiscount(discount);
                }}
              />
              <div>
                <div className="Polaris-Label">
                  <label
                    id="textCustomColor"
                    htmlFor="textCustomColor"
                    className="Polaris-Label__Text"
                  >
                    Selected Text Color
                  </label>
                </div>

                <div style={{ display: "flex" }}>
                  <ColorPicker
                    onChange={(newColor) => {
                      handleColorChange(
                        setTextHsbColor,
                        setTextRgbColor,
                        newColor
                      );
                    }}
                    color={textHsbColor}
                    allowAlpha
                  />

                  <div
                    style={{
                      backgroundColor: `rgba(${textRgbColor.red}, ${textRgbColor.green}, ${textRgbColor.blue}, ${textRgbColor.alpha})`,
                      height: "30px",
                      marginLeft: "15px",
                      width: "100px",
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="Polaris-Label">
                  <label
                    id="bgCustomColor"
                    htmlFor="bgCustomColor"
                    className="Polaris-Label__bg"
                    style={{ display: "inline-block" }}
                  >
                    Selected Background Color
                  </label>
                </div>
                <div style={{ display: "flex" }}>
                  <ColorPicker
                    onChange={(newColor) => {
                      handleColorChange(setBgHsbColor, setBgRgbColor, newColor);
                    }}
                    color={bgHsbColor}
                    allowAlpha
                  />
                  <div
                    style={{
                      backgroundColor: `rgba(${bgRgbColor.red}, ${bgRgbColor.green}, ${bgRgbColor.blue}, ${bgRgbColor.alpha})`,
                      display: "inline-block",
                      height: "30px",
                      marginLeft: "15px",
                      width: "100px",
                    }}
                  ></div>
                </div>
              </div>
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>

        <ProductInfo setProductInfoState={setProductInfoState} />
        <Layout.AnnotatedSection
          title="Banner Location"
          description="Pick banner location"
        >
          <Card sectioned>
            <Select
              label="Location"
              options={bannerLocationOptions}
              onChange={handleBannerLocationChange}
              value={bannerLocation}
            />
            {bannerLocation == 'custom' ? showCustomCode() : ''}
          </Card>
        </Layout.AnnotatedSection>
        <Layout.Section>
          <Card title="Banner Preview" sectioned>
            <div
              style={{
                display: "flex",
                maxHeight: "200px",
                width: "100%",
              }}
            >
              <div style={{
                backgroundColor: `rgba(${bgRgbColor.red}, ${bgRgbColor.green}, ${bgRgbColor.blue}, ${bgRgbColor.alpha})`,
                display: "flex",
                maxWidth: "1200px",
                padding: "20px 20px",
                width: "100%"
               }}>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    flexGrow: 1,
                    width: "200px",
                  }}
                >
                  <img
                    src={
                      `${productInfoState.id == "empty" ? "https://cdn.shopify.com/s/files/1/0457/8879/0941/products/85cc58608bf138a50036bcfe86a3a362.jpg?v=1599730841" : productInfoState.image_url}`
                    }
                    style={{ 
                      maxHeight: "100%",
                     }}
                  />
                  <div style={{ 
                      alignItems: "center",
                      color: `rgba(${textRgbColor.red}, ${textRgbColor.green}, ${textRgbColor.blue}, ${textRgbColor.alpha})`,
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      width: "100%",
                     }}>
                    <h2 style={{ 
                      fontSize: "3rem",
                      fontWeight: "700",
                      marginBottom: "5.5rem",
                     }}>
                      {title}
                    </h2>
                    <span style={{ 
                      fontSize: "10rem",
                     }}
                    >{discount}% OFF</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Layout.Section>
        {toastMarkup}
      </Layout>
      <PageActions
        primaryAction={{
          content: "Save",
          onAction: () => {
            const savedData = {
              title,
              discount,
              textRgbColor,
              bgRgbColor,
              bannerLocation,
              productInfo: productInfoState
            };
            console.log('CREATE axios called savedData', savedData)
            axios.post('/api/banners', savedData)
              .then(function (response) {
                console.log(response);
                toggleToastActive();
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }}
        secondaryActions={[
          {
            content: "Delete",
            destructive: true,
          },
        ]}
      />
    </Page>
    </Frame>
  );
}
