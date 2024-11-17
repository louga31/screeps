import { roleBuilder } from "./builder";
import { roleHarvester } from "./harvester";
import { roleUpgrader } from "./upgrader";

export type RoleHandler = {
	body: BodyPartConstant[];
	count: number;
	run: (creep: Creep) => void;
}

export enum Roles {
	HARVESTER = 'harvester',
	BUILDER = 'builder',
	UPGRADER = 'upgrader'
}

export const roleHandlers: Record<Roles, RoleHandler> = {
	[Roles.HARVESTER]: roleHarvester,
	[Roles.BUILDER]: roleBuilder,
	[Roles.UPGRADER]: roleUpgrader,
}
