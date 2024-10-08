"use server";


import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { deleteFolderSchema } from "./schema";
import { deleteFolder } from "@/packages/supabase/src/utils/storage";

export const deleteFolderAction = authActionClient
  .schema(deleteFolderSchema)
  /* .metadata({
    name: "delete-folder",
    track: {
      event: LogEvents.DeleteFolder.name,
      channel: LogEvents.DeleteFolder.channel,
    },
  }) */
  .action(async ({ parsedInput: { path }, ctx: { user, supabase } }) => {
    await deleteFolder(supabase, {
      bucket: "vault",
      path: [user.id, ...path],
    });

    revalidateTag(`vault_${user.id}`);

    return;
  });
