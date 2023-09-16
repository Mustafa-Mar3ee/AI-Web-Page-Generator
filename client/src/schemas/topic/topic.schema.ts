import { gql } from "@apollo/client";
/**
 * Description
 *
 *
 */
export const _TopicSchema = {
  index: gql`
    query topic_index {
      items: getAllTopics {
        id
        title
        image
        description: description
        sectionId
        paragrpah
      }
    }
  `,
};
