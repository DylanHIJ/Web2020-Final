const Subscription = {
  user: {
    subscribe(parent, args, { User, pubsub }, info) {
      return pubsub.asyncIterator(`name: ${args.query}`);
    },
  },
};

export { Subscription as default };
