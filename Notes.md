# Middleware

Middleware is a term for any software or service that provides a way for components of a software to communicate between them.

In a server side web application, the term generally refers to pre-built software components that can be added to framework's request/response cycle processing pipeline to upgrade it's functionality or do specific tasks. Such as a middleware for limiting the rate of an api will run for every request sent, and before responding it will run it's set of logic to verify if the request should be met with a response.

<br>
<br>

# Koa

Koa is a small, fast and expressive web framework which leverage async functionalities to create better web applications. It doesn't bundle any middleware within it's core but provides and elegant suite of methods.

<br>

## Application

Koa application is an object containing an array of middleware functions which are composed and executed in a stack like manner.

Koa middleware cascade(pass onto succession of others) in a more traditional way which was more difficult using callback approach. However with async functionalities, "true" middleware approach was achieved. Koa invokes middleware downstream and then control flows back upstream.

```
// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// X-Response-Time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// Response
app.use(async ctx => {
  ctx.body = 'Hello World';
});
```

In this example the first request flows through the middleware logger and X-Response-Time to mark when the request started and yields control through the response middleware. When a middleware invokes next(), the function suspends and passes control to the next middleware defined. And when there are no more middleware defined, the stack will unwind and each middleware will resume it's upstream behavior.

<br>

## Benefits of Koa over Express

1. Provides a promise based workflow instead of callbacks.
2. Provides better error handling support using try/catch.
3. Generally faster than express and can handle more requests.

<br>

# Koa official modules

Koa comes in a small package and contains very little out of the box. These are the officially supported middlewares for advanced functionalities.
More modules on https://koajs.github.io/badgeboard/

-   koa-router
-   koa-bodyparser
-   koa-logger
-   koa-csrf
-   koa-sendfile
-   koa-responsetime
-   koa-ejs
-   koa-error
-   koa-json
-   koa-ratelimit
-   koa-session

<br>

# Functionalities

## Settings

---

Application settings are properties on the app instance, currently the supported properties are.

1. `app.env` - Defaulting to the **NODE_ENV** or "development"
2. `app.keys` - Array of signed cookies
3. `app.proxy` - When true proxy header fields will be trusted
4. `app.subdomainOffset` - Offset of subdomains to ignore, defaults to 2
5. `app.proxyIpHeader` - Proxy IP header, defaults to X-Forwarded-For
6. `app.maxIpCount` - Max ip read from proxy header, defaults to 0 (Infinity)

```
// Can be passed onto constructor
const app = new koa({ proxy: true })

// Added dynamically
app.proxy = true
```

<br>

## Context

---
