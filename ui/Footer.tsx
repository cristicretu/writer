import ExternalLink from './ExternalLink';

export default function Footer() {
  return (
    <footer className="text-quaternary border-gray-200pb-24 mx-auto max-w-2xl border-t border-dashed py-12 pt-4 text-sm dark:border-gray-700 dark:text-gray-600">
      Crafted with care by{' '}
      <ExternalLink href="https://cretu.dev">Cristian Crețu</ExternalLink>
    </footer>
  );
}
