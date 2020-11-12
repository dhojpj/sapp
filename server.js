// import 'isomorphic-fetch';
const Koa = require("koa"); // Koa sever, all it does is listen
const next = require("next"); // next.js to generate static files
const Router = require("@koa/router"); // router to route/handle requests
require('isomorphic-fetch');
// const bodyParser = require('koa-bodyParser');
const json = require('koa-json');
const dotenv = require('dotenv'); // gets shopify api keys
dotenv.config();
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth'); // https://www.npmjs.com/package/@shopify/koa-shopify-auth/v/2.0.5
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, HOST } = process.env;
const {default: graphQlProxy, ApiVersion} = require('@shopify/koa-shopify-graphql-proxy');
// const proxy, {ApiVersion} = require('@shopify/koa-shopify-graphql-proxy');
const koaBody = require("koa-body");
const serve = require("koa-static");
const cors = require("@koa/cors");
const getSubscriptionUrl = require('./server/getSubscriptionUrl');
const {receiveWebhook, registerWebhook} = require('@shopify/koa-shopify-webhooks');




let mockDB = [];


app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(json());
  server.use(session({ secure: true, sameSite: 'none' }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];
  server.use(cors());
  

  //  A Koa Context encapsulates node's request and response objects into a single object
  // provides many helpful methods for writing web applications and APIs
  // These operations are used so frequently in HTTP server development that they are added at this level (our application) instead of a higher (lower?) level framework, which would force middleware to re-implement this common functionality.

  // A Context is created per request, and is referenced in middleware as the receiver, or the ctx identifier
  // router.get("/", async (ctx) => {
  //   await app.render(ctx.req, ctx.res, "/", ctx.query);
  //   ctx.respond = false;
  // });

  // router.get("/create", async (ctx) => {
  //   await app.render(ctx.req, ctx.res, "/create", ctx.query);
  //   ctx.respond = false;
  // });

  // api routes
  router.get("/api/banners", koaBody(), async (ctx) => {
    ctx.body = {
      status: 200,
      message: "All banners",
      data: mockDB
    }
    console.log('get mockDB', mockDB);
  });



  // koaBody() middleware, only on post requests
  router.post("/api/banners", koaBody(), async (ctx) => {
    mockDB.unshift(ctx.request.body);
    ctx.body = {
      status: 200,
      message: "Submitted banner data",
      data: mockDB
    }
    if(mockDB.length > 0) {
      console.log('body after', mockDB[mockDB.length - 1]);
    }
  });

  server.use(async (ctx, next) => {
    // a request is what the user gives us, in a json object -- key value
    // i need the url, your browser, you cookies, and your api hash key before I know what you send you
    // a reponse is what the server / we give back to the client
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());
  
  server.use(
    // Returns an authentication middleware taking up (by default) the routes /auth and /auth/callback
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products', 'write_products', 'read_script_tags', 'write_script_tags', 'read_analytics'], // from https://shopify.dev/docs/admin-api/access-scopes

      // then routes you to root /
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        // found @17:43 "Setting up shopify app bridge" video
        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });

        console.log(HOST)
        const registration = await registerWebhook({
          address: `${HOST}/webhooks/products/create`,
          topic: 'PRODUCTS_CREATE',
          accessToken,
          shop,
          apiVersion: ApiVersion.October19
        });
        
        if(registration.success) {
          console.log('registered webhook')
        } else {
          console.log('failedregistered webhook')
        }


        // ctx.redirect(`https://${shop}/admin/apps/cpsampleapp-5`);
        await getSubscriptionUrl(ctx, accessToken, shop);
      }
    })
  )

  // server.use(graphQlProxy({version: ApiVersion.Unstable}));
  server.use(serve(__dirname + '/public'));

  const shopifyWebhook = receiveWebhook({secret: SHOPIFY_API_SECRET_KEY});
  router.post('/webhooks/products/create', shopifyWebhook, ctx => {
    console.log('received website: ', ctx.state.webhook);
  })


  server.use(graphQlProxy({version: ApiVersion.October19}));

  // createVerifyRequest() returns a middleware to verify requests before letting them further in the chain.
  server.use(verifyRequest());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
    // return
  });




  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
