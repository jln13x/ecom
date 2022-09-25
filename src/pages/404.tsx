import { Button, Link } from "@/components";

const NotFound = () => {
  return (
    <div className="grid place-items-center pt-32">
      <div className="flex flex-col items-center">
        <h1>Not Found</h1>
        <p>This page couldn&apos;t be found.</p>
        <Link href="/" className="mt-8">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
