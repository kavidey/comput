export type latex = number | ''; //string | number;

export interface state {
	mass: latex;
	velocity: latex;
	momentum: latex;
	kinetic_energy: latex;
}

export interface collision_object {
	before: state;
	after: state;
}

export function collisionObjectFactory(): collision_object {
	return {
		before: {
			mass: null,
			velocity: null,
			momentum: null,
			kinetic_energy: null
		},
		after: {
			mass: null,
			velocity: null,
			momentum: null,
			kinetic_energy: null
		}
	};
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function state_to_sympy(state: state) {
	return {
		m: convertIfNotNull(state.mass),
		v: convertIfNotNull(state.velocity),
		p: convertIfNotNull(state.momentum),
		e: convertIfNotNull(state.kinetic_energy)
	};
}

export function sympy_to_state(sympy: { m: latex; v: latex; p: latex; e: latex }): state {
	return {
		mass: sympy.m,
		velocity: sympy.v,
		momentum: sympy.p,
		kinetic_energy: sympy.e
	};
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function collision_object_to_sympy(
	obj1: collision_object,
	obj2: collision_object,
	relative_speed: latex,
	relative_speed_positive: boolean
) {
	return {
		m1i: convertIfNotNull(obj1.before.mass),
		m1f: convertIfNotNull(obj1.after.mass),
		v1i: convertIfNotNull(obj1.before.velocity),
		v1f: convertIfNotNull(obj1.after.velocity),
		p1i: convertIfNotNull(obj1.before.momentum),
		p1f: convertIfNotNull(obj1.after.momentum),
		e1i: convertIfNotNull(obj1.before.kinetic_energy),
		e1f: convertIfNotNull(obj1.after.kinetic_energy),
		m2i: convertIfNotNull(obj2.before.mass),
		m2f: convertIfNotNull(obj2.after.mass),
		v2i: convertIfNotNull(obj2.before.velocity),
		v2f: convertIfNotNull(obj2.after.velocity),
		p2i: convertIfNotNull(obj2.before.momentum),
		p2f: convertIfNotNull(obj2.after.momentum),
		e2i: convertIfNotNull(obj2.before.kinetic_energy),
		e2f: convertIfNotNull(obj2.after.kinetic_energy),
		re: convertIfNotNull(relative_speed),
		re_positive: relative_speed_positive
	};
}

function convertIfNotNull(value: latex): number {
	if (value == 0) {
		return 0;
	} else if (value === null || value === '') {
		return null;
	} else {
		return Number(value);
	}
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function sympy_to_collision_object(sympy_obj): {
	obj1: collision_object;
	obj2: collision_object;
	relative_speed: latex;
} {
	return {
		obj1: {
			before: {
				mass: sympy_obj.m1i,
				velocity: sympy_obj.v1i,
				momentum: sympy_obj.p1i,
				kinetic_energy: sympy_obj.e1i
			},
			after: {
				mass: sympy_obj.m1f,
				velocity: sympy_obj.v1f,
				momentum: sympy_obj.p1f,
				kinetic_energy: sympy_obj.e1f
			}
		},
		obj2: {
			before: {
				mass: sympy_obj.m2i,
				velocity: sympy_obj.v2i,
				momentum: sympy_obj.p2i,
				kinetic_energy: sympy_obj.p2i
			},
			after: {
				mass: sympy_obj.m2f,
				velocity: sympy_obj.v2f,
				momentum: sympy_obj.p2f,
				kinetic_energy: sympy_obj.e2f
			}
		},
		relative_speed: sympy_obj.re
	};
}
