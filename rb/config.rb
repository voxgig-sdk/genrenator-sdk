# Genrenator SDK configuration

module GenrenatorConfig
  def self.make_config
    {
      "main" => {
        "name" => "Genrenator",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://binaryjazz.us/wp-json/genrenator/v1",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "genre" => {},
          "story" => {},
        },
      },
      "entity" => {
        "genre" => {
          "fields" => [],
          "name" => "genre",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 10,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "count",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/genre/{count}",
                  "parts" => [
                    "genre",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "count" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "method" => "GET",
                  "orig" => "/genre",
                  "parts" => [
                    "genre",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "story" => {
          "fields" => [],
          "name" => "story",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 25,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "count",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/story/{count}",
                  "parts" => [
                    "story",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "count" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "method" => "GET",
                  "orig" => "/story",
                  "parts" => [
                    "story",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    GenrenatorFeatures.make_feature(name)
  end
end
