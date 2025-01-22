/* page.tsx */

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center p-20 pt-32">
      <div>
        <h1 className="max-w-3xl text-center font-bold text-slate-900 text-5xl leading-tight mb-3">
          Tailwind CSS: Dark Mode Tutorial
        </h1>
        <p className="max-w-3xl text-lg font-medium text-slate-700 text-center mb-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
          corporis officia illum saepe voluptates, assumenda molestiae
          exercitationem quisquam illo omnis? Fuga, voluptates? Eum dolor ipsam
          expedita perspiciatis doloremque, ad illo!
        </p>
        <Link href={'/theme'}>Theme Change</Link>
      </div>
    </main>
  );
}
