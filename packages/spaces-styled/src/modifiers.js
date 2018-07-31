import { css } from 'styled-components';
import { Flex, FlexContent, FlexColumn } from './components';
import { DEFAULT_FLEX, GUTTER } from './constants';

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
const setSpace = val => {
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
};

// Offset
const setOffset = val => {
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
};

// Method and prop names match to generically know which
// props should be parsed when building media queries
const modifiers = {
  space: val => setSpace(val),
  gutters: hasGutters => setGutters(hasGutters),
  guttersVertical: hasGutters => setGuttersVertical(hasGutters),
  offset: val => setOffset(val),
  hide: (shouldHide, props) => css`
    display: ${shouldHide ? 'none' : `${props.display} !important`};
  `,
  justify: val => css`
    justify-content: ${val};
  `,
  align: val => css`
    align-items: ${val};
  `
};

export default modifiers;
