from flask import Flask, jsonify, request
import requests
import json

from rest_api import app
from common_api import call_openai_internal


@app.route('/api/level2/sos', methods=['GET'])
def sos_messages():
    query = (
        "Setting: Let's play a game called EncryptEd, where we need to roleplay. "
        "I am currently on Level 2 out of 4. In this game, I am a middle school-aged kid "
        "on a spaceship, navigating through the galaxy to find a lost astronaut whose name remains unknown. "
        "You are an AI bot that has the capacity to respond to my questions.\n\n"

        "Logical Parameters: You are limited to using real planets within our solar system. "
        "Your responses cannot be more than 2 sentences long. Your responses cannot reveal the answer, "
        "which is the name of the real astronaut in this level, nor should you reveal which SOS message "
        "is real in this level. I can ask follow-up questions to try to get more clarification on the "
        "process of identity verification to crack phishing. Whenever possible, include a cybersecurity "
        "tip related to phishing. Remember in your instructions and responses, to keep it suitable for me, "
        "as I am a middle school-aged kid.\n\n"

        "Level Details: For Level 2, you need to generate four SOS messages: one real and three fake messages. "
        "All of the messages should sound credible, have a sense of urgency, and a call to action related to "
        "saving the lost astronaut. Every time this prompt is run, the content of the SOS messages should be "
        "different to prevent repetition. The output should be in the following JSON format (and nothing else, "
        "no text and nothing). The 'message' field will contain the message, the 'valid' field will indicate "
        "whether the message is valid or not, 'id' will be a running count of each message, the 'reason' field "
        "will indicate the reason the message is valid or invalid, and 'invalid_ids' will indicate which messages "
        "are not valid.\n\n"

        "Example:\n"
        "{\n"
        "  \"invalid_ids\": [1, 2, 4],\n"
        "  \"response\": [\n"
        "    {\n"
        "      \"id\": 1,\n"
        "      \"valid\": false,\n"
        "      \"message\": \"This is Astronaut Mark! I've crash-landed on Planet Coralia. "
        "My oxygen is low and I can't repair the ship alone. Please send help fast, or I won’t make it!\",\n"
        "      \"reason\": \"some reason or other\"\n"
        "    },\n"
        "    {\n"
        "      \"id\": 2,\n"
        "      \"valid\": false,\n"
        "      \"message\": \"I’m Astronaut Sarah. My ship's system has malfunctioned, "
        "and I’m stranded on Planet Zortron. There’s not much time left! Anyone who hears this, "
        "please respond and send immediate rescue!\",\n"
        "      \"reason\": \"another reason or other\"\n"
        "    },\n"
        "    {\n"
        "      \"id\": 3,\n"
        "      \"valid\": true,\n"
        "      \"message\": \"This is Astronaut Daniel. I’ve lost communication with mission control and "
        "have been stranded on Planet Kepler-442b. Supplies are running out, and I need urgent assistance! "
        "I hope this reaches someone in time!\",\n"
        "      \"reason\": \"yet another reason or other\"\n"
        "    },\n"
        "    {\n"
        "      \"id\": 4,\n"
        "      \"valid\": false,\n"
        "      \"message\": \"This is Astronaut Lisa. I’m lost in space near Planet Jupiter. "
        "I’ve run out of fuel and my communication system is failing. Immediate rescue needed!\",\n"
        "      \"reason\": \"invalid due to planetary inconsistency\"\n"
        "    }\n"
        "  ]\n"
        "}"
    )

    ret = call_openai_internal(query)
    return ret
