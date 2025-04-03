const amqp = require('amqplib');

let channelPromise = (async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        console.log('RabbitMQ channel initialized');

        await channel.assertQueue('jobs_queue', { durable: true });
        await channel.assertQueue('resumes_queue', { durable: true });

        return channel;
    } catch (err) {
        console.error(err);
        return null;
    }
})();

module.exports = { channelPromise };
