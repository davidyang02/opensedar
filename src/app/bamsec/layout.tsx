import { BamSecHeader } from "@/components/bamsec/BamSecHeader";

/**
 * BamSEC-style route-group layout. Renders its own dark header.
 * (The root layout's default OpenSEDAR header is hidden on /bamsec/*
 * via a usePathname check in Header.tsx.)
 */
export default function BamSecLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <BamSecHeader />
      <div className="flex-1">{children}</div>
    </div>
  );
}
