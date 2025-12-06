import Client from 'shopify-buy';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;

if (!domain || !storefrontAccessToken) {
  console.warn('⚠️ Shopify credentials missing in .env.local');
}

export const shopifyClient = Client.buildClient({
  domain: domain || 'mock-shop.myshopify.com',
  storefrontAccessToken: storefrontAccessToken || 'mock-token',
  apiVersion: '2024-01' // Use latest stable version
});

// Helper to fetch products
export const fetchAllProducts = async () => {
  try {
    const products = await shopifyClient.product.fetchAll();
    return products;
  } catch (error) {
    console.error('Error fetching products from Shopify:', error);
    return [];
  }
};

// Helper to create a checkout
export const createCheckout = async () => {
  return await shopifyClient.checkout.create();
};

// Helper to add line items to checkout
export const addItemsToCheckout = async (checkoutId: string, lineItemsToAdd: {variantId: string, quantity: number}[]) => {
  return await shopifyClient.checkout.addLineItems(checkoutId, lineItemsToAdd);
};

