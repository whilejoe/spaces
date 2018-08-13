# Spaces Styled

_Flex grid components for React built with [styled-components](https://github.com/styled-components/styled-components)_

## Install

```
yarn add spaces-styled
or
npm i spaces-styled
```

## Examples

### Basic Usage

By default Flex/FlexContent will align in a row and consume an equal amount of space.

```jsx
import React from 'react';
import { Flex, FlexContent } from 'spaces-styled';

export default () => (
  <Flex>
    <FlexContent />
    <FlexContent />
    <FlexContent />
  </Flex>
);
```

#### Nested

Grids can be nested. Flex can be a sibling to FlexContent

```jsx
<Flex>
  <FlexContent />
  <Flex>
    <FlexContent />
    <FlexContent />
  </Flex>
</Flex>
```

### Prop: space

Number, String, Object, Array<br/>
Sum greater than 100 will wrap to next line.<br/>
Works with breakpoints e.g. `space={[30, {sm: 50, md: 70}]}`.<br/>
Also accepts: __'self'__ which will only take up the space of its content.<br/>
Components: Flex, FlexColumn, FlexContent

```jsx
<Flex space={50}>
  <FlexContent space={30} />
  <FlexContent space={70} />
</Flex>
```

### Prop: gutters/guttersVertical

Boolean<br/>
Adds horizontal or vertical gutters.<br/>
_Can be used together. Vertical gutters kick in when items stack._<br/>
Components: Flex, FlexColumn

```jsx
<Flex gutters guttersVertical>
  <FlexContent space={30} />
  <FlexContent space={[70, { sm: 100 }]} />
</Flex>
```

### Prop: offset

Number, String, Object, Array<br/>
Works with breakpoints e.g. `offset={[5, {sm: 10, md: 0}]}`.<br/>
Components: Flex, FlexColumn, FlexContent

```jsx
<Flex>
  <FlexContent />
  <FlexContent offset={[5, { sm: 10, md: 0 }]} />
</Flex>
```

### Prop: hide

Boolean<br/>
Works with breakpoints e.g. `hide={[true, {sm: false}]}`.<br/>
Components: Flex, FlexColumn, FlexContent

```jsx
<Flex>
  <FlexContent hide={[true, { sm: false }]} />
</Flex>
```

### Prop: justify

String, Object, Array<br/>
Works with breakpoints e.g. `justify={{md: 'space-between'}}`.<br/>
Components: Flex, FlexColumn

```jsx
// Justifies items with space between
<Flex justify="space-between">
  <FlexContent space={25} />
  <FlexContent space={25} />
</Flex>
```

### Prop: align

String, Object, Array<br/>
Works with breakpoints e.g. `align={{md: 'center'}}`.<br/>
Components: Flex, FlexColumn

```jsx
// Aligns items on vertical axis
<Flex align="center">
  <FlexContent style={{ height: '100px' }} />
  <FlexContent style={{ height: '200px' }} />
</Flex>
```

## All Props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>space</td>
          <td>Number, String Object, Array</td>
          <td></td>
          <td>Percentage of space consumed</td>
        </tr>
        <tr>
          <td>gutters</td>
          <td>Boolean</td>
          <td>false</td>
          <td>Horizontal gutters between flex items</td>
        </tr>
        <tr>
          <td>guttersVertical</td>
          <td>Boolean</td>
          <td>false</td>
          <td>Vertical gutters between flex items when stacked</td>
        </tr>
        <tr>
          <td>offset</td>
          <td>Number, String, Object, Array</td>
          <td></td>
          <td>Offsets flex item from sibling before</td>
        </tr>
        <tr>
          <td>hide</td>
          <td>Boolean, Object, Array</td>
          <td>false</td>
          <td>Whether flex item is visible or not</td>
        </tr>
        <tr>
          <td>justify</td>
          <td>String, Object, Array</td>
          <td>flex-start (Flexbox spec) https://css-tricks.com/snippets/css/a-guide-to-flexbox/</td>
          <td>Alignment along the horizontal axis</td>
        </tr>
        <tr>
          <td>align</td>
          <td>String, Object, Array</td>
          <td>stretch (Flexbox spec) https://css-tricks.com/snippets/css/a-guide-to-flexbox/</td>
          <td>Alignment along the vertical axis</td>
        </tr>
        <tr>
          <td>noWrap</td>
          <td>boolean</td>
          <td>wrap (Flexbox spec) https://css-tricks.com/snippets/css/a-guide-to-flexbox/</td>
          <td>Prevents items from wrapping on horizontal axis</td>
        </tr>
    </tbody>
</table>

## Flexbox Gotchas
The flexbox spec has had a troubled past. If you're having issues, it's most likely due to a specific browser's implementation and has been captured here:
<br/>https://github.com/philipwalton/flexbugs

### License
MIT
