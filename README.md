# Request Header Parser Microservice

Get a browser's IP address, preferred languages, and system information.

## How it Works

This microservice uses [Koa][1] to retrieve request headers and, along with
[koa-router][2], serve requests.

[1]: http://koajs.com/
[2]: https://github.com/alexmingoia/koa-router

## How to Use

`app.js` exports a Koa app. Koa apps have an [`app.listen()`][3] method that is
identical to Node's [http.Server.listen()][4].

Import `app.js` and call `app.listen()` to start up the microservice.

[3]: http://koajs.com/#app-listen-
[4]: https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback

## API Resources

### GET /

Returns an object containing information about the client's browser.

#### REQUEST

__Sample__: `https://request-header-parser-microservice.example.com/`

__Headers__:

  * `Accept-Language: en-US,en;q=0.5`
  * `User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0`
  * `X-Forwarded-For: 159.20.14.100`

#### RESPONSE

__Status__: 200 - `application.json`

__Response__:

    {
      "ipaddress": "159.20.14.100",
      "language": "en-US,en;q=0.5",
      "software": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"
    }
