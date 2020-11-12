osascript -e '
  tell app "Terminal"
    do script "cd /Users/dho/Desktop/Web\\ Development/Coding\\ Phase/shopify-app && npm run dev"
  end tell
  tell app "Terminal"
    do script "cd /Users/dho/Desktop/Web\\ Development/Coding\\ Phase/shopify-app && ngrok http 3000"
  end tell
  tell app "Terminal"
    do script "sleep 3 && cd /Users/dho/Desktop/Web\\ Development/Coding\\ Phase/shopify-app && ./ngrok-copy && open -a /Applications/Google\\ Chrome.app https://partners.shopify.com/1653278/apps/4219883/edit && open -a /Applications/Google\\ Chrome.app https://appcounty.myshopify.com/admin/apps/cpsampleapp-5 https://appcounty.myshopify.com/admin/apps/shopify-graphiql-app https://polaris.shopify.com/components/get-started https://shopify.dev/docs/admin-api/graphql"
  end tell
  '

  # && open -a /Applications/Google\\ Chrome.app `pbpaste`