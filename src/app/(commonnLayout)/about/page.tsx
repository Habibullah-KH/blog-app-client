export const dynamic = "force-dynamic";
export default async function AboutPage() {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return (
    <div>
      <h1>this s about page</h1>
    </div>
  );
}
