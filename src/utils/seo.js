import { siteMeta } from '../data/siteMeta.js';

export const updateSeo = ({ title, description }) => {
  document.title = title ? `${title} | ${siteMeta.owner}` : siteMeta.defaultTitle;

  const descriptionTag =
    document.querySelector('meta[name="description"]') ||
    Object.assign(document.createElement('meta'), { name: 'description' });

  descriptionTag.content = description || siteMeta.defaultDescription;

  if (!descriptionTag.parentNode) {
    document.head.appendChild(descriptionTag);
  }
};
