import styled from 'styled-components';
import { DEFAULT_FLEX, DISPLAY_TYPES } from './constants';
import buildMedias from './medias';

const { BLOCK, FLEX } = DISPLAY_TYPES;

// Flex Container
export const Flex = styled.div.attrs({
  display: FLEX
})`
  display: ${FLEX};
  flex: ${DEFAULT_FLEX};
  flex-direction: row;
  flex-wrap: ${props => (props.noWrap ? 'nowrap' : 'wrap')};
  box-sizing: border-box;

  ${props => buildMedias(props)};
`;

// Accepts Flex Item Modifiers But Contains Flow Content
export const FlexContent = styled.div.attrs({
  display: BLOCK
})`
  display: ${BLOCK};
  flex: ${DEFAULT_FLEX};
  box-sizing: border-box;

  ${props => buildMedias(props)};
`;

// Flex Column Container
export const FlexColumn = styled.div.attrs({
  display: FLEX
})`
  display: ${FLEX};
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
