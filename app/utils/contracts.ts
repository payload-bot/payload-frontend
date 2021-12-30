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
