class PubSub {
  constructor() {
    this.handlers = [];
  }
  subscribe(event, handler, context) {
    if (typeof context === "undefined") {
      context = handler;
    }
    this.handlers.push({ event: event, handler: handler.bind(context) });
  }
  publish(event, args, sender) {
    this.handlers.forEach((topic) => {
      if (topic.event === event) {
        topic.handler(args, sender);
      }
    });
  }
}

class Billy {
  constructor(pubsub) {
    this.firstName = "Billy";
    this.pubsub = pubsub;
    this.pubsub.subscribe(`${this.firstName}`, this.receivingMessage, this);
  }
  receivingMessage() {
    console.log(`Left the chat: ${this.firstName}`);
  }
  sendMessage() {
    console.log(`${this.firstName}, loves Rose!`);
    this.pubsub.publish(
      "Rose",
      `${this.firstName} loves Rose!`,
      this.firstName
    );
  }
}

class Rose {
  constructor(pubsub) {
    this.firstName = "Rose";
    this.pubsub = pubsub;
    this.pubsub.subscribe(`${this.firstName}`, this.receivingMessage, this);
  }
  sendMessage(event, msg) {
    this.pubsub.publish(event, msg, this.firstName);
  }

  receivingMessage(event, sender) {
    if (sender === "Jack") {
      console.log(`${this.firstName} lost my mind!`);
      this.sendMessage("Billy", "I already have a couple, his name is Jack!");
    } else if (sender === "Billy") {
      console.log(`${this.firstName} lost my mind!`);
      this.sendMessage("Jack", "I already have a couple, his name is Billy!");
    }
  }
}

class Jack {
  constructor(pubsub) {
    this.firstName = "Jack";
    this.pubsub = pubsub;
    this.pubsub.subscribe(`${this.firstName}`, this.receivingMessage, this);
  }
  sendMessage() {
    console.log(`${this.firstName}, loves Rose!`);
    this.pubsub.publish(
      "Rose",
      `${this.firstName} loves Rose!`,
      this.firstName
    );
  }
  receivingMessage() {
    console.log(`Left the chat: ${this.firstName}`);
  }
}

const pubSub = new PubSub();
const personBilly = new Billy(pubSub);
const personRose = new Rose(pubSub);
const personjJack = new Jack(pubSub);

personjJack.sendMessage();
