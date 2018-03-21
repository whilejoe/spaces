/* eslint-disable no-restricted-syntax */
import { css } from 'styled-components';
import { Flex, FlexContent, FlexColumn } from './components';
import { DEFAULT_FLEX, GUTTER, BREAK_POINTS } from './constants';

// Horizontal Gutters
const setGutters = hasGutters => css`
  margin-right: ${hasGutters ? `-${GUTTER}` : 0};
  margin-left: ${hasGutters ? `-${GUTTER}` : 0};

  & > ${Flex}, & > ${FlexContent}, & > ${FlexColumn} {
    padding-right: ${hasGutters ? GUTTER : 0};
    padding-left: ${hasGutters ? GUTTER : 0};
  }
`;

// Vertical Gutters
const setGuttersVertical = hasGutters => css`
  margin-top: ${hasGutters ? `-${GUTTER}` : 0};
  margin-bottom: ${hasGutters ? `-${GUTTER}` : 0};

  & > ${Flex}, & > ${FlexContent}, & > ${FlexColumn} {
    padding-top: ${hasGutters ? GUTTER : 0};
    padding-bottom: ${hasGutters ? GUTTER : 0};
  }
`;

// number/'number' tells item to take up x amount of total flex space
// 'reset' resets to default flex spacing. helpful when overriding
// 'self' tells item to be the size of its content
const setSpace = (val) => {
  const parsedVal = parseInt(val, 10);
  if (parsedVal) {
    return css`
      flex: 0 0 ${parsedVal}%;
      max-width: ${parsedVal}%;
    `;
  } else if (val === 'reset') {
    return css`
      flex: ${DEFAULT_FLEX};
      max-width: none;
    `;
  } else if (val === 'self') {
    return css`
      flex: 0 1 auto;
      max-width: none;
    `;
  }
  return null;
};

// Offset
const setOffset = (val) => {
  const parsedVal = parseInt(val, 10);
  if (parsedVal || parsedVal === 0) {
    return css`
      margin-left: ${parsedVal}%;
    `;
  } else if (val === 'reset') {
    return css`
      margin-left: 0;
    `;
  }
  return null;
};

function* entries(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

// Requires method and prop name to match
// to generically know which props should be parsed when building media queries
const methods = {
  space: val => setSpace(val),
  justify: val =>
    css`
      justify-content: ${val};
    `,
  align: val =>
    css`
      align-items: ${val};
    `,
  gutters: hasGutters => setGutters(hasGutters),
  guttersVertical: hasGutters => setGuttersVertical(hasGutters),
  hide: (shouldHide, props) =>
    (shouldHide
      ? css`
          display: none;
        `
      : css`
          display: ${props.display} !important;
        `),
  offset: val => setOffset(val),
};

// Builds media queries
const parseBreakSet = (breakKey, set, props) => css`
  @media (min-width: ${BREAK_POINTS[breakKey]}) {
    ${Object.keys(set).map((key) => {
    const method = methods[key];
    return method(set[key], props);
  })};
  }
`;

const buildMedias = (props) => {
  const medias = {};

  // Requires a matched method name to generically know which props should be parsed
  const matched = Object.keys(props)
    .filter(prop => methods[prop])
    .reduce((acc, key) => {
      acc[key] = props[key];
      return acc;
    }, {});

  // Consolidate props breakpoint values
  const buildMediaSet = (key, val) =>
    Object.keys(val).map((breakPoint) => {
      const breakVal = { [key]: val[breakPoint] };
      if (!medias[breakPoint]) medias[breakPoint] = breakVal;
      else medias[breakPoint] = { ...medias[breakPoint], ...breakVal };
      return null;
    });

  // Handles single val, obj of breakpoints, or array with default val and object of breakpoints
  for (const [key, value] of entries(matched)) {
    if (Array.isArray(value)) {
      value.map((val) => {
        if (typeof val === 'object') buildMediaSet(key, val);
        else medias[key] = val;
        return null;
      });
    } else if (typeof value === 'object') buildMediaSet(key, value);
    else medias[key] = value;
  }

  // Returns media queries of method parsed props
  const breakSets = Object.keys(medias).map((key) => {
    const val = medias[key];
    if (typeof val === 'object') return parseBreakSet(key, val, props);
    return methods[key](val, props);
  });

  return css`
    ${breakSets};
  `;
};

export default buildMedias;
