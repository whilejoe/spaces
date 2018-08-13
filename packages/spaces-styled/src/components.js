import styled from 'styled-components';
import { DEFAULT_FLEX } from './constants';
import buildMedias from './medias';

// Flex Container
export const Flex = styled.div`
  display: flex;
  flex: ${DEFAULT_FLEX};
  flex-direction: row;
  flex-wrap: ${props => (props.noWrap ? 'nowrap' : 'wrap')};
  box-sizing: border-box;

  ${props => buildMedias(props)};
`;

// Accepts Flex Item Modifiers But Contains Flow Content
export const FlexContent = styled.div`
  display: block;
  flex: ${DEFAULT_FLEX};
  box-sizing: border-box;

  ${props => buildMedias(props)};
`;

// Flex Column Container
export const FlexColumn = styled.div`
  display: flex;
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
