require('dotenv').config()

import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { makeExecutableSchema } from '@graphql-tools/schema'
import { MongoClient } from 'mongodb'
import { GraphQLScalarType } from 'graphql';

const typeDefs = gql`
  scalar Date

  type User {
    alias: String!
    address: String!
    avatar: String
  }

  input UserInput {
    alias: String!
    address: String!
    avatar: String
  }

  type NftItem {
    id: ID
    nftAddress: String
    owner: String
    creator: String
    price: Int
    currentBid: Int
    bids: [Bid]
    createdAt: Date
    updatedAt: Date
  }

  input NftItemInput {
    nftAddress: String
    owner: String
    creator: String
    price: Int
    currentBid: Int
    bids: [BidInput]
    createdAt: Date
    updatedAt: Date
  }

  type Bid {
    itemId: String
    bidder: String
    amount: Int
    createdAt: Date
  }

  input BidInput {
    itemId: String
    bidder: String
    amount: Int
    createdAt: Date
  }

  type Query {
    users: [User!]!
    getUser(address: String): User
    getNftItem(nftAddress: String): NftItem
    getNftItems: [NftItem]
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID, input: UserInput): User
    deleteUser(id: ID): User
    createNftItem(input: NftItemInput): NftItem
    updateNftItem(id: ID, input: NftItemInput): NftItem
    deleteNftItem(id: ID): NftItem
    createBid(input: BidInput): Bid
    updateBid(id: ID, input: BidInput): Bid
    deleteBid(id: ID): Bid
  }
`;

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
      return value.getTime();
    },
    parseValue(value) {
      return new Date(value); // value from the client
    }
  }),
  Query: {
    users(_, args, context) {
      return context.db
        .collection('users')
        .find()
        .toArray()
    },
    getUser(_, { address }, context) {
      return context.db
        .collection('users')
        .findOne({ address })
    }
  },
  Mutation: {
    createUser(_, { input }, context) {
      return context.db
        .collection('users')
        .insertOne(input)
        .then(result => result.ops[0])
    },
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

let db;

const apolloServer = new ApolloServer({
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  schema,
  context: async () => {
    if (!db) {
      const uri = process.env.MONGO_URL || 'mongodb://localhost:27017/graphql-playground';
      const client = await MongoClient.connect(uri, { useNewUrlParser: true });
      db = client.db();
    }
    return { db };
  },
});

const startServer = apolloServer.start();

export default async function handler(req, res) {

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};