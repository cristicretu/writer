import ExternalLink from './ExternalLink';

export default function Footer() {
  return (
    <footer className="text-quaternary mx-auto mt-4 max-w-2xl border-t border-dashed border-gray-200 py-4 text-sm dark:border-gray-700 dark:text-gray-600">
      Crafted with care by{' '}
      <ExternalLink href="https://cretu.dev">Cristian Crețu</ExternalLink>
    </footer>
  );
}
