---
categories: ["Nginx"]
date: 2017-08-11T12:00:00+02:00
description: "Recently I struggled setting up Let's Encrypt certificate renewal with nginx. It would not authorize due to HTTPS redirection. This is how I fixed it."
title: "Let's Encrypt certificate renewal with nginx"
url: "/blog/nginx/lets-encrypt-renewal"
---

Recently I struggled setting up Let's Encrypt certificate renewal with nginx on this site. If you didn't hear about Let's Encrypt you should [check out their website](https://letsencrypt.org/). They offer free SSL certificates, so there is no valid reason to not have an SSL certificate anymore. There are various tutorials on [how to setup Let's encrypt with nginx](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04).

## The problem

I managed to create a certificate for this blog without much struggle, but when it came to renew it I ran into a problem. I received an "unauthorized" error. The certbot was not able to reach `/.well-known/acme-challenge` and got a 404 error. I noticed it was redirected to HTTPS which made sense. After setting up SSL I added redirect rules to redirect from HTTP to HTTPS which looks like this:

```nginx
server {
  listen [::]:80;
  listen 80;

  # listen on both hosts
  server_name larsgraubner.com www.larsgraubner.com;

  # and redirect to the https host (declared below)
  # avoiding http://www -> https://www -> https:// chain.
  return 301 https://larsgraubner.com$request_uri;
}
```

To make Let's Encrypt authorize via HTTP I added the following block to my redirection server block.

```nginx
location /.well-known/acme-challenge {
  root /usr/share/nginx/html;
  allow all;
}
```

Should work, right? It did not. It was still redirecting to HTTPS and failing the renew process. After trying out various things I finally found a solution.

## The solution

I'm not a nginx expert, but the following is working fine for me:

```nginx
server {
  listen [::]:80;
  listen 80;

  # listen on both hosts
  server_name larsgraubner.com www.larsgraubner.com;

  location /.well-known/acme-challenge {
    root /usr/share/nginx/html;
    allow all;
  }

  location / {
    # and redirect to the https host (declared below)
    # avoiding http://www -> https://www -> https:// chain.
    return 301 https://larsgraubner.com$request_uri;
  }
}
```

It seems like return is called every time, even when an location block matches. Wrapping the return in another location block fixes the problem as the .well-known block matches first and ignores all following location blocks.

This way you can renew your Let's Encrypt certificates even on running production sites. You can even [automate it](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04#step-6-—-setting-up-auto-renewal) and don't have to worry about it at all.
