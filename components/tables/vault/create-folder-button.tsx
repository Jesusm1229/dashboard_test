"use client";

import { Button } from "@/components/ui/components/button";
import { Icons } from "@/components/ui/components/icons";
import { useVaultContext } from "@/store/vault/hook";

export function CreateFolderButton() {
  const createFolder = useVaultContext((s) => s.createFolder);

  const handleCreateFolder = () => {
    createFolder({ name: "Untitled folder" });
  };

  return (
    <Button
      variant="outline"
      className="w-[36px] h-[36px]"
      size="icon"
      onClick={handleCreateFolder}
    >
      <Icons.CreateNewFolder />
    </Button>
  );
}
