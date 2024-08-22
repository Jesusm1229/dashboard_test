"use client";

import { invalidateCacheAction } from "@/actions/invalidate-cache-action";
import { cn } from "@/lib/utils";
import { createClient } from "@/packages/supabase/src/client/client";
import { getCurrentUserTeamQuery } from "@/packages/supabase/src/queries";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/components/context-menu";
import { useToast } from "@/components/ui/components/use-toast";
import { useVaultContext } from "@/store/vault/hook";
import { resumableUpload } from "@/utils/upload";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

export function UploadZone({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [toastId, setToastId] = useState(null);
  const uploadProgress = useRef([]);
  const params = useParams();
  const folders = params?.folders ?? [];
  const { toast, dismiss, update } = useToast();
  const { createFolder } = useVaultContext((s) => s);



  useEffect(() => {
    if (!toastId && showProgress) {
      const { id } = toast({
        title: `Uploading ${uploadProgress.current.length} files`,
        progress,
        variant: "progress",
        description: "Please do not close browser until completed",
        duration: Number.POSITIVE_INFINITY,
      });

      setToastId(id);
    } else {
      update(toastId, {
        progress,
        title: `Uploading ${uploadProgress.current.length} files`,
      });
    }
  }, [showProgress, progress, toastId]);

  const onDrop = async (files) => {
    // NOTE: If onDropRejected
    if (!files.length) {
      return;
    }

    // Set default progress
    uploadProgress.current = files.map(() => 0);

    setShowProgress(true);

    const { data: userData } = await getCurrentUserTeamQuery(supabase);
    const filePath = [userData?.id, ...folders];

    try {
      await Promise.all(
        files.map(async (file, idx) => {
          await resumableUpload(supabase, {
            bucket: "vault",
            path: filePath,
            file,
            onProgress: (bytesUploaded, bytesTotal) => {
              uploadProgress.current[idx] = (bytesUploaded / bytesTotal) * 100;

              const _progress = uploadProgress.current.reduce(
                (acc, currentValue) => {
                  return acc + currentValue;
                },
                0,
              );

              setProgress(Math.round(_progress / files.length));
            },
          });
        }),
      );

      // Reset once done
      uploadProgress.current = [];

      setProgress(0);
      toast({
        title: "Upload successful.",
        variant: "success",
        duration: 2000,
      });

      setShowProgress(false);
      setToastId(null);
      dismiss(toastId);
      invalidateCacheAction([`vault_${userData.id}`]);
    } catch {
      toast({
        duration: 2500,
        variant: "error",
        title: "Something went wrong please try again.",
      });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: ([reject]) => {
      if (reject?.errors.find(({ code }) => code === "file-too-large")) {
        toast({
          duration: 2500,
          variant: "error",
          title: "File size to large.",
        });
      }

      if (reject?.errors.find(({ code }) => code === "file-invalid-type")) {
        toast({
          duration: 2500,
          variant: "error",
          title: "File type not supported.",
        });
      }
    },
    maxSize: 3000000, // 3MB
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
      "application/zip": [".zip"],
    },
  });



  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          {...getRootProps({ onClick: (evt) => evt.stopPropagation() })}
          className="relative h-full"
        >
          <div className="absolute top-0 bottom-0 left-0 right-0 z-50 pointer-events-none">
            <div
              className={cn(
                "bg-background dark:bg-[#1A1A1A] h-full flex items-center justify-center text-center invisible",
                isDragActive && "visible",
              )}
            >
              <input {...getInputProps()} id="upload-files" />

              <p className="text-xs">
                Drop your files here, to
                <br /> upload to this folder.
              </p>
            </div>
          </div>

          {children}
        </div>
      </ContextMenuTrigger>


      <ContextMenuContent>
        <ContextMenuItem onClick={createFolder}>
          Create folder
        </ContextMenuItem>
      </ContextMenuContent>

    </ContextMenu>
  );
}
