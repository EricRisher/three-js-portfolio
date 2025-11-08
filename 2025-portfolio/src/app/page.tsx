import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Add other sections here */}
      <section className="min-h-screen  text-white p-8">
        <h2 className="text-4xl font-bold">About Me</h2>
        <p className="mt-4">Section placeholder...</p>
      </section>

      <section className="min-h-screen  text-white p-8">
        <h2 className="text-4xl font-bold">My Works</h2>
        <p className="mt-4">Section placeholder...</p>
      </section>
    </main>
  );
}
