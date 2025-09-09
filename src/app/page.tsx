import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div>
        <h1>Hello, World!</h1>
        <Image
          src="/path/to/image.jpg"
          alt="Description"
          width={500}
          height={500}
        />
      </div>
    </main>
  );
}
