"use client";

import React, { ReactNode } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { createStyles } from "antd-style";
import Image from "next/image";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Flexbox } from "react-layout-kit";

interface AuthPageProps {
  children: ReactNode;
};

const useStyles = createStyles(({ css }) => {
  return {
    desc: css`
      font-size: min(24px, 4vw);
      font-weight: 400;
      text-align: center;
      text-wrap: balance;
    `,
    title: css`
      margin-block-end: 0;
      font-size: min(56px, 7vw); 
      font-weight: 800;
      line-height: 1;
      text-align: center;
      text-wrap: balance;
    `,
    container: css`
      display: flex;
      min-height: 100vh; /* Full viewport height */
    `,
    leftPanel: css`
      flex: 1; /* Equal width */
      position: relative;
      background-color: #f0f0f0; /* Change background color as needed */
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    rightPanel: css`
      flex: 1; /* Equal width */
      background-color: #ffffff; /* Change background color as needed */
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 20px;
    `,
    image: css`
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1; /* Keep the image behind other content */
    `
  };
});

function SupabaseAuthWrapper({ children }: { children: ReactNode }) {
  const { styles } = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <Image
          src="https://pbs.twimg.com/profile_banners/867822116435107840/1704574945/1500x500"
          alt="Application UI"
          layout="fill"
          className={styles.image}
        />
      </div>
      <div className={styles.rightPanel}>
        <Flexbox
          align={"center"}
          as={"h1"}
          className={styles.title}
          gap={16}
          horizontal
          justify={"center"}
          wrap={"wrap"}
        >
          <strong
            className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-green-200 to-amber-300"
            style={{ fontSize: "min(56px, 8vw)" }}
          >
            Spacemart
          </strong>
        </Flexbox>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          Buy and sell space assets
        </p>
        <div className="max-w-md w-full mx-auto py-5">
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

function AuthPage({ children }: AuthPageProps) {
  return <SupabaseAuthWrapper>{children}</SupabaseAuthWrapper>;
};

export default function LoginPage() {
  const supabase = useSupabaseClient();

  return (
    <AuthPage>
      <Auth
        supabaseClient={supabase}
        providers={["google"]}
        socialLayout="horizontal"
        theme="light"
      />
      <div className="flex flex-col gap-2 py-6">
        <Link
          href="https://threads.net/droidology"
          className="flex items-center gap-2 hover:underline text-nord-3 dark:text-nord-5"
          prefetch={false}
        >
          Threads
        </Link>
        <Link
          href="https://github.com/signal-k"
          className="flex items-center gap-2 hover:underline text-nord-3 dark:text-nord-5"
          prefetch={false}
        >
          Github
        </Link>
        <Link
          href="https://github.com/signal-k/manuscript"
          className="flex items-center gap-2 hover:underline text-nord-3 dark:text-nord-5"
          prefetch={false}
        >
          Documentation
        </Link>
      </div>
    </AuthPage>
  );
};