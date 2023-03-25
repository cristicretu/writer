import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="">
      <h1 className="text-4xl font-bold">404 - letter not found...</h1>
      <Link className="text-primary" href="/">
        Home
      </Link>
    </div>
  );
}
