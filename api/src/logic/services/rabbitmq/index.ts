import * as amqp from 'amqplib';
import { DBContextPg } from 'src/data/postgress/db.context';

export default async function publishMessage(text: string) {
  try {
    const amqpUrl = process.env.AMQP_URL || 'amqp://guest:12345@localhost:5672';
    const exchange = 'gpt_exchange';
    const routingKey = 'gpt_key';
    const responseExchange = 'response_exchange';
    const responseRoutingKey = 'response_key';

    const connection = await amqp.connect(amqpUrl);
    const channel = await connection.createChannel();

    await channel.assertExchange(exchange, 'direct', { durable: false });
    await channel.assertExchange(responseExchange, 'direct', { durable: false });
    channel.publish(exchange, routingKey, Buffer.from(text));

    const queue = 'response_queue';
    const { queue: responseQueue } = await channel.assertQueue(queue);

    await channel.bindQueue(responseQueue, responseExchange, responseRoutingKey);

    // Consume the response from the queue
    channel.consume(
      responseQueue,
      async (msg) => {
        // Acknowledge the response
        const dbContext = new DBContextPg();
        const Newbuffer = msg.content.toString();
        console.log("🚀 ~ file: index.ts:79 ~ Newbuffer:", Newbuffer)
        channel.ack(msg);

        try {
          if (Newbuffer.length > text.length) {
            await dbContext.topic.deleteMany();
            await dbContext.topic.createMany({ data: JSON.parse(Newbuffer) });
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
