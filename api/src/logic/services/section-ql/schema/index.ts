import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Topic {
    id: ID!
    image: String
    title: String!
    description: String!
    paragrpah: String
    createdAt: String!
    sectionId: String!
  }

  type Section {
    id: ID!
    title: String!
    description: String!
    createdAt: String!
    topics: [Topic]
  }

  type Query {
    getAllSections: [Section!]!
    getAllTopics: [Topic!]!
  }
  type Mutation {
    receivePrompt(text: String!): String!
  }
`;
