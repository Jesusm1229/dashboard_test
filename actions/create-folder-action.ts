"use server";


import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { createFolderSchema } from "./schema";
import { createFolder } from "@/packages/supabase/src/utils/storage";

export const createFolderAction = authActionClient
  .schema(createFolderSchema)
  .metadata({
    name: "create-folder",
    track: {
      event: LogEvents.CreateFolder.name,
      channel: LogEvents.CreateFolder.channel,
    },
  })
  .action(async ({ parsedInput: value, ctx: { user, supabase } }) => {
    const data = await createFolder(supabase, {
      bucket: "vault",
      path: [user.team_id, value.path],
      name: value.name,
    });

    revalidateTag(`vault_${user.team_id}`);

    return data;
  });
