import { RoleHandler } from "./roles";

export const roleBuilder: RoleHandler = {
	body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
	count: 2,
	run: function (creep: Creep) {
		if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.working = false;
			creep.say('🔄 harvest');
		}

		if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
			creep.memory.working = true;
			creep.say('🚧 build');
		}

		if (creep.memory.working) {
			const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length) {
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
				}
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
