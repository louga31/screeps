import { RoleHandler } from "./roles";

export const roleHarvester: RoleHandler = {
	body: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
	count: 2,
    run: function (creep: Creep) {
        if (creep.store.getFreeCapacity() > 0) {
            const sources = creep.pos.findClosestByPath(FIND_SOURCES);

			if(!sources) {
				console.error('No sources found')
				return
			}

            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                creep.moveTo(40, 8, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
}
