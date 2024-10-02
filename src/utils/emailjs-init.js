// src/utils/emailjs-init.js

import { init } from '@emailjs/browser';

const initEmailJS = () => {
  init(import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);
};

export default initEmailJS;