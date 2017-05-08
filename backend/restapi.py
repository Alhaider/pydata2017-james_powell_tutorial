#!/usr/bin/env python3
from flask import Flask, request, jsonify
from worker import integrate

from flask_cors import CORS
CORS(app)

# to run:
# $ python3 restapi.py

app = Flask(__name__)
TASKS = {}

@app.route('/', methods=['GET'])
def list_tasks():
    tasks = {task_id: {'ready': task.ready()}
             for task_id, task in TASKS.items()}
    return jsonify(tasks)

@app.route('/<int:task_id>', methods=['GET'])
def get_task(task_id):
    response = {'task_id': task_id}

    task = TASKS[task_id]
    if task.ready():
        response['result'] = task.get()
    return jsonify(response)

@app.route('/', methods=['PUT'])
def put_task():
    f = request.json['f']
    a = request.json['a']
    b = request.json['b']
    c = request.json['c']
    d = request.json['d']
    size = request.json.get('size', 100)

    task_id = len(TASKS)
    TASKS[task_id] = integrate.delay(f, a, b, c, d, size)
    response = {'result': task_id}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
