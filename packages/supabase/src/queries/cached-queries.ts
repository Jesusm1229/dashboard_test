import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import { createClient } from "../client/server";
import {
  type GetVaultParams,
  getTeamMembersQuery,
  getTeamUserQuery,
  getTeamsByUserIdQuery,
  getUserQuery,
  getVaultQuery,
} from "../queries";


export const getSession = cache(async () => {
  const supabase = createClient();

  return supabase.auth.getSession();
});

export const getUser = async () => {
  const {
    data: { session },
  } = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const supabase = createClient();

  return unstable_cache(
    async () => {
      return getUserQuery(supabase, userId);
    },
    ["user", userId],
    {
      tags: [`user_${userId}`],
      revalidate: 180,
    },
  )(userId);
};

export const getTeamUser = async () => {
  const supabase = createClient();
  const { data } = await getUser();

  return unstable_cache(
    async () => {
      return getTeamUserQuery(supabase, {
        userId: data.id,
        teamId: data.team_id,
      });
    },
    ["team", "user", data.id],
    {
      tags: [`team_user_${data.id}`],
      revalidate: 180,
    },
  )(data.id);
};

export const getTeamMembers = async () => {
  const supabase = createClient();

  const user = await getUser();
  const teamId = user?.data?.team_id;

  if (!teamId) {
    return null;
  }

  return unstable_cache(
    async () => {
      return getTeamMembersQuery(supabase, teamId);
    },
    ["team_members", teamId],
    {
      tags: [`team_members_${teamId}`],
      revalidate: 180,
    },
  )(teamId);
};


export const getVault = async (params: GetVaultParams) => {
  const supabase = createClient();

  const user = await getUser();
  const userId = user?.data?.id; // Get userId instead of teamId

  if (!userId) {
    return ''; // Return empty string if userId is not available
  }

  return unstable_cache(
    async () => {
      // Fetch vault data for the specific user
      return getVaultQuery(supabase, { ...params, userId });
    },
    ["vault", userId], // Cache key includes userId
    {
      tags: [`vault_${userId}`], // Cache tags include userId
      revalidate: 3600, // Cache revalidation period
    },
  )(params);
};

export const getTeams = async () => {
  const supabase = createClient();

  const user = await getUser();
  const userId = user?.data?.id;

  if (!userId) {
    return;
  }

  return unstable_cache(
    async () => {
      return getTeamsByUserIdQuery(supabase, userId);
    },
    ["teams", userId],
    {
      tags: [`teams_${userId}`],
      revalidate: 180,
    },
  )();
};

