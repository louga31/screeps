import { RoleHandler } from "./roles";

export const roleUpgrader: RoleHandler = {
	body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
	count: 2,
	run: function (creep: Creep) {
		if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.working = false;
			creep.say('🔄 harvest');
		}

		if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
			creep.memory.working = true;
			creep.say('⚡ upgrade');
		}

		if (creep.memory.working) {
			if (creep.upgradeController(creep.room.controller!) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller!, { visualizePathStyle: { stroke: '#ffffff' } });
			}
		}
		else {
			const sources = creep.pos.findClosestByPath(FIND_SOURCES);

			if (!sources) {
				console.error('No sources found')
				return
			}

			if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
			}
		}
	}
}
