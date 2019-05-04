import random
import hashlib


def keygen():
    chars = ["0","1","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","!","_"]
    random.shuffle(chars)
    key = ""
    for x in range(24):
        rannumber = random.randint(0,len(chars)-1)
        key += chars[rannumber]

    return key


def hashkey(key):
    key = hashlib.sha1(key.encode())

    return key.hexdigest()
