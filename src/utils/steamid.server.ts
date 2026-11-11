import { ID } from "@node-steam/id";

export function validateSteamId(id?: string | null) {
  if (!id) {
    return false;
  }

  const newId = new ID(id);

  if (!newId) {
    return false;
  }

  if (!newId.isValid()) {
    return false;
  }

  return newId.steam64();
}
