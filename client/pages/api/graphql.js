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
  }

  input UserInput {
    alias: String!
    address: String!
  }

  type NftItem {
    id: ID!
    nftAddress: String
    owner: String
    creator: String
    creatorAlias: String
    price: Float
    currentBid: Float
    bids: [Bid]
    createdAt: Date
    updatedAt: Date
  }

  input NftItemInput {
    nftAddress: String
    owner: String
    creator: String
    creatorAlias: String
    price: Float
    currentBid: Float
    bids: [BidInput]
    createdAt: Date
    updatedAt: Date
  }

  type Bid {
    bidder: String
    amount: Float
    createdAt: Date
    item: NftItem
  }

  input BidInput {
    bidder: String
    amount: Float                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    createdAt: Date
    item: NftItemInput
  }

  type Query {
    users: [User!]!
    getUser(address: String): User
    getNftItems: [NftItem]
    getNftItem(nftAddress: String): NftItem
  }

  type Mutation {
    createUser(address: String, alias: String): User
    createNftItem(input: NftItemInput): NftItem
    getNftItem(nftAddress: String): NftItem
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
    },
    getNftItems(_, args, context) {
      return context.db
        .collection('nftItems')
        .find()
        .toArray()
    },
    getNftItem(_, { nftAddress }, context) {
      return context.db
        .collection('nftItems')
        .findOne({ nftAddress })
    }
  },
  Mutation: {
    createUser(_, { address, alias }, context) {
      return context.db
        .collection('users')
        .insertOne({ address, alias })
        .then(result => result.insertedId)
    },
    createNftItem(_, { input }, context) {
      return context.db
        .collection('nftItems')
        .insertOne(input)
        .then(result => result.insertedId)
    }
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