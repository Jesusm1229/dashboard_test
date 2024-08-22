"use client";

import { Button } from "@/packages/ui/src/components/button";


type Props = {
  disableActions?: boolean;
};

export function UploadButton() {
  return (
    <Button
      variant="outline"
      onClick={() => document.getElementById("upload-files")?.click()}
    >
      Upload
    </Button>
  );
}
