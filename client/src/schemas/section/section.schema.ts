import { gql } from "@apollo/client";
/**
 * Description 
 * 
 * 
 */
export const _SectionSchema = {
  index: gql`
 query section_index {
 items:getAllSections{
  id
  title
  topics {
    title,
    id,
    description,
    paragrpah,
    sectionId    
    
  }
 }
 }
  `}




