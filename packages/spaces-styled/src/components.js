import styled from 'styled-components';
import { DEFAULT_FLEX, DISPLAY_TYPES } from './constants';
import buildMedias from './utils';

const { block, flex } = DISPLAY_TYPES;

// Flex Container
export const Flex = styled.div.attrs({
  display: flex,
})`
  display: ${flex};
  flex: ${DEFAULT_FLEX};
  flex-direction: row;
  flex-wrap: ${props => (props.noWrap ? 'nowrap' : 'wrap')};
  box-sizing: border-box;

  ${props => buildMedias(props)};
`;

// Accepts flex item modifiers but contains flow content
export const FlexContent = styled.div.attrs({
  display: block,
})`
  display: ${block};
  flex: ${DEFAULT_FLEX};
  box-sizing: border-box;

  ${props => buildMedias(props)};
`;

export const FlexColumn = styled.div.attrs({
  display: flex,
})`
  display: ${flex};
  flex: ${DEFAULT_FLEX};
  flex-direction: column;
  box-sizing: border-box;

  /* fixes inconsistent browser rendering of column children */
  & > ${Flex}, & > ${FlexContent} {
    flex: 0 0 auto;
    max-width: none;
  }

  ${props => buildMedias(props)};
`;
