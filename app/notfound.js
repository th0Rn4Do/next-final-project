export const rootNotFoundMetadata = {
  title: 'Not Found',
  description: "sorry can't find the page you are looking for",
};

// a 404 error is an error on the page.
export default function RootNotFound() {
  return (
    <div>
      Sorry, this page was not found. Make sure you visit a page that exists.
    </div>
  );
}
