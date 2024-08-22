"use client";

import { createFolderAction } from "@/actions/create-folder-action";
import { deleteFolderAction } from "@/actions/delete-folder-action";
/* import { shareFileAction } from "@/actions/share-file-action"; */
import { FileIcon } from "@/components/file-icon";
import { FilePreview } from "@/components/file-preview";
import { useVaultContext } from "@/store/vault/hook";
import { formatSize } from "@/utils/format";
import { deleteFileAction } from "@/actions/delete-file-action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/components/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/components/hover-card";
import { Icons } from "@/components/ui/components/icons";
import { Input } from "@/components/ui/components/input";
import { TableCell, TableRow } from "@/components/ui/components/table";
/* import { useToast } from "@packages/ui/src/components/use-toast"; */

import { format } from "date-fns";
/* import ms from "ms"; */
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { isSupportedFilePreview } from "@/packages/utils";
import { useToast } from "@/components/ui/components/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/components/alert-dialog";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/components/context-menu";
/* import { useI18n } from "@/locales/client";
 */
/* export const translatedFolderName = (t: any, folder: string) => {
  switch (folder) {
    case "all":
      return t("folders.all");
    case "exports":
      return t("folders.exports");
    case "inbox":
      return t("folders.inbox");
    case "imports":
      return t("folders.imports");
    case "transactions":
      return t("folders.transactions");
    default:
      return decodeURIComponent(folder);
  }
}; */

function RowTitle({ isEditing, name: initialName, path, href }) {
  /*   const t = useI18n(); */
  const { toast } = useToast();
  const [name, setName] = useState(initialName ?? "Untitled Folder");

  const createFolder = useAction(createFolderAction, {
    onExecute: () => { },
    onError: () => {
      toast({
        duration: 3500,
        variant: "error",
        title:
          "The folder already exists in the current directory. Please use a different name.",
      });
    },
  });

  const handleOnBlur = () => {
    createFolder.execute({ path, name });
  };

  const handleOnKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      createFolder.execute({ path, name });
    }
  };

  if (isEditing) {
    return (
      <Input
        className="w-auto border-0"
        value={name}
        autoFocus
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeyDown}
        onChange={(evt) => setName(evt.target.value)}
      />
    );
  }

  if (href) {
    return <Link href={href}>{name}</Link>;
  }

  return <span>{name}</span>;
}

export function DataTableRow({ data, teamId }: { data: any; teamId: string }) {
  const { toast } = useToast();
  const pathname = usePathname();
  const params = useParams();
  const { deleteItem, createFolder } = useVaultContext((s) => s);

  const folders = params?.folders ?? [];
  /*   const isDefaultFolder = [
      "exports",
      "transactions",
      "inbox",
      "import",
    ].includes(data.name); */

  const disableActions = ["transactions"].includes(folders?.at(0) ?? "");
  const folderPath = Array.isArray(folders) ? folders.join("/") : folders;
  const filepath = [...folders, data.name].join("/") as string;

  const deleteFolder = useAction(deleteFolderAction, {
    onExecute: () => deleteItem(data.name),
    onError: () => {
      toast({
        duration: 3500,
        variant: "error",
        title: "Something went wrong please try again.",
      });
    },
  });

  const deleteFile = useAction(deleteFileAction, {
    onExecute: ({ input: { id } }) => deleteItem(id),
    onError: () => {
      toast({
        duration: 3500,
        variant: "error",
        title: "Something went wrong please try again.",
      });
    },
  });

  const handleDeleteItem = () => {
    if (data.isFolder) {
      deleteFolder.execute({ path: [...folders, data.name] });
    } else {
      deleteFile.execute({ id: data.id, path: [...folders, data.name] });
    }
  };

  const handleCreateFolder = () => {
    createFolder({ path: folderPath, name: "Untitled folder" });
  };

  /* const shareFile = useAction(shareFileAction, {
    onSuccess: async ({ data: url }) => {
      try {
        await navigator.clipboard.writeText(url);

        toast({
          duration: 4000,
          title: `Copied URL for ${data.name} to clipboard.`,
          variant: "success",
        });
      } catch { }
    },
  }); */

  const filePreviewSupported = isSupportedFilePreview(data?.metadata?.mimetype);

  console.log("data", data);

  return (
    <AlertDialog>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <TableRow className="h-[45px] cursor-default">
            <TableCell>
              <HoverCard openDelay={200}>
                <HoverCardTrigger>
                  <div className="flex items-center space-x-2">
                    <FileIcon
                      mimetype={data?.metadata?.mimetype}
                      name={data.name}
                      isFolder={data.isFolder}
                    />

                    <RowTitle
                      href={data.isFolder && `${pathname}/${data.name}`}
                      name={data.name}
                      isEditing={data.isEditing}
                      path={folderPath}
                    />

                    {data?.metadata?.size && (
                      <span className="text-[#878787]">
                        {formatSize(data.metadata.size)}
                      </span>
                    )}
                  </div>
                </HoverCardTrigger>
                {filePreviewSupported && (
                  <HoverCardContent className="w-[273px] h-[358px] p-0 overflow-hidden">
                    <FilePreview
                      width={280}
                      height={365}
                      src={`/api/proxy?filePath=vault/${teamId}/${filepath}`}
                      downloadUrl={`/api/download/file?path=${filepath}&filename=${data.name}`}
                      name={data.name}
                      type={data?.metadata?.mimetype}
                    />
                  </HoverCardContent>
                )}
              </HoverCard>
            </TableCell>
            <TableCell>
              {data?.created_at ? format(new Date(data.created_at), "Pp") : "-"}
            </TableCell>
            <TableCell>
              <div className="flex justify-between">
                <span>
                  {data?.updated_at
                    ? format(new Date(data.updated_at), "Pp")
                    : "-"}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Icons.MoreHoriz />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-42"
                    sideOffset={10}
                    align="end"
                  >
                    {!data.isFolder && (
                      <></>
                    )}

                    {/* {!disableActions && !isDefaultFolder && (
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                    )} */}
                    <DropdownMenuItem>
                      {data.isFolder ? (
                        <a
                          href={`/api/download/zip?path=${filepath}/${data.name}&filename=${data.name}`}
                          download
                          className="truncate w-full"
                        >
                          Download
                        </a>
                      ) : (
                        <a
                          href={`/api/download/file?path=${folderPath}/${data.name}&filename=${data.name}`}
                          download
                          className="truncate w-full"
                        >
                          Download
                        </a>
                      )}
                    </DropdownMenuItem>
                    {/*   {!disableActions && !isDefaultFolder && (
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                    )} */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        </ContextMenuTrigger>

        <ContextMenuContent>

          {/* {!disableActions && (
            <ContextMenuItem onClick={handleCreateFolder}>
              Create folder
            </ContextMenuItem>
          )} */}
          <ContextMenuItem>
            {data.isFolder ? (
              <a
                href={`/api/download/zip?path=${filepath}/${data.name}&filename=${data.name}`}
                download
                className="truncate"
              >
                Download
              </a>
            ) : (
              <a
                href={`/api/download/file?path=${folderPath}/${data.name}&filename=${data.name}`}
                download
                className="truncate"
              >
                Download
              </a>
            )}
          </ContextMenuItem>
          {/* {!disableActions && !isDefaultFolder && (
            <AlertDialogTrigger asChild>
              <ContextMenuItem className="text-destructive">
                Delete
              </ContextMenuItem>
            </AlertDialogTrigger>
          )} */}
        </ContextMenuContent>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteItem}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </ContextMenu>
    </AlertDialog>
  );
}
