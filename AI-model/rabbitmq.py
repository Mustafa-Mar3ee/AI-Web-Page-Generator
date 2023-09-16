import pika
import json
import os
from dotenv import load_dotenv
from model import generate_text_with_gpt

# Load environment variables from .env file
load_dotenv()

# Get environment variables
amqp_url = os.getenv('AMQP_URL')
exchange = os.getenv('EXCHANGE')
routing_key = os.getenv('ROUTING_KEY')
response_exchange = os.getenv('RESPONSE_EXCHANGE')
response_routing_key = os.getenv('RESPONSE_ROUTING_KEY')
# RabbitMQ connection parameters
credentials = pika.PlainCredentials('guest', '12345')
parameters = pika.ConnectionParameters('localhost', 5672, '/', credentials)
connection = pika.BlockingConnection(parameters)
channel = connection.channel()


queue = 'gpt_queue'
channel.exchange_declare(exchange=exchange, exchange_type='direct')
channel.queue_declare(queue=queue)
channel.queue_bind(exchange=exchange, queue=queue, routing_key=routing_key)



def process_message(ch, method, properties, body):
    message = body.decode('utf-8')
    print("loading ...")
    generated_text = generate_text_with_gpt(message)
    print("generated_text")
    # print(generated_text)

    channel.basic_publish(exchange=response_exchange, routing_key=response_routing_key, body=json.dumps(generated_text))


channel.basic_consume(queue=queue, on_message_callback=process_message, auto_ack=True)
print('Waiting for messages...')
channel.start_consuming()
