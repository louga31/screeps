import { roleHandlers, Roles } from "./roles/roles";
import { ErrorMapper } from "./utils/ErrorMapper";
import * as _ from 'lodash';

declare global {
    interface Memory {
        uuid: number;
		// deno-lint-ignore no-explicit-any
        log: any;
    }

    interface CreepMemory {
        role: string;
        room: string;
        working: boolean;
    }

    namespace NodeJS {
        interface Global {
			// deno-lint-ignore no-explicit-any
            log: any;
        }
    }
}

export const loop = ErrorMapper.wrapLoop(() => {
    console.log(`Current game tick is ${Game.time}`);

    // Automatically delete memory of missing creeps
    for (const name in Memory.creeps) {
        if (!(name in Game.creeps)) {
            delete Memory.creeps[name];
        }
    }


	// Spawn creeps
	for (const roleName in Roles) {
		const role = Roles[roleName as keyof typeof Roles]
		const handler = roleHandlers[role as Roles]
		const creeps = _.filter(Game.creeps, (creep) => creep.memory.role == roleName)

		if (creeps.length < handler.count) {
			const newName = _.capitalize(roleName) + Game.time;

			console.log(`Spawning new ${roleName}: ${newName}`)
			Game.spawns['Spawn1'].spawnCreep(handler.body, newName, {memory: {role: roleName, room: 'toto', working: false}})
		}
	}

	// Display creep spawning
	if(Game.spawns['Spawn1'].spawning) {
        const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

	// Run creeps
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];

        for (const roleName in Roles) {
			const role = Roles[roleName as keyof typeof Roles]
			const handler = roleHandlers[role as Roles]

			if (creep.memory.role == roleName) {
				handler.run(creep);
			}
		}
    }

});
