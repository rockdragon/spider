spider
======
![https://travis-ci.org/rockdragon/spider](https://travis-ci.org/rockdragon/spider.svg) [![Coverage Status](https://img.shields.io/coveralls/rockdragon/spider.svg)](https://coveralls.io/r/rockdragon/spider)
a node spider

Formation of the configuration
======
```JSON
{
    "session_key": "session_id",
    "SECRET": "cloud-drive_on_your_behalf",
    "nodes":
    [
       {"address": "127.0.0.1", "port": "6379"}
    ],
    "node_env" : "development",
    "proxy" : "192.168.1.1:3128"
}
```
Folders structure
======
```
spider
	--bin		:			startup
	--modules	:			custom modules
	--spiders	:			business logic
```

License
======
The MIT License (MIT)

