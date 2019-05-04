from flask import Flask, Response
import os
import keygen
import json

app = Flask(__name__)
STATIC_FILE_DIRECTORY = os.path.dirname(os.path.realpath(__file__)) + "/"

# https://haveibeenpwned.com/API/v2#PwnedPasswords
@app.route('/')
def hello_world():
    return read_file(STATIC_FILE_DIRECTORY + "frontend/index.html")


@app.route('/keygen')
def getKeyGen():
    clearkey = keygen.keygen()
    hashkey = keygen.hashkey(clearkey)
    retstring = {"clearkey" : clearkey, "hashkey" : hashkey}
    return Response(json.dumps(retstring), status=200, mimetype="application/json")


def read_file(file_name):
    if os.path.exists(file_name):
        with open(file_name) as f:
            return "\n".join(f.readlines())
    else:
        return ("", 404)


if __name__ == '__main__':
    app.run()
