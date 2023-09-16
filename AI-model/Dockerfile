# Use a base image with the required dependencies
FROM python:3.8

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the model files
COPY gpt2-medium/ /app/gpt2-medium/

# Copy the application files
COPY model.py .
COPY main.py .

# Set the environment variables
ENV AMQP_URL=amqp://guest:12345@rabbitmq:5672
ENV EXCHANGE=gpt_exchange
ENV ROUTING_KEY=gpt_key
ENV RESPONSE_EXCHANGE=response_exchange
ENV RESPONSE_ROUTING_KEY=response_key

# Run the application
CMD [ "python", "main.py" ]
