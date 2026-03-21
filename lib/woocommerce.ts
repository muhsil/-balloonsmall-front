import axios from 'axios';

export const wooApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wc/v3`,
  auth: {
    username: process.env.WC_CONSUMER_KEY || '',
    password: process.env.WC_CONSUMER_SECRET || '',
  },
});
