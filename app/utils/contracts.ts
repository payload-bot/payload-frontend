export interface User {
  id: string;
  steamId: string | null;
  roles: Role[];
  username: string;
  lastUpdate: string;
  notificationsLevel: number;
  avatar: string;
  pushcartPoints: number;
}

export enum Role {
  Admin = "admin",
  BetaTester = "betatester",
}

export interface ServerList {
  isPayloadIn: boolean;
  owner: boolean;
  id: string;
  name: string;
  permissions: string;
  icon: string;
  features: string[];
}
