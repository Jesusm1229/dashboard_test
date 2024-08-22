"use server";

import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { deleteFileSchema } from "./schema";
import { remove } from "@/packages/supabase/src/utils/storage";

export const deleteFileAction = authActionClient
  .schema(deleteFileSchema)
  /* .metadata({
    name: "delete-file",
    track: {
      event: LogEvents.DeleteFile.name,
      channel: LogEvents.DeleteFile.channel,
    },
  }) */
  .action(async ({ parsedInput: { path, id }, ctx: { user, supabase } }) => {
    await remove(supabase, {
      bucket: "vault",
      path: [user.id, ...path],
    });

    revalidateTag(`vault_${user.id}`);

    return id;
  });
