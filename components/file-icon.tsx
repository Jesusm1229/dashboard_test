import { cn } from "@/lib/utils";
import { Icons } from "@/packages/ui/src/components/icons";

export function FileIcon({ mimetype, name, isFolder, size = 16, className }: { mimetype?: string; name?: string; isFolder?: boolean; size?: number; className?: string }) {
  if (name === "exports") {
    return (
      <Icons.DriveFileMove
        size={size}
        className={cn("text-[#878787]", className)}
      />
    );
  }

  if (name === "inbox") {
    return (
      <Icons.FolderSpecial
        size={size}
        className={cn("text-[#878787]", className)}
      />
    );
  }

  if (name === "imports") {
    return (
      <Icons.FolderImports
        size={size}
        className={cn("text-[#878787]", className)}
      />
    );
  }

  if (name === "transactions") {
    return (
      <Icons.FolderTransactions
        size={size}
        className={cn("text-[#878787]", className)}
      />
    );
  }

  if (mimetype?.startsWith("image")) {
    return (
      <Icons.BrokenImage
        size={size}
        className={cn("text-[#878787]", className)}
      />
    );
  }

  if (isFolder) {
    return (
      <Icons.Folder size={size} className={cn("text-[#878787]", className)} />
    );
  }

  switch (mimetype) {
    case "application/pdf":
      return (
        <Icons.Pdf size={size} className={cn("text-[#878787]", className)} />
      );
    case "application/zip":
      return (
        <Icons.FolderZip
          size={size}
          className={cn("text-[#878787]", className)}
        />
      );
    default:
      return (
        <Icons.Description
          size={size}
          className={cn("text-[#878787]", className)}
        />
      );
  }
}
