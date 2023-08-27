import { FC, PropsWithChildren, ReactNode } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = function ({
  children,
  home,
}: {
  children: ReactNode | undefined;
  home: boolean;
}) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      {!home ? (
        <Link href="/">
          <svg
            className="absolute left-5 top-5 w-6 h-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
        </Link>
      ) : (
        <></>
      )}

      {children}
    </main>
  );
};

export default RootLayout;
