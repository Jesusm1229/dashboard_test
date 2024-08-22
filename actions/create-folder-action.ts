"use server";


import { revalidateTag } from "next/cache";
import { authActionClient } from "./safe-action";
import { createFolderSchema } from "./schema";
import { createFolder } from "@/packages/supabase/src/utils/storage";

export const createFolderAction = authActionClient
  .schema(createFolderSchema)
  .action(async ({ parsedInput: value, ctx: { user, supabase } }) => {
    const data = await createFolder(supabase, {
      bucket: "vault",
      path: [user.id, value.path],
      name: value.name,
    });

    revalidateTag(`vault_${user.id}`);

    return data;
  });
