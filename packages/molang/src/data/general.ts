import { MolangFunction } from './molang-function';

/**General molang data*/
export namespace General {
  /**The collection of math functions*/
  export const Math: MolangFunction[] = [
    {
      id: 'abs',
      documentation: 'Absolute value of value',
      parameters: [{ id: 'value' }],
    },
    {
      id: 'acos',
      documentation: 'arccos of value',
      parameters: [{ id: 'value' }],
    },
    {
      id: 'asin',
      documentation: 'arcsin of value',
      parameters: [{ id: 'value' }],
    },
    {
      id: 'atan',
      documentation: 'arctan of value',
      parameters: [{ id: 'value' }],
    },
    {
      id: 'atan2',
      documentation: 'arctan of y/x. NOTE: the order of arguments!',
      parameters: [{ id: 'y' }, { id: 'x' }],
    },
    {
      id: 'ceil',
      documentation: 'Round value up to nearest integral number',
      parameters: [{ id: 'value' }],
    },
    {
      id: 'clamp',
      documentation: 'Clamp value to between min and max inclusive',
      parameters: [{ id: 'value' }, { id: 'min' }, { id: 'max' }],
    },
    {
      id: 'copy_sign',
      documentation: 'Returns A with the sign of B',
      parameters: [{ id: 'A' }, { id: 'B' }]
    },
    {
      id: 'cos',
      documentation: 'Cosine (in degrees) of value',
      parameters: [{ id: 'value' }],
    },
    {
      documentation:
        "Returns the sum of 'num' random numbers, each with a value from low to high`. Note: the generated random numbers are not integers like normal dice. For that, use die_roll_integer`.",
      id: 'die_roll',
      parameters: [{ id: 'num' }, { id: 'low' }, { id: 'high' }],
    },
    {
      documentation:
        "Returns the sum of 'num' random integer numbers, each with a value from low to high`. Note: the generated random numbers are integers like normal dice.",
      id: 'die_roll_integer',
      parameters: [{ id: 'num' }, { id: 'low' }, { id: 'high' }],
    },
    {
      id: 'ease_in_back',
      documentation: 'Output goes from start to end via 0_to_1, overshooting backward before accelerating into the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_bounce',
      documentation: 'Output goes from start to end via 0_to_1, starting with bounce oscillations and settling into the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_circ',
      documentation: 'Output goes from start to end via 0_to_1, starting slow and accelerating along a circular curve toward the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_cubic',
      documentation: 'Output goes from start to end via 0_to_1, starting slow and accelerating rapidly toward the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_elastic',
      documentation: 'Output goes from start to end via 0_to_1, starting with elastic oscillations before accelerating into the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_expo',
      documentation: 'Output goes from start to end via 0_to_1, starting slow and accelerating extremely rapidly toward the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_out_back',
      documentation: 'Output goes from start to end via 0_to_1, overshooting at both start and end, with smoother change in the middle',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_out_bounce',
      documentation: 'Output goes from start to end via 0_to_1, starting and ending with bounce oscillations, smoother in the middle',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_out_circ',
      documentation: 'Output goes from start to end via 0_to_1, starting and ending slow, with circular acceleration and deceleration in the middle',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_out_cubic',
      documentation: 'Output goes from start to end via 0_to_1, starting slow, accelerating rapidly in the middle, then slowing again at the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_out_elastic',
      documentation: 'Output goes from start to end via 0_to_1, oscillating elastically at both start and end, with stable change in the middle',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_out_expo',
      documentation: 'Output goes from start to end via 0_to_1, starting and ending slow, with extremely rapid change in the middle',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_out_quad',
      documentation: 'Output goes from start to end via 0_to_1, starting slow, accelerating in the middle, then slowing again at the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_out_quart',
      documentation: 'Output goes from start to end via 0_to_1, starting slow, accelerating very rapidly in the middle, then slowing again at the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_out_quint',
      documentation: 'Output goes from start to end via 0_to_1, starting slow, accelerating extremely rapidly in the middle, then slowing again at the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_out_sine',
      documentation: 'Output goes from start to end via 0_to_1, starting and ending slow, with smoother change in the middle',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_quad',
      documentation: 'Output goes from start to end via 0_to_1, starting slow and accelerating toward the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_quart',
      documentation: 'Output goes from start to end via 0_to_1, starting slow and accelerating very rapidly toward the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_quint',
      documentation: 'Output goes from start to end via 0_to_1, starting slow and accelerating extremely rapidly toward the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_in_sine',
      documentation: 'Output goes from start to end via 0_to_1, starting slow and accelerating smoothly toward the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_out_back',
      documentation: 'Output goes from start to end via 0_to_1, overshooting past the end before settling into it',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_out_bounce',
      documentation: 'Output goes from start to end via 0_to_1, approaching the end with bounce oscillations that diminish over time',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_out_circ',
      documentation: 'Output goes from start to end via 0_to_1, starting fast and decelerating along a circular curve toward the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_out_cubic',
      documentation: 'Output goes from start to end via 0_to_1, starting fast and decelerating rapidly toward the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_out_elastic',
      documentation: 'Output goes from start to end via 0_to_1, overshooting the end with elastic oscillations before settling',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_out_expo',
      documentation: 'Output goes from start to end via 0_to_1, starting extremely fast and decelerating gradually toward the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_out_quad',
      documentation: 'Output goes from start to end via 0_to_1, starting fast and decelerating toward the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_out_quart',
      documentation: 'Output goes from start to end via 0_to_1, starting fast and decelerating very rapidly toward the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_out_quint',
      documentation: 'Output goes from start to end via 0_to_1, starting fast and decelerating extremely rapidly toward the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'ease_out_sine',
      documentation: 'Output goes from start to end via 0_to_1, starting fast and decelerating smoothly toward the end',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1', range: { min: 0, max: 1 }, type: "float" }]
    },
    {
      id: 'exp',
      documentation: "Calculates e to the value'th power",
      parameters: [{ id: 'value' }],
    },
    {
      id: 'floor',
      documentation: 'Round value down to nearest integral number',
      parameters: [{ id: 'value' }],
    },
    {
      documentation:
        'Useful for simple smooth curve interpolation using one of the Hermite Basis ids: `3t^2 - 2t^3`. Note that while any valid float is a valid input, this id works best in the range [0,1].',
      id: 'hermite_blend',
      parameters: [{ id: 'value' }],
    },
    {
      id: 'inverse_lerp',
      documentation: 'Returns the normalized progress between start and end given value',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: 'value' }],
    },
    {
      id: 'lerp',
      documentation: 'Lerp from start to end via 0_to_1',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1' }],
    },
    {
      id: 'lerprotate',
      documentation: 'Lerp the shortest direction around a circle from start degrees to end degrees via 0_to_1',
      parameters: [{ id: 'start' }, { id: 'end' }, { id: '0_to_1' }],
    },
    {
      id: 'ln',
      documentation: 'Natural logarithm of value',
      parameters: [{ id: 'value' }],
    },
    {
      id: 'max',
      documentation: 'Return highest value of A or B',
      parameters: [{ id: 'A' }, { id: 'B' }],
    },
    {
      id: 'min',
      documentation: 'Return lowest value of A or B',
      parameters: [{ id: 'A' }, { id: 'B' }],
    },
    {
      id: 'min_angle',
      documentation: 'Minimize angle magnitude (in degrees) into the range [-180, 180]',
      parameters: [{ id: 'value' }],
    },
    {
      id: 'mod',
      documentation: 'Return the remainder of value / denominator',
      parameters: [{ id: 'value' }, { id: 'denominator' }],
    },
    {
      id: 'pi',
      documentation: 'Returns the float representation of the constant pi.',
    },
    {
      id: 'pow',
      documentation: "Elevates `base` to the `exponent`'th power",
      parameters: [{ id: 'base' }, { id: 'exponent' }],
    },
    {
      id: 'random',
      documentation: 'Random value between low and high inclusive',
      parameters: [{ id: 'low' }, { id: 'high' }],
    },
    {
      id: 'random_integer',
      documentation: 'Random integer value between low and high inclusive',
      parameters: [{ id: 'low' }, { id: 'high' }],
    },
    {
      id: 'round',
      documentation: 'Round value to nearest integral number',
      parameters: [{ id: 'value' }],
    },
    {
      id: 'sign',
      documentation: 'Returns 1 if value is positive, -1 otherwise',
      parameters: [{ id: 'value' }],
    },
    {
      id: 'sin',
      documentation: 'Sine (in degrees) of value',
      parameters: [{ id: 'value' }],
    },
    {
      id: 'sqrt',
      documentation: 'Square root of value',
      parameters: [{ id: 'value' }],
    },
    {
      id: 'trunc',
      documentation: 'Round value towards zero',
      parameters: [{ id: 'value' }],
    },
  ];

  /**
   * Gets the math functions for the given id
   * @param id The id to get the queries for
   * @returns The queries for the given id
   */
  export function getMath(id: string): MolangFunction | undefined {
    for (let I = 0; I < General.Math.length; I++) {
      const elem = General.Math[I];
      if (elem.id === id) return elem;
    }

    return undefined;
  }

  /**The collection of queries*/
  export const Queries: MolangFunction[] = [
    {
      id: 'above_top_solid',
      documentation:
        'Returns the height of the block immediately above the highest solid block at the input (x,z) position',
      parameters: [
        {
          id: 'x',
          documentation: 'The x position of the block',
        },
        {
          id: 'z',
          documentation: 'The z position of the block',
        },
      ],
    },
    {
      id: 'actor_count',
      documentation: 'Returns the number of actors rendered in the last frame',
    },
    {
      id: 'all',
      documentation:
        'Requires at least 3 arguments. Evaluates the first argument, then returns 1.0 if all of the following arguments evaluate to the same value as the first. Otherwise it returns 0.0.',
      parameters: [
        { id: 'evaluate', documentation: 'The value to evaluate' },
        { id: 'first', documentation: 'The first value to compare' },
        { id: 'second', documentation: 'The first value to compare' },
      ],
    },
    {
      id: 'all_animations_finished',
      documentation:
        'Only valid in an animation controller. Returns 1.0 if all animations in the current animation controller state have played through at least once, else it returns 0.0.',
    },
    {
      id: 'all_tags',
      documentation: 'Returns if the item or block has all of the tags specified',
    },
    {
      id: 'anger_level',
      documentation:
        'Returns the anger level of the actor [0,n]. On errors or if the actor has no anger level, returns 0. Available on the Server only.',
    },
    {
      id: 'anim_time',
      documentation:
        'Returns the time in seconds since the current animation started, else 0.0 if not called within an animation',
    },
    {
      id: 'any',
      documentation:
        'Requires at least 3 arguments. Evaluates the first argument, then returns 1.0 if any of the following arguments evaluate to the same value as the first. Otherwise it returns 0.0.',
      parameters: [
        { id: 'evaluate', documentation: 'The value to evaluate' },
        { id: 'first', documentation: 'The first value to compare' },
        { id: 'second', documentation: 'The first value to compare' },
      ],
    },
    {
      id: 'any_animation_finished',
      documentation:
        'Only valid in an animation controller. Returns 1.0 if any animation in the current animation controller state has played through at least once, else it returns 0.0.',
    },
    {
      id: 'any_tag',
      documentation: 'Returns if the item or block has any of the tags specified',
    },
    {
      id: 'approx_eq',
      documentation: 'Returns 1.0 if all of the arguments are within 0.000000 of each other, else 0.0.',
    },
    {
      id: 'armor_color_slot',
      documentation:
        'Takes the armor slot index as a parameter, and returns the color of the armor in the requested slot',
      parameters: [
        {
          id: 'slot',
          documentation: 'The armor slot index, (0 is helmet, 1 is chestplace, 2 is leggings, 3 is boots)',
        },
        {
          id: 'channel',
          documentation: 'The color channel to return, (0 is red, 1 is green, 2 is blue, 3 is alpha)',
        },
      ],
    },
    {
      id: 'armor_material_slot',
      documentation:
        'Takes the armor slot index as a parameter, and returns the armor material type in the requested armor slot',
    },
    {
      id: 'armor_texture_slot',
      documentation: 'Takes the armor slot index as a parameter, and returns the texture type of the requested slot',
    },
    {
      id: 'average_frame_time',
      documentation:
        "Returns the time in *seconds* of the average frame time over the last 'n' frames. If an argument is passed, it is assumed to be the number of frames in the past that you wish to query. `query.average_frame_time` (or the equivalent `query.average_frame_time(0)`) will return the frame time of the frame before the current one. `query.average_frame_time(1)` will return the average frame time of the previous two frames. Currently we store the history of the last 30 frames, although note that this may change in the future. Asking for more frames will result in only sampling the number of frames stored.",
    },
    {
      id: 'base_swing_duration',
      documentation: 'Returns the duration of the mob\'s swing/attack animation, determined by the carried item and unmodified by effects applied on the mob. To access the swing/attack animation progress, use "variable.attack_time" instead.'
    },
    {
      id: 'block_face',
      documentation:
        'Returns the block face for this (only valid for certain triggers such as placing blocks, or interacting with block) (Down=0.0, Up=1.0, North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).',
    },
    {
      id: 'block_has_all_tags',
      documentation:
        'Takes a world-origin-relative position and one or more tag names, and returns either 0 or 1 based on if the block at that position has all of the tags provided.',
      parameters: [
        {
          id: 'x',
          documentation: 'World-origin-relative position on the x axis',
          type: 'float',
        },
        {
          id: 'y',
          documentation: 'World-origin-relative position on the y axis',
          type: 'float',
        },
        {
          id: 'z',
          documentation: 'World-origin-relative position on the z axis',
          type: 'float',
        },
        {
          id: 'tag',
          documentation: 'tag name to check',
          type: 'string',
          repeatable: true,
        },
      ],
    },
    {
      id: 'block_has_any_tags',
      documentation:
        'Takes a world-origin-relative position and one or more tag names, and returns either 0 or 1 based on if the block at that position has any of the tags provided.',
      parameters: [
        {
          id: 'x',
          documentation: 'World-origin-relative position on the x axis',
          type: 'float',
        },
        {
          id: 'y',
          documentation: 'World-origin-relative position on the y axis',
          type: 'float',
        },
        {
          id: 'z',
          documentation: 'World-origin-relative position on the z axis',
          type: 'float',
        },
        {
          id: 'tag',
          documentation: 'tag name to check',
          type: 'string',
          repeatable: true,
        },
      ],
    },
    {
      id: 'block_neighbor_has_all_tags',
      documentation:
        'Takes a block-relative position and one or more tag names, and returns either 0 or 1 based on if the block at that position has all of the tags provided.',
      parameters: [
        {
          id: 'x',
          documentation: 'block-relative position on the x axis',
          type: 'float',
        },
        {
          id: 'y',
          documentation: 'block-relative position on the y axis',
          type: 'float',
        },
        {
          id: 'z',
          documentation: 'block-relative position on the z axis',
          type: 'float',
        },
        {
          id: 'tag',
          documentation: 'tag name to check',
          type: 'string',
          repeatable: true,
        },
      ],
    },
    {
      id: 'block_neighbor_has_any_tags',
      documentation:
        'Takes a block-relative position and one or more tag names, and returns either 0 or 1 based on if the block at that position has any of the tags provided.',
      parameters: [
        {
          id: 'x',
          documentation: 'block-relative position on the x axis',
          type: 'float',
        },
        {
          id: 'y',
          documentation: 'block-relative position on the y axis',
          type: 'float',
        },
        {
          id: 'z',
          documentation: 'block-relative position on the z axis',
          type: 'float',
        },
        {
          id: 'tag',
          documentation: 'tag name to check',
          type: 'string',
          repeatable: true,
        },
      ],
    },
    {
      id: 'block_property',
      documentation: 'Returns the value of the associated Blocks Block State',
      deprecated: 'No longer available in pack min_engine_version 1.20.40.',
    },
    {
      id: 'block_state',
      documentation: "Returns the value of the associated block's Block State.",
      parameters: [
        {
          id: 'property',
          documentation: "The name of the property to query. examples: `query.block_state('foo' == false)`",
        },
      ],
    },
    {
      id: 'blocking',
      documentation: 'Returns 1.0 if the entity is blocking, else it returns 0.0.',
    },
    {
      id: 'body_x_rotation',
      documentation: 'Returns the body pitch rotation if called on an actor, else it returns 0.0.',
    },
    {
      id: 'body_y_rotation',
      documentation: 'Returns the body yaw rotation if called on an actor, else it returns 0.0.',
    },
    {
      id: 'bone_aabb',
      documentation:
        "Returns the axis aligned bounding box of a bone as a struct with members '.min', '.max', along with '.x', '.y', and '.z' values for each.",
    },
    {
      id: 'bone_orientation_matrix',
      documentation:
        'Takes the name of the bone as an argument. Returns the bone orientation (as a matrix) of the desired bone provided it exists in the queryable geometry of the mob, else this returns the identity matrix and throws a content error.',
      parameters: [
        {
          id: 'bone',
          documentation: 'Bone name',
        },
      ],
    },
    {
      id: 'bone_orientation_trs',
      documentation:
        "TRS stands for Translate/Rotate/Scale. Takes the name of the bone as an argument. Returns the bone orientation matrix decomposed into the component translation/rotation/scale parts of the desired bone provided it exists in the queryable geometry of the mob, else this returns the identity matrix and throws a content error. The returned value is returned as a variable of type 'struct' with members '.t', '.r', and '.s', each with members '.x', '.y', and '.z'",
      parameters: [
        {
          id: 'bone',
          documentation: 'Bone name',
        },
      ],
    },
    {
      id: 'bone_origin',
      documentation:
        "Returns the initial (from the .geo) pivot of a bone as a struct with members '.x', '.y', and '.z'.",
    },
    {
      id: 'bone_rotation',
      documentation:
        "Returns the initial (from the .geo) rotation of a bone as a struct with members '.x', '.y', and '.z' in degrees.",
    },
    {
      id: 'camera_distance_range_lerp',
      documentation:
        'Takes two distances (any order) and return a number from 0 to 1 based on the camera distance between the two ranges clamped to that range. For example, `query.camera_distance_range_lerp(10, 20)` will return 0 for any distance less than or equal to 10, 0.2 for a distance of 12, 0.5 for 15, and 1 for 20 or greater. If you pass in (20, 10), a distance of 20 will return 0.0.',
      parameters: [
        { id: 'A', documentation: 'The first distance' },
        { id: 'B', documentation: 'The second distance' },
      ],
    },
    {
      id: 'camera_rotation',
      documentation:
        'Returns the rotation of the camera. Requires one argument representing the rotation axis you would like (`0 for x`, `1 for y`)',
      parameters: [{ id: 'axis', documentation: '0 for x, 1 for y' }],
    },
    {
      id: 'can_climb',
      documentation: 'Returns 1.0 if the entity can climb, else it returns 0.0.',
    },
    {
      id: 'can_damage_nearby_mobs',
      documentation: 'Returns 1.0 if the entity can damage nearby mobs, else it returns 0.0.',
    },
    {
      id: 'can_dash',
      documentation: 'Returns 1.0 if the entity can dash, else it returns 0.0.',
    },
    {
      id: 'can_fly',
      documentation: 'Returns 1.0 if the entity can fly, else it returns 0.0.',
    },
    {
      id: 'can_power_jump',
      documentation: 'Returns 1.0 if the entity can power jump, else it returns 0.0.',
    },
    {
      id: 'can_swim',
      documentation: 'Returns 1.0 if the entity can swim, else it returns 0.0.',
    },
    {
      id: 'can_walk',
      documentation: 'Returns 1.0 if the entity can walk, else it returns 0.0.',
    },
    {
      id: 'cape_flap_amount',
      documentation:
        'Returns value between 0.0 and 1.0 with 0.0 meaning cape is fully down and 1.0 is cape is fully up',
    },
    {
      id: 'cardinal_facing',
      documentation:
        'Returns the current facing of the player (Down=0.0, Up=1.0, North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).',
    },
    {
      id: 'cardinal_facing_2d',
      documentation:
        'Returns the current facing of the player ignoring up/down part of the direction (North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).',
    },
    {
      id: 'cardinal_player_facing',
      documentation:
        'Returns the current facing of the player (Down=0.0, Up=1.0, North=2.0, South=3.0, West=4.0, East=5.0, Undefined=6.0).',
    },
    {
      id: 'client_max_render_distance',
      documentation:
        'Returns the max render distance in chunks of the current client. Available on the Client (Resource Packs) only.',
    },
    {
      id: 'client_memory_tier',
      documentation:
        "Returns a number representing the client RAM memory tier, 0 = 'SuperLow', 1 = 'Low', 2 = 'Mid', 3 = 'High', or 4 = 'SuperHigh'. Available on the Client (Resource Packs) only.",
    },
    {
      id: 'combine_entities',
      documentation:
        'Combines any valid entity references from all arguments into a single array. Note that order is not preserved, and duplicates and invalid values are removed.',
    },
    {
      id: 'cooldown_time',
      documentation:
        'Returns the total cooldown time in seconds for the item held or worn by the specified equipment slot name (and if required second numerical slot id), otherwise returns 0. Uses the same name and id that the replaceitem command takes when querying entities.',
    },
    {
      id: 'cooldown_time_remaining',
      documentation:
        'Returns the cooldown time remaining in seconds for specified cooldown type or the item held or worn by the specified equipment slot name (and if required second numerical slot id), otherwise returns 0. Uses the same name and id that the replaceitem command takes when querying entities. Returns highest cooldown if no parameters are supplied.',
    },
    {
      id: 'count',
      documentation:
        'Counts the number of things passed to it (arrays are counted as the number of elements they contain; non-arrays count as 1).',
    },
    {
      id: 'current_squish_value',
      documentation: "Returns the squish value for the current entity, or 0.0 if this doesn't make sense",
    },
    {
      id: 'dash_cooldown_progress',
      documentation: 'Returns dash cooldown progress if the entity can dash, else it returns 0.0.',
      deprecated:
        'Deprecated after 1.20.3. Please see camel.entity.json script.pre_animation for example of how to now process dash cooldown',
    },
    { id: 'day', documentation: 'Returns the day of the current level.' },
    {
      id: 'death_ticks',
      documentation: 'Returns the elapsed ticks since the mob started dying.',
    },
    {
      id: 'debug_output',
      documentation: 'debug log a value to the output debug window for builds that have one',
      parameters: [{ id: 'value', documentation: 'The value to log' }],
    },
    {
      id: 'delta_time',
      documentation: 'Returns the time in seconds since the previous frame',
    },
    {
      id: 'distance_from_camera',
      documentation: 'Returns the distance of the root of this actor or particle emitter from the camera',
    },
    {
      id: 'effect_emitter_count',
      documentation: "Returns the total number of active emitters of the callee's particle effect type",
    },
    {
      id: 'effect_particle_count',
      documentation: "Returns the total number of active particles of the callee's particle effect type",
    },
    {
      id: 'equipment_count',
      documentation: 'Returns the equipment count for an actor',
    },
    {
      id: 'equipped_item_all_tags',
      documentation:
        "takes a slot name followed by any tag you want to check for in the form of 'tag_name' and returns 1 if all of the tags are on that equipped item, 0 otherwise",
      parameters: [
        { id: 'slot_name', documentation: 'equipment slot name', type: 'string' },
        { id: 'tag', documentation: 'tag name to check', type: 'string', repeatable: true },
      ],
    },
    {
      id: 'equipped_item_any_tag',
      documentation:
        "takes a slot name followed by any tag you want to check for in the form of 'tag_name' and returns 0 if none of the tags are on that equipped item or 1 if at least 1 tag exists",
      parameters: [
        { id: 'slot_name', documentation: 'equipment slot name', type: 'string' },
        { id: 'tag', documentation: 'tag name to check', type: 'string', repeatable: true },
      ],
    },
    {
      id: 'equipped_item_is_attachable',
      documentation:
        "Takes the desired hand slot as a parameter (0 or 'main_hand' for main hand, 1 or 'off_hand' for off hand), and returns whether the item is an attachable or not.",
    },
    {
      id: 'eye_target_x_rotation',
      documentation: 'Returns the X eye rotation of the entity if it makes sense, else it returns 0.0.',
    },
    {
      id: 'eye_target_y_rotation',
      documentation: 'Returns the Y eye rotation of the entity if it makes sense, else it returns 0.0.',
    },
    {
      id: 'facing_target_to_range_attack',
      documentation:
        'Returns 1.0 if the entity is attacking from range (i.e. minecraft:behavior.ranged_attack), else it returns 0.0.',
    },
    {
      id: 'frame_alpha',
      documentation: 'Returns the ratio (from 0 to 1) of how much between AI ticks this frame is being rendered',
    },
    {
      id: 'get_actor_info_id',
      documentation: 'Returns the integer id of an actor by its string name',
    },
    {
      id: 'get_animation_frame',
      documentation: 'Returns the current texture of the item',
    },
    {
      id: 'get_default_bone_pivot',
      documentation: 'Gets specified axis of the specified bone orientation pivot',
    },
    {
      id: 'get_locator_offset',
      documentation: 'Gets specified axis of the specified locator offset',
    },
    {
      id: 'get_root_locator_offset',
      documentation: 'Gets specified axis of the specified locator offset of the root model',
    },
    {
      id: 'graphics_mode_is_any',
      documentation:
        "Takes in one or more arguments ('simple', 'fancy', 'deferred', 'raytraced'). If the graphics mode of the client matches any of the arguments, return 1.0. Available on the Client (Resource Packs) only.",
      parameters: [
        { id: 'mode', documentation: "graphics mode ('simple', 'fancy', 'deferred', 'raytraced')", type: 'string', repeatable: true },
      ],
    },
    {
      id: 'ground_speed',
      documentation: 'Returns the ground speed of the entity in metres/second',
    },
    {
      id: 'had_component_group',
      documentation:
        "Usable only in behavior packs when determining the default value for an entity's Property. Requires one string argument. If the entity is being loaded from data that was last saved with a component_group with the specified name, returns 1.0, otherwise returns 0.0. The purpose of this query is to allow entity definitions to change and still be able to load the correct state of entities.",
    },
    {
      id: 'has_any_family',
      documentation: 'Returns 1 if the entity has any of the specified families, else 0.',
    },
    {
      id: 'has_armor_slot',
      documentation:
        'Takes the armor slot index as a parameter, and returns 1.0 if the entity has armor in the requested slot, else it returns 0.0.',
    },
    {
      id: 'has_biome_tag',
      documentation: 'Returns whether or not a Block Placement Target has a specific biome tag.',
    },
    {
      id: 'has_block_property',
      documentation: 'Returns 1.0 if the associated block has the given block property or 0.0 if not.',
      deprecated: 'No longer available in pack min_engine_version 1.20.40.',
    },
    {
      id: 'has_block_state',
      documentation: 'Returns 1.0 if the associated block has the given block state or 0.0 if not.',
    },
    {
      id: 'has_cape',
      documentation: 'Returns 1.0 if the player has a cape, else it returns 0.0.',
    },
    {
      id: 'has_collision',
      documentation: 'Returns 1.0 if the entity has collisions enabled, else it returns 0.0.',
    },
    {
      id: 'has_dash_cooldown',
      documentation: 'Returns 1.0 if the entity has cooldown on its dash, else it returns 0.0.',
    },
    {
      id: 'has_gravity',
      documentation: 'Returns 1.0 if the entity is affected by gravity, else it returns 0.0.',
    },
    {
      id: 'has_head_gear',
      documentation:
        'Returns boolean whether an Actor has an item in their head armor slot or not, or false if no actor in current context',
    },
    {
      id: 'has_owner',
      documentation: 'Returns true if the entity has an owner ID else it returns false',
    },
    {
      id: 'has_player_rider',
      documentation: 'Returns 1 if the entity has a player riding it in any seat, else it returns 0.',
    },
    {
      id: 'has_property',
      documentation:
        'Takes one argument: the name of the property on the Actor. Returns 1.0 if a property with the given name exists, 0 otherwise.',
    },
    {
      id: 'has_rider',
      documentation: 'Returns 1.0 if the entity has a rider, else it returns 0.0.',
    },
    {
      id: 'has_target',
      documentation: 'Returns 1.0 if the entity has a target, else it returns 0.0.',
    },
    {
      id: 'head_roll_angle',
      documentation: 'Returns the roll angle of the head of the entity if it makes sense, else it returns 0.0.',
    },
    {
      id: 'head_x_rotation',
      documentation:
        'Takes one argument as a parameter. Returns the nth head x rotation of the entity if it makes sense, else it returns 0.0.',
    },
    {
      id: 'head_y_rotation',
      documentation:
        'Takes one argument as a parameter. Returns the nth head y rotation of the entity if it makes sense, else it returns 0.0.',
    },
    {
      id: 'health',
      documentation: "Returns the health of the entity, or 0.0 if it doesn't make sense to call on this entity.",
    },
    {
      id: 'heartbeat_interval',
      documentation:
        'Returns the heartbeat interval of the actor in seconds. Returns 0 when the actor has no heartbeat.',
    },
    {
      id: 'heartbeat_phase',
      documentation:
        'Returns the heartbeat phase of the actor. 0.0 if at start of current heartbeat, 1.0 if at the end. Returns 0 on errors or when the actor has no heartbeat. Available on the Client (Resource Packs) only.',
    },
    { id: 'heightmap', documentation: 'Queries Height Map' },
    {
      id: 'hurt_direction',
      documentation: 'Returns the hurt direction for the actor, otherwise returns 0.',
    },
    {
      id: 'hurt_time',
      documentation: 'Returns the hurt time for the actor, otherwise returns 0.',
    },
    {
      id: 'in_range',
      documentation:
        'Requires 3 numerical arguments: some value, a minimum, and a maximum. If the first argument is between the minimum and maximum (inclusive), returns 1.0. Otherwise returns 0.0.',
      parameters: [
        { id: 'evaluate', documentation: 'The value to evaluate' },
        {
          id: 'minimum',
          documentation: 'The first value to compare, inclusive',
        },
        {
          id: 'maximum',
          documentation: 'The second value to compare, inclusive',
        },
      ],
    },
    {
      id: 'invulnerable_ticks',
      documentation:
        'Returns the number of ticks of invulnerability the entity has left if it makes sense, else it returns 0.0.',
    },
    {
      id: 'is_admiring',
      documentation: 'Returns 1.0 if the entity is admiring, else it returns 0.0.',
    },
    {
      id: 'is_alive',
      documentation: "Returns 1.0 if the entity is alive, and 0.0 if it's dead",
    },
    {
      id: 'is_angry',
      documentation: 'Returns 1.0 if the entity is angry, else it returns 0.0.',
    },
    {
      id: 'is_attached',
      documentation:
        'Returns 1.0 if the entity is attached to another entity (such as being held or worn), else it will return 0.0. Available only with resource packs.',
    },
    {
      id: 'is_attached_to_entity',
      documentation: 'Returns 1.0 if the actor is attached to an entity, else it will return 0.0.',
    },
    {
      id: 'is_avoiding_block',
      documentation: 'Returns 1.0 if the entity is fleeing from a block, else it returns 0.0.',
    },
    {
      id: 'is_avoiding_mobs',
      documentation: 'Returns 1.0 if the entity is fleeing from mobs, else it returns 0.0.',
    },
    {
      id: 'is_baby',
      documentation: 'Returns 1.0 if the entity is a baby, else it returns 0.0.',
    },
    {
      id: 'is_breathing',
      documentation: 'Returns 1.0 if the entity is breathing, else it returns 0.0.',
    },
    {
      id: 'is_bribed',
      documentation: 'Returns 1.0 if the entity has been bribed, else it returns 0.0.',
    },
    {
      id: 'is_carrying_block',
      documentation: 'Returns 1.0 if the entity is carrying a block, else it returns 0.0.',
    },
    {
      id: 'is_casting',
      documentation: 'Returns 1.0 if the entity is casting, else it returns 0.0.',
    },
    {
      id: 'is_celebrating',
      documentation: 'Returns 1.0 if the entity is celebrating, else it returns 0.0.',
    },
    {
      id: 'is_celebrating_special',
      documentation: 'Returns 1.0 if the entity is doing a special celebration, else it returns 0.0.',
    },
    {
      id: 'is_charged',
      documentation: 'Returns 1.0 if the entity is charged, else it returns 0.0.',
    },
    {
      id: 'is_charging',
      documentation: 'Returns 1.0 if the entity is charging, else it returns 0.0.',
    },
    {
      id: 'is_chested',
      documentation: 'Returns 1.0 if the entity has chests attached to it, else it returns 0.0.',
    },
    {
      id: 'is_cooldown_category',
      documentation:
        'Returns 1.0 if the specified held or worn item has the specified cooldown category, otherwise returns 0.0. First argument is the cooldown name to check for, second argument is the equipment slot name, and if required third argument is the numerical slot id. For second and third arguments, uses the same name and id that the replaceitem command takes when querying entities.',
    },
    {
      id: 'is_crawling',
      documentation: 'Returns 1.0 if the entity is crawling, else it returns 0.0.',
    },
    {
      id: 'is_critical',
      documentation: 'Returns 1.0 if the entity is critical, else it returns 0.0.',
    },
    {
      id: 'is_croaking',
      documentation: 'Returns 1.0 if the entity is croaking, else it returns 0.0.',
    },
    {
      id: 'is_dancing',
      documentation: 'Returns 1.0 if the entity is dancing, else it returns 0.0.',
    },
    {
      id: 'is_delayed_attacking',
      documentation: 'Returns 1.0 if the entity is attacking using the delayed attack, else it returns 0.0.',
    },
    {
      id: 'is_digging',
      documentation: 'Returns 1.0 if the entity is digging, else it returns 0.0.',
    },
    {
      id: 'is_eating',
      documentation: 'Returns 1.0 if the entity is eating, else it returns 0.0.',
    },
    {
      id: 'is_eating_mob',
      documentation: 'Returns 1.0 if the entity is eating a mob, else it returns 0.0.',
    },
    {
      id: 'is_elder',
      documentation: 'Returns 1.0 if the entity is an elder version of it, else it returns 0.0.',
    },
    {
      id: 'is_emerging',
      documentation: 'Returns 1.0 if the entity is emerging, else it returns 0.0.',
    },
    {
      id: 'is_emoting',
      documentation: 'Returns 1.0 if the entity is emoting, else it returns 0.0.',
    },
    {
      id: 'is_enchanted',
      documentation: 'Returns 1.0 if the entity is enchanted, else it returns 0.0.',
    },
    {
      id: 'is_feeling_happy',
      documentation: 'Returns 1.0 if the entity is feeling happy, else it returns 0.0.',
    },
    {
      id: 'is_fire_immune',
      documentation: 'Returns 1.0 if the entity is immune to fire, else it returns 0.0.',
    },
    {
      id: 'is_first_person',
      documentation: 'Returns 1.0 if the entity is being rendered in first person mode, else it returns 0.0.',
    },
    {
      id: 'is_ghost',
      documentation: 'Returns 1.0 if an entity is a ghost, else it returns 0.0.',
    },
    {
      id: 'is_gliding',
      documentation: 'Returns 1.0 if the entity is gliding, else it returns 0.0.',
    },
    {
      id: 'is_grazing',
      documentation: 'Returns 1.0 if the entity is grazing, or 0.0 if not',
    },
    {
      id: 'is_idling',
      documentation: 'Returns 1.0 if the entity is idling, else it returns 0.0.',
    },
    {
      id: 'is_ignited',
      documentation: 'Returns 1.0 if the entity is ignited, else it returns 0.0.',
    },
    {
      id: 'is_illager_captain',
      documentation: 'Returns 1.0 if the entity is an illager captain, else it returns 0.0.',
    },
    {
      id: 'is_in_contact_with_water',
      documentation:
        'Returns 1.0 if the entity is in contact with any water (water, rain, splash water bottle), else it returns 0.0.',
    },
    {
      id: 'is_in_lava',
      documentation: 'Returns 1.0 if the entity is in lava, else it returns 0.0.',
    },
    {
      id: 'is_in_love',
      documentation: 'Returns 1.0 if the entity is in love, else it returns 0.0.',
    },
    {
      id: 'is_in_ui',
      documentation: 'Returns 1.0 if the entity is rendered as part of the UI, else it returns 0.0.',
    },
    {
      id: 'is_in_water',
      documentation: 'Returns 1.0 if the entity is in water, else it returns 0.0.',
    },
    {
      id: 'is_in_water_or_rain',
      documentation: 'Returns 1.0 if the entity is in water or rain, else it returns 0.0.',
    },
    {
      id: 'is_interested',
      documentation: 'Returns 1.0 if the entity is interested, else it returns 0.0.',
    },
    {
      id: 'is_invisible',
      documentation: 'Returns 1.0 if the entity is invisible, else it returns 0.0.',
    },
    {
      id: 'is_item_equipped',
      documentation:
        "takes one optional hand slot as a parameter (0 or 'main_hand' for main hand, 1 or 'off_hand' for off hand), and returns 1.0 if there is an item in the requested slot (defaulting to the main hand if no parameter is supplied), otherwise returns 0.0.",
      parameters: [
        {
          id: 'slot',
          documentation: "0 or 'main_hand' for main hand, 1 or 'off_hand' for off hand",
        },
      ],
    },
    {
      id: 'is_item_name_any',
      documentation:
        "Takes an equipment slot name (see the replaceitem command) and an optional slot index value. After that, takes one or more full name (with 'namespace:') strings to check for. Returns 1.0 if an item in the specified slot has any of the specified names, otherwise returns 0.0. An empty string '' can be specified to check for an empty slot. Note that querying slot.enderchest, slot.saddle, slot.armor, or slot.chest will only work in behavior packs. A preferred query to query.get_equipped_item_name, as it can be adjusted by Mojang to avoid breaking content if names are changed.",
      parameters: [
        { id: 'slot_name', documentation: 'equipment slot name', type: 'string' },
        { id: 'slot_index', documentation: 'optional slot index value', type: 'float' },
        { id: 'item', documentation: 'item name to check', type: 'string', repeatable: true },
      ],
    },

    {
      id: 'is_jump_goal_jumping',
      documentation: 'Returns 1.0 if the entity is doing a jump goal jump, else it returns 0.0.',
    },
    {
      id: 'is_jumping',
      documentation: 'Returns 1.0 if the entity is jumping, else it returns 0.0.',
    },
    {
      id: 'is_laying_down',
      documentation: 'Returns 1.0 if the entity is laying down, else it returns 0.0.',
    },
    {
      id: 'is_laying_egg',
      documentation: 'Returns 1.0 if the entity is laying an egg, else it returns 0.0.',
    },
    {
      id: 'is_leashed',
      documentation: 'Returns 1.0 if the entity is leashed to something, else it returns 0.0.',
    },
    {
      id: 'is_levitating',
      documentation: 'Returns 1.0 if the entity is levitating, else it returns 0.0.',
    },
    {
      id: 'is_lingering',
      documentation: 'Returns 1.0 if the entity is lingering, else it returns 0.0.',
    },
    {
      id: 'is_local_player',
      documentation:
        'Takes no arguments. Returns 1.0 if the entity is the local player for the current game window, else it returns 0.0. In splitscreen returns 0.0 for the other local players for other views. Always returns 0.0 if used in a behavior pack.',
    },
    {
      id: 'is_moving',
      documentation: 'Returns 1.0 if the entity is moving, else it returns 0.0.',
    },
    {
      id: 'is_name_any',
      documentation:
        "Takes one or more arguments. If the entity's name is any of the specified string values, returns 1.0. Otherwise returns 0.0. A preferred query to query.get_name, as it can be adjusted by Mojang to avoid breaking content if names are changed.",
      parameters: [
        { id: 'name', documentation: 'possible entity name', type: 'string', repeatable: true },
      ],
    },
    {
      id: 'is_on_fire',
      documentation: 'Returns 1.0 if the entity is on fire, else it returns 0.0.',
    },
    {
      id: 'is_on_ground',
      documentation: 'Returns 1.0 if the entity is on the ground, else it returns 0.0.',
    },
    {
      id: 'is_on_screen',
      documentation:
        'Returns 1.0 if this is called on an entity at a time when it is known if it is on screen, else it returns 0.0.',
    },
    {
      id: 'is_onfire',
      documentation: 'Returns 1.0 if the entity is on fire, else it returns 0.0.',
    },
    {
      id: 'is_orphaned',
      documentation: 'Returns 1.0 if the entity is orphaned, else it returns 0.0.',
    },
    {
      id: 'is_owner_identifier_any',
      documentation:
        'Takes one or more arguments. Returns whether the root actor identifier is any of the specified strings. A preferred query to query.owner_identifier, as it can be adjusted by Mojang to avoid breaking content if names are changed.',
      parameters: [
        { id: 'name', documentation: 'possible entity name', type: 'string', repeatable: true },
      ],
    },
    {
      id: 'is_persona_or_premium_skin',
      documentation: 'Returns 1.0 if the player has a persona or permium skin, else it returns 0.0.',
    },
    {
      id: 'is_playing_dead',
      documentation: 'Returns 1.0 if the entity is playing dead, else it returns 0.0.',
    },
    {
      id: 'is_powered',
      documentation: 'Returns 1.0 if the entity is powered, else it returns 0.0.',
    },
    {
      id: 'is_pregnant',
      documentation: 'Returns 1.0 if the entity is pregnant, else it returns 0.0.',
    },
    {
      id: 'is_ram_attacking',
      documentation: 'Returns 1.0 if the entity is using a ram attack, else it returns 0.0.',
    },
    {
      id: 'is_resting',
      documentation: 'Returns 1.0 if the entity is resting, else it returns 0.0.',
    },
    {
      id: 'is_riding',
      documentation: 'Returns 1.0 if the entity is riding, else it returns 0.0.',
    },
    {
      id: 'is_riding_any_entity_of_type',
      documentation: 'Returns whether or not the entity is currently riding an entity of any of the designated types.',
    },
    {
      id: 'is_rising',
      documentation: 'Returns 1.0 if the entity is rising, else it returns 0.0.',
    },
    {
      id: 'is_roaring',
      documentation: 'Returns 1.0 if the entity is currently roaring, else it returns 0.0.',
    },
    {
      id: 'is_rolling',
      documentation: 'Returns 1.0 if the entity is rolling, else it returns 0.0.',
    },
    {
      id: 'is_saddled',
      documentation: 'Returns 1.0 if the entity has a saddle, else it returns 0.0.',
    },
    {
      id: 'is_scared',
      documentation: 'Returns 1.0 if the entity is scared, else it returns 0.0.',
    },
    {
      id: 'is_scenting',
      documentation: 'Returns 1.0 if the entity is scenting, else it returns 0.0.',
    },
    {
      id: 'is_selected_item',
      documentation: 'Returns true if the player has selected an item in the inventory, else it returns 0.0.',
    },
    {
      id: 'is_shaking',
      documentation: 'Returns 1.0 if the entity is casting, else it returns 0.0.',
    },
    {
      id: 'is_shaking_wetness',
      documentation: 'Returns 1.0 if the entity is shaking water off, else it returns 0.0.',
    },
    {
      id: 'is_sheared',
      documentation: 'Returns 1.0 if the entity is able to be sheared and is sheared, else it returns 0.0.',
    },
    {
      id: 'is_shield_powered',
      documentation: 'Returns 1.0f if the entity has an active powered shield if it makes sense, else it returns 0.0.',
    },
    {
      id: 'is_silent',
      documentation: 'Returns 1.0 if the entity is silent, else it returns 0.0.',
    },
    {
      id: 'is_sitting',
      documentation: 'Returns 1.0 if the entity is sitting, else it returns 0.0.',
    },
    {
      id: 'is_sleeping',
      documentation: 'Returns 1.0 if the entity is sleeping, else it returns 0.0.',
    },
    {
      id: 'is_sneaking',
      documentation: 'Returns 1.0 if the entity is sneaking, else it returns 0.0.',
    },
    {
      id: 'is_sneezing',
      documentation: 'Returns 1.0 if the entity is sneezing, else it returns 0.0.',
    },
    {
      id: 'is_sniffing',
      documentation: 'Returns 1.0 if the entity is sniffing, else it returns 0.0.',
    },
    {
      id: 'is_sonic_boom',
      documentation: 'Returns 1.0 if the entity is using sonic boom, else it returns 0.0.',
    },
    {
      id: 'is_spectator',
      documentation: 'Returns 1.0 if the entity is spectator, else it returns 0.0.',
    },
    {
      id: 'is_sprinting',
      documentation: 'Returns 1.0 if the entity is sprinting, else it returns 0.0.',
    },
    {
      id: 'is_stackable',
      documentation: 'Returns 1.0 if the entity is stackable, else it returns 0.0.',
    },
    {
      id: 'is_stalking',
      documentation: 'Returns 1.0 if the entity is stalking, else it returns 0.0.',
    },
    {
      id: 'is_standing',
      documentation: 'Returns 1.0 if the entity is standing, else it returns 0.0.',
    },
    {
      id: 'is_stunned',
      documentation: 'Returns 1.0 if the entity is currently stunned, else it returns 0.0.',
    },
    {
      id: 'is_swimming',
      documentation: 'Returns 1.0 if the entity is swimming, else it returns 0.0.',
    },
    {
      id: 'is_tamed',
      documentation: 'Returns 1.0 if the entity is tamed, else it returns 0.0.',
    },
    {
      id: 'is_transforming',
      documentation: 'Returns 1.0 if the entity is transforming, else it returns 0.0.',
    },
    {
      id: 'is_using_item',
      documentation: 'Returns 1.0 if the entity is using an item, else it returns 0.0.',
    },
    {
      id: 'is_wall_climbing',
      documentation: 'Returns 1.0 if the entity is climbing a wall, else it returns 0.0.',
    },
    {
      id: 'item_in_use_duration',
      documentation:
        "Returns the amount of time an item has been in use in seconds up to the maximum duration, else 0.0 if it doesn't make sense",
    },
    {
      id: 'item_is_charged',
      documentation:
        "takes one optional hand slot as a parameter (0 or 'main_hand' for main hand, 1 or `off_hand` for off hand), and returns 1.0 if the item is charged in the requested slot (defaulting to the main hand if no parameter is supplied), otherwise returns 0.0.",
      parameters: [
        {
          id: 'slot',
          documentation: "0 or 'main_hand' for main hand, 1 or 'off_hand' for off hand",
        },
      ],
    },
    {
      id: 'item_max_use_duration',
      documentation: "Returns the maximum amount of time the item can be used, else 0.0 if it doesn't make sense",
    },
    {
      id: 'item_remaining_use_duration',
      documentation:
        "Returns the amount of time an item has left to use, else 0.0 if it doesn't make sense. Item queried is specified by the slot name `main_hand` or `off_hand`. Time remaining is normalized using the normalization value, only if one is given, else it is returned in seconds.",
    },
    {
      id: 'item_slot_to_bone_name',
      documentation:
        'query.item_slot_to_bone_name requires one parameter: the name of the equipment slot. This id returns the name of the bone this entity has mapped to that slot.',
    },
    {
      id: 'key_frame_lerp_time',
      documentation: 'Returns the ratio between the previous and next key frames',
    },
    {
      id: 'last_frame_time',
      documentation:
        "Returns the time in *seconds* of the last frame.  If an argument is passed, it is assumed to be the number of frames in the past that you wish to query.  'query.last_frame_time' (or the equivalent 'query.last_frame_time(0)') will return the frame time of the frame before the current one.  'query.last_frame_time(1)' will return the frame time of two frames ago.  Currently we store the history of the last 30 frames, although note that this may change in the future.  Passing an index more than the available data will return the oldest frame stored.",
    },
    {
      id: 'last_hit_by_player',
      documentation:
        'Returns 1.0 if the entity was last hit by the player, else it returns 0.0. If called by the client always returns 0.0.',
    },
    {
      id: 'last_input_mode_is_any',
      documentation:
        "Takes one or more arguments ('keyboard_and_mouse', 'touch', or 'gamepad'). If the last input used is any of the specified string values, returns 1.0. Otherwise returns 0.0. Available on the Client (Resource Packs) only.",
      parameters: [
        { id: 'mode', documentation: "input mode ('keyboard_and_mouse', 'touch', or 'gamepad')", type: 'string', repeatable: true },
      ],
    },
    {
      id: 'lie_amount',
      documentation: 'Returns the lie down amount for the entity',
    },
    {
      id: 'life_span',
      documentation: 'Returns the limited life span of an entity, or 0.0 if it lives forever',
    },
    {
      id: 'life_time',
      documentation:
        'Returns the time in seconds since the current animation started, else 0.0 if not called within an animation',
    },
    {
      id: 'lod_index',
      documentation:
        "Takes an array of distances and returns the zero - based index of which range the actor is in based on distance from the camera.For example, 'query.lod_index(10, 20, 30)' will return 0, 1, or 2 based on whether the mob is less than 10, 20, or 30 units away from the camera, or it will return 3 if it is greater than 30.",
    },
    {
      id: 'log',
      documentation: 'debug log a value to the content log',
      parameters: [{ id: 'value', documentation: 'The value to log' }],
    },
    {
      id: 'main_hand_item_max_duration',
      documentation:
        'Returns the use time maximum duration for the main hand item if it makes sense, else it returns 0.0.',
    },
    {
      id: 'main_hand_item_use_duration',
      documentation: 'Returns the use time for the main hand item.',
    },
    { id: 'mark_variant', documentation: "Returns the entity's mark variant" },
    {
      id: 'max_durability',
      documentation: 'Returns the max durability an item can take',
    },
    {
      id: 'max_health',
      documentation:
        "Returns the maximum health of the entity, or 0.0 if it doesn't make sense to call on this entity.",
    },
    {
      id: 'max_trade_tier',
      documentation: 'Returns the maximum trade tier of the entity if it makes sense, else it returns 0.0.',
    },
    {
      id: 'maximum_frame_time',
      documentation:
        "Returns the time in *seconds* of the most expensive frame over the last 'n' frames.  If an argument is passed, it is assumed to be the number of frames in the past that you wish to query.  'query.maximum_frame_time' (or the equivalent 'query.maximum_frame_time(0)') will return the frame time of the frame before the current one.  'query.maximum_frame_time(1)' will return the maximum frame time of the previous two frames.  Currently we store the history of the last 30 frames, although note that this may change in the future.  Asking for more frames will result in only sampling the number of frames stored.",
    },
    {
      id: 'minimum_frame_time',
      documentation:
        "Returns the time in *seconds* of the least expensive frame over the last 'n' frames.  If an argument is passed, it is assumed to be the number of frames in the past that you wish to query.  'query.minimum_frame_time' (or the equivalent 'query.minimum_frame_time(0)') will return the frame time of the frame before the current one.  'query.minimum_frame_time(1)' will return the minimum frame time of the previous two frames.  Currently we store the history of the last 30 frames, although note that this may change in the future.  Asking for more frames will result in only sampling the number of frames stored.",
    },
    {
      id: 'model_scale',
      documentation: 'Returns the scale of the current entity',
    },
    {
      id: 'modified_distance_moved',
      documentation:
        'Returns the total distance the entity has moved horizontally in meters (since the entity was last loaded, not necessarily since it was originally created) modified along the way by status flags such as is_baby or on_fire',
    },
    {
      id: 'modified_move_speed',
      documentation: 'Returns the current walk speed of the entity modified by status flags such as is_baby or on_fire',
    },
    {
      id: 'modified_swing_duration',
      documentation: 'Returns the duration of the mob\'s swing/attack animation, determined by the carried item and modified by effects applied on the mob. To access the swing/attack animation progress, use "variable.attack_time" instead.',
    },
    {
      id: 'moon_brightness',
      documentation:
        'Returns the brightness of the moon (FULL_MOON=1.0, WANING_GIBBOUS=0.75, FIRST_QUARTER=0.5, WANING_CRESCENT=0.25, NEW_MOON=0.0, WAXING_CRESCENT=0.25, LAST_QUARTER=0.5, WAXING_GIBBOUS=0.75).',
    },
    {
      id: 'moon_phase',
      documentation:
        'Returns the phase of the moon (FULL_MOON=0, WANING_GIBBOUS=1, FIRST_QUARTER=2, WANING_CRESCENT=3, NEW_MOON=4, WAXING_CRESCENT=5, LAST_QUARTER=6, WAXING_GIBBOUS=7).',
    },
    {
      id: 'movement_direction',
      documentation: 'Returns the specified axis of the normalized position delta of the entity',
      parameters: [{ id: 'axis', documentation: '0 for x, 1 for y, 2 for z' }],
    },
    { id: 'noise', documentation: 'Queries Perlin Noise Map' },
    {
      id: 'on_fire_time',
      documentation: 'Returns the time that the entity is on fire, else it returns 0.0.',
    },
    {
      id: 'out_of_control',
      documentation: 'Returns 1.0 if the entity is out of control, else it returns 0.0.',
    },
    {
      id: 'player_level',
      documentation: 'Returns the players level if the actor is a player, otherwise returns 0.',
    },
    {
      id: 'position_delta',
      documentation:
        'Returns the position delta for an actor. Takes one argument that represents the desired axis (0 for x-axis, 1 for y-axis, 2 for z-axis).',
      parameters: [{ id: 'axis', documentation: '0 for x, 1 for y, 2 for z' }],
    },
    {
      id: 'position',
      documentation:
        'Returns the absolute position of an actor. Takes one argument that represents the desired axis (0 for x-axis, 1 for y-axis, 2 for z-axis).',
      parameters: [{ id: 'axis', documentation: '0 for x, 1 for y, 2 for z' }],
    },
    {
      id: 'previous_squish_value',
      documentation: "Returns the previous squish value for the current entity, or 0.0 if this doesn't make sense",
    },
    {
      id: 'property',
      documentation:
        'Takes one argument: the name of the property on the entity. Returns the value of that property if it exists, else 0.0 if not.',
    },
    {
      id: 'relative_block_has_all_tags',
      documentation:
        'Takes an entity-relative position and one or more tag names, and returns either 0 or 1 based on if the block at that position has all of the tags provided.',
      parameters: [
        { id: 'x', documentation: 'entity-relative position on the x axis', type: 'float' },
        { id: 'y', documentation: 'entity-relative position on the y axis', type: 'float' },
        { id: 'z', documentation: 'entity-relative position on the z axis', type: 'float' },
        { id: 'tag', documentation: 'tag name to check', type: 'string', repeatable: true },
      ],
    },
    {
      id: 'relative_block_has_any_tag',
      documentation:
        'Takes an entity-relative position and one or more tag names, and returns either 0 or 1 based on if the block at that position has any of the tags provided.',
      parameters: [
        { id: 'x', documentation: 'entity-relative position on the x axis', type: 'float' },
        { id: 'y', documentation: 'entity-relative position on the y axis', type: 'float' },
        { id: 'z', documentation: 'entity-relative position on the z axis', type: 'float' },
        { id: 'tag', documentation: 'tag name to check', type: 'string', repeatable: true },
      ],
    },
    {
      id: 'ride_body_x_rotation',
      documentation: 'Returns the body pitch world-rotation of the ride an entity, else it returns 0.0.',
    },
    {
      id: 'ride_body_y_rotation',
      documentation: 'Returns the body yaw world-rotation of the ride an entity, else it returns 0.0.',
    },
    {
      id: 'ride_head_x_rotation',
      documentation: 'Returns the hea x world-rotation of the ride an entity, else it returns 0.0.',
    },
    {
      id: 'ride_head_y_rotation',
      documentation:
        'Takes one optional argument as a parameter. Returns the head y world-rotation of the ride of an entity, else it returns 0.0. First parameter only for horses, zombie horses, skeleton horses, donkeys and mules that clamps rotation in degrees.',
    },
    {
      id: 'rider_body_x_rotation',
      documentation:
        'Returns the body pitch world-rotation of a valid rider at the provided index if called on an entity, else it returns 0.0.',
    },
    {
      id: 'rider_body_y_rotation',
      documentation:
        'Returns the body yaw world-rotation of a valid rider at the provided index if called on an entity, else it returns 0.0.',
    },
    {
      id: 'rider_head_x_rotation',
      documentation:
        'Takes one argument as a parameter. Returns the head x world-rotation of the rider entity at the provided index, else it returns 0.0.',
    },
    {
      id: 'rider_head_y_rotation',
      documentation:
        'Takes one or two arguments as parameters. Returns the head y world-rotation of the rider entity at the provided index, else it returns 0.0. Horses, zombie horses, skeleton horses, donkeys and mules require a second parameter that clamps rotation in degrees.',
    },
    {
      id: 'remaining_durability',
      documentation: 'Returns the how much durability an item has remaining',
    },
    {
      id: 'roll_counter',
      documentation: 'Returns the roll counter of the entity',
    },
    {
      id: 'rotation_to_camera',
      documentation:
        'Returns the rotation required to aim at the camera. Requires one argument representing the rotation axis you would like (0 for x, 1 for y)',
      parameters: [{ id: 'axis', documentation: '0 for x, 1 for y' }],
    },
    {
      id: 'scoreboard',
      documentation:
        'Takes one argument - the name of the scoreboard entry for this entity. Returns the specified scoreboard value for this entity. Available only with behavior packs.',
    },
    {
      id: 'server_memory_tier',
      documentation:
        "Returns a number representing the server RAM memory tier, 0 = 'SuperLow', 1 = 'Low', 2 = 'Mid', 3 = 'High', or 4 = 'SuperHigh'. Available on the server side (Behavior Packs) only.",
    },
    {
      id: 'shake_angle',
      documentation: 'Returns the shaking angle of the entity if it makes sense, else it returns 0.0.',
    },
    {
      id: 'shake_time',
      documentation: 'Returns the shake time of the entity.',
    },
    {
      id: 'shield_blocking_bob',
      documentation: 'Returns the how much the offhand shield should translate down when blocking and being hit.',
    },
    {
      id: 'show_bottom',
      documentation: "Returns 1.0 if we render the entity's bottom, else it returns 0.0.",
    },
    {
      id: 'sit_amount',
      documentation: 'Returns the current sit amount of the entity',
    },
    { id: 'skin_id', documentation: "Returns the entity's skin ID" },
    {
      id: 'sleep_rotation',
      documentation: 'Returns the rotation of the bed the player is sleeping on.',
    },
    {
      id: 'sneeze_counter',
      documentation: 'Returns the sneeze counter of the entity',
    },
    {
      id: 'spellcolor',
      documentation: 'Returns the entity spell colour if it makes sense, else it returns 0.0.',
    },
    {
      id: 'standing_scale',
      documentation: 'Returns the scale of how standing up the entity is',
    },
    {
      id: 'state_time',
      documentation:
        'Only valid in an animation controller. Returns the time in seconds in the current animation controller state.',
    },
    {
      id: 'structural_integrity',
      documentation: 'Returns the structural integrity for the actor, otherwise returns 0.',
    },
    {
      id: 'surface_particle_color',
      documentation:
        "Returns the particle color for the block located in the surface below the actor (scanned up to 10 blocks down). The struct contains '.r' '.g' '.b' and '.a' members, each 0.0 to 1.0. If no actor is specified or if no surface is found, each member value is set to 0.0. Available on the Client (Resource Packs) only.",
    },
    {
      id: 'surface_particle_texture_coordinate',
      documentation:
        "Returns the texture coordinate for generating particles for the block located in the surface below the actor (scanned up to 10 blocks down) in a struct with 'u' and 'v' keys. If no actor is specified or if no surface is found, u and v will be 0.0. Available on the Client (Resource Packs) only.",
    },
    {
      id: 'surface_particle_texture_size',
      documentation:
        'Returns the texture size for generating particles for the block located in the surface below the actor (scanned up to 10 blocks down). If no actor is specified or if no surface is found, each member value will be 0.0. Available on the Client (Resource Packs) only.',
    },
    { id: 'swell_amount', documentation: 'Returns how swollen the entity is' },
    {
      id: 'swelling_dir',
      documentation: 'Returns the swelling direction of the entity if it makes sense, else it returns 0.0.',
    },
    {
      id: 'swim_amount',
      documentation: 'Returns the amount the current entity is swimming',
    },
    {
      id: 'tail_angle',
      documentation: 'Returns the angle of the tail of the entity if it makes sense, else it returns 0.0.',
    },
    {
      id: 'target_x_rotation',
      documentation:
        "Returns the x rotation required to aim at the entity's current target if it has one, else it returns 0.0.",
    },
    {
      id: 'target_y_rotation',
      documentation:
        "Returns the y rotation required to aim at the entity's current target if it has one, else it returns 0.0.",
    },
    {
      id: 'texture_frame_index',
      documentation: 'Returns the icon index of the experience orb',
    },
    {
      id: 'time_of_day',
      documentation:
        'Returns the time of day (midnight=0.0, sunrise=0.25, noon=0.5, sunset=0.75) of the dimension the entity is in.',
    },
    {
      id: 'time_since_last_vibration_detection',
      documentation:
        'Returns the time in seconds since the last vibration detected by the actor. On errors or if no vibration has been detected yet, returns -1. Available on the Client (Resource Packs) only.',
    },
    {
      id: 'time_stamp',
      documentation: 'Returns the current time stamp of the level',
    },
    {
      id: 'timer_flag_1',
      documentation: 'Returns 1.0 if behavior.timer_flag_1 is running, else it returns 0.0.',
    },
    {
      id: 'timer_flag_2',
      documentation: 'Returns 1.0 if behavior.timer_flag_2 is running, else it returns 0.0.',
    },
    {
      id: 'timer_flag_3',
      documentation: 'Returns 1.0 if behavior.timer_flag_3 is running, else it returns 0.0.',
    },
    {
      id: 'total_emitter_count',
      documentation: 'Returns the total number of active emitters in the world',
    },
    {
      id: 'total_particle_count',
      documentation: 'Returns the total number of active particles in the world',
    },
    {
      id: 'touch_only_affects_hotbar',
      documentation:
        'Returns 1.0 if the touch input only affects the touchbar, otherwise returns 0.0. Available on the Client (Resource Packs) only.',
    },
    {
      id: 'trade_tier',
      documentation: 'Returns the trade tier of the entity if it makes sense, else it returns 0.0.',
    },
    {
      id: 'unhappy_counter',
      documentation: 'Returns how unhappy the entity is',
    },
    { id: 'variant', documentation: "Returns the entity's variant index" },
    {
      id: 'vertical_speed',
      documentation: 'Returns the speed of the entity up or down in metres/second, where positive is up',
    },
    {
      id: 'walk_distance',
      documentation: 'Returns the total distance traveled by an entity while on the ground and not sneaking.',
    },
    {
      id: 'wing_flap_position',
      documentation: "Returns the wing flap position of the entity, or 0.0 if this doesn't make sense",
    },
    {
      id: 'wing_flap_speed',
      documentation: "Returns the wing flap speed of the entity, or 0.0 if this doesn't make sense",
    },
    { id: 'yaw_speed', documentation: "Returns the entity's yaw speed" },
    // Experimental
    {
      id: 'entity_biome_has_all_tags',
      documentation: '(EXPERIMENTAL) Compares the biome the entity is standing in with one or more tag names, and returns either 0 or 1 based on if all of the tag names match. Only supported in resource packs (client-side).',
      parameters: [
        { id: 'tag', documentation: 'biome tag name to check', type: 'string', repeatable: true },
      ],
    },
    {
      id: 'entity_biome_has_any_identifier',
      documentation: '(EXPERIMENTAL) Compares the biome the entity is standing in with one or more identifier names, and returns either 0 or 1 based on if any of the identifier names match. Only supported in resource packs (client-side).',
      parameters: [
        { id: 'identifier', documentation: 'biome identifier to check', type: 'string', repeatable: true },
      ],
    },
    {
      id: 'entity_biome_has_any_tags',
      documentation: '(EXPERIMENTAL) Compares the biome the entity is standing in with one or more tag names, and returns either 0 or 1 based on if any of the tag names match. Only supported in resource packs (client-side).',
      parameters: [
        { id: 'tag', documentation: 'biome tag name to check', type: 'string', repeatable: true },
      ],
    },
    {
      id: 'get_pack_setting',
      documentation: '(EXPERIMENTAL) Returns value of Pack Setting slider, parameter is name of slider. Available on the Client (Resource Packs) only.'
    },
    {
      id: 'is_pack_setting_enabled',
      documentation: '(EXPERIMENTAL) Returns 1.0 if the Pack Setting toggle is enabled, parameter is name of toggle. Available on the Client (Resource Packs) only.'
    },
    {
      id: 'is_pack_setting_selected',
      documentation: '(EXPERIMENTAL) Returns 1.0 if the Pack Setting dropdown (first parameter) matches the string value of the second parameter (selection). Available on the Client (Resource Packs) only.'
    },
    //DEPRECATED
    {
      id: 'cardinal_block_face_placed_on',
      documentation: 'DEPRECATED (please use query.block_face instead)',
      deprecated: 'query.block_face',
    },
    {
      id: 'get_equipped_item_name',
      documentation:
        'DEPRECATED (Use query.is_item_name_any instead if possible so names can be changed later without breaking content.)',
      deprecated: 'query.is_item_name_any',
    },
    {
      id: 'get_name',
      documentation:
        'DEPRECATED (Use query.is_name_any instead if possible so names can be changed later without breaking content.)',
      deprecated: 'query.is_name_any',
    },
    {
      id: 'is_cooldown_type',
      documentation: 'DEPRECATED',
      deprecated: 'query.is_cooldown_category',
    },
    {
      id: 'overlay_alpha',
      documentation: 'DEPRECATED (Do not use - this function is deprecated and will be removed)',
      deprecated: '',
    },
    {
      id: 'owner_identifier',
      documentation:
        'DEPRECATED (Use query.is_owner_identifier_any instead if possible so names can be changed later without breaking content.) ',
      deprecated: 'query.is_owner_identifier_any',
    },
  ];

  /**
   * Gets the queries for the given id
   * @param id The id to get the queries for
   * @returns The queries for the given id
   */
  export function getQuery(id: string): MolangFunction | undefined {
    for (let I = 0; I < General.Queries.length; I++) {
      const elem = General.Queries[I];
      if (elem.id === id) return elem;
    }

    return undefined;
  }
}
