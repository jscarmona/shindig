# Shindig.js
A simple javscript eventing library.

## Methods

### Shindig.get(key)
Get a property.

- ```key``` *(String)* - Name of property

**Example**
```js
var name = Shindig.get('name');
```

### Shindig.set(key, value, silent)
Set a property and fire corresponding mutation event.

- ```key``` *(String)* - Name of property
- ```value``` *(mixed)* - Value of property
- ```silent``` *(Boolean)* - Bypass the mutation event

**Example**
```js
Shindig.on('create:name', function (value) {
	console.log(value); // Tony Starks
});

Shindig.on('change:name', function (values) {
	console.log(value.old) // Tony Starks
	console.log(value.new) // Iron Man
});

Shindig.set('name', 'Tony Starks');
Shindig.set('name', 'Iron Man');
```

### Shindig.unset(key, silent)
Set a property and fire corresponding mutation event.

- ```key``` *(String)* - Name of property
- ```silent``` *(Boolean)* - Bypass the mutation event

**Example**
```js
Shindig.on('delete:name', function (value) {
	console.log(value); // Tony Starks
});

Shindig.unset('name', true); // Will not fire event
```

### Shindig.fire(evt, data)
Fire an event

- ```evt``` *(String)* - Name of event
- ```data``` *(mixed)* - Data to pass to listener

**Example**
```js
Shindig.fire('welcome', {
	first: 'Tony',
	last: 'Stark'
});
```

### Shindig.on(evt, callback, context)
Listen for an event.

- ```evt``` *(String)* - Name of event
- ```callback``` *(Function)* - Function to fire when event is called.
- ```context``` *(mixed)* - Context that should be used when calling callback

**Example**
```js
Shindig.on('welcome', function (name) {
	console.log('Welcome ' + name.first); // Welcome Tony
});
```

### Shindig.off(evt)
Remove event listener

- ```evt``` *(String)* - Name of event

**Example**
```js
Shindig.off('welcome');
```
