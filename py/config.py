# Genrenator SDK configuration


def make_config():
    return {
        "main": {
            "name": "Genrenator",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://binaryjazz.us/wp-json/genrenator/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "genre": {},
                "story": {},
            },
        },
        "entity": {
      "genre": {
        "fields": [],
        "name": "genre",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": 10,
                      "kind": "param",
                      "name": "id",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/genre/{count}",
                "parts": [
                  "genre",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "count": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/genre",
                "parts": [
                  "genre",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "story": {
        "fields": [],
        "name": "story",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": 25,
                      "kind": "param",
                      "name": "id",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/story/{count}",
                "parts": [
                  "story",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "count": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/story",
                "parts": [
                  "story",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
