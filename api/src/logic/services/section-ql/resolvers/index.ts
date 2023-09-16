import { DBContextPg } from 'src/data/postgress/db.context'
import publishMessage from '../../rabbitmq'

const { section, topic } = new DBContextPg()
const resolvers = {
  Query: {
    getAllSections: async () => {
      try {
        const sections = await section.findMany()
        return sections
      } catch (error) {
        throw new Error('Failed to fetch sections')
      }
    },
    getAllTopics: async () => {
      try {
        const topics = await topic.findMany()
        return topics
      } catch (error) {
        throw new Error('Failed to fetch topics')
      }
    },
  },
  Section: {
    topics: async (parent) => {
      try {
        const topics = await topic.findMany({
          where: {
            sectionId: parent.id,
          },
        })
        return topics
      } catch (error) {
        throw new Error('Failed to fetch topics for the section')
      }
    },
  },
  Mutation: {
    receivePrompt: (root, args) => {
      const { text } = args;
      publishMessage(text)
      return 'Text received successfully';
    },
  },
}

export default resolvers
