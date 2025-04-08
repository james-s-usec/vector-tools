# Vector Tools API Documentation

## Overview

This document provides detailed information about the Vector Tools API, including class definitions, methods, and usage examples.

## Vector Class

The `Vector` class represents a 3D vector with x, y, and z components.

### Constructor

```javascript
const vector = new Vector(x, y, z);
```

- `x` (Number): The x component (default: 0)
- `y` (Number): The y component (default: 0)
- `z` (Number): The z component (default: 0)

### Properties

- `x` (Number): The x component of the vector
- `y` (Number): The y component of the vector
- `z` (Number): The z component of the vector

### Methods

#### add(v)

Adds another vector to this vector and returns a new vector.

```javascript
const v1 = new Vector(1, 2, 3);
const v2 = new Vector(4, 5, 6);
const result = v1.add(v2); // Vector(5, 7, 9)
```

#### subtract(v)

Subtracts another vector from this vector and returns a new vector.

```javascript
const v1 = new Vector(4, 5, 6);
const v2 = new Vector(1, 2, 3);
const result = v1.subtract(v2); // Vector(3, 3, 3)
```

#### dot(v)

Calculates the dot product of this vector and another vector.

```javascript
const v1 = new Vector(1, 2, 3);
const v2 = new Vector(4, 5, 6);
const result = v1.dot(v2); // 32
```

#### cross(v)

Calculates the cross product of this vector and another vector.

```javascript
const v1 = new Vector(1, 0, 0);
const v2 = new Vector(0, 1, 0);
const result = v1.cross(v2); // Vector(0, 0, 1)
```

#### magnitude()

Calculates the magnitude (length) of this vector.

```javascript
const v = new Vector(3, 4, 0);
const length = v.magnitude(); // 5
```

#### normalize()

Returns a new vector with the same direction but a magnitude of 1.

```javascript
const v = new Vector(3, 4, 0);
const normalized = v.normalize(); // Vector(0.6, 0.8, 0)
```

#### toString()

Returns a string representation of the vector.

```javascript
const v = new Vector(1, 2, 3);
console.log(v.toString()); // "Vector(1, 2, 3)"
```

## Examples

### Basic Vector Operations

```javascript
const { Vector } = require('vector-tools');

// Create vectors
const v1 = new Vector(1, 2, 3);
const v2 = new Vector(4, 5, 6);

// Addition
const sum = v1.add(v2);
console.log(sum.toString()); // "Vector(5, 7, 9)"

// Dot product
const dotProduct = v1.dot(v2);
console.log(dotProduct); // 32

// Normalization
const normalized = v1.normalize();
console.log(normalized.toString());
console.log(normalized.magnitude()); // Should be close to 1
```

## Future Enhancements

- Matrix operations
- Quaternion support for rotations
- Vector field calculations
- Performance optimizations for large-scale vector operations