import { css } from 'styled-components';
import modifiers from './modifiers';
import { BREAK_POINTS } from './constants';

function* entries(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

// Builds media queries
const parseBreakSet = (breakKey, set, props) => {
  const { theme } = props;
  const themeBreakpoint = theme.breakPoints && theme.breakPoints[breakKey];
  const breakPoint = themeBreakpoint || BREAK_POINTS[breakKey];

  if (breakPoint) {
    return css`
      @media (min-width: ${breakPoint}) {
        ${Object.keys(set).map(key => {
          const modifier = modifiers[key];
          return modifier(set[key], props);
        })};
      }
    `;
  }
};

const buildMedias = props => {
  let medias = {};

  // Requires a matched modifier method to generically know which props should be parsed
  const matched = Object.keys(props)
    .filter(prop => modifiers[prop])
    .reduce((acc, key) => {
      acc[key] = props[key];
      return acc;
    }, {});

  // Consolidate props breakpoint values
  const buildMediaSet = (key, val) =>
    Object.keys(val).map(breakPoint => {
      const existingBP = medias[breakPoint];
      const breakVal = { [key]: val[breakPoint] };
      medias[breakPoint] = !existingBP ? breakVal : Object.assign({}, existingBP, breakVal);
      return null;
    });

  // Handles single val, obj of breakpoints, or array with default val and object of breakpoints
  for (const [key, value] of entries(matched)) {
    if (Array.isArray(value)) {
      value.map(val => {
        if (typeof val === 'object') buildMediaSet(key, val);
        else medias[key] = val;
        return null;
      });
    } else if (typeof value === 'object') buildMediaSet(key, value);
    else medias[key] = value;
  }

  // Returns media queries of method parsed props
  const breakSets = Object.keys(medias).map(key => {
    const val = medias[key];
    if (typeof val === 'object') return parseBreakSet(key, val, props);
    const modifier = modifiers[key];
    return modifier(val, props);
  });

  return css`
    ${breakSets};
  `;
};

export default buildMedias;
