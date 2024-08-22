"use client";

import Link from "next/link";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/components/breadcrumb";


export function Breadcrumbs({ folders = [] }) {
  const allFolders = ["all", ...folders];

  const links = allFolders?.map((folder, index) => {
    const isLast = folders.length === index;
    const parts = folders.slice(0, index);
    const href =
      folder === "all" ? "/vault" : `/${["vault", ...parts].join("/")}`;

    if (isLast) {
      return (
        <BreadcrumbItem key={folder}>
          <BreadcrumbPage>{folder}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    }

    return (
      <>
        <BreadcrumbItem key={folder}>
          <BreadcrumbLink asChild>
            <Link href={href}>{folder}</Link>
          </BreadcrumbLink>

          <BreadcrumbSeparator />
        </BreadcrumbItem>
      </>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>{links}</BreadcrumbList>
    </Breadcrumb>
  );
}
