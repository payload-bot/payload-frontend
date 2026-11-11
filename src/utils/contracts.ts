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

export interface Server {
  name: string;
  id: string;
  icon: string | null;

  botName: string;

  enableSnipeForEveryone: boolean;
  language: string;
  prefix: string;
  pushcartPoints: number;

  webhook: Webhook;

  channels: Array<{ id: string; name: string }>;

  commands: GuildCommands;
}

export interface Webhook {
  id: string;
  value: string;
  createdAt: Date;
}

export interface GuildCommands {
  restrictions: string[];
  commands: string[];
  autoResponses: string[];
}
