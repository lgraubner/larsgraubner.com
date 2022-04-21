---
title: Quickly generate secrets with OpenSSL
date: 2022-04-21
description: Oftentimes random values for secrets, keys or similar strings for web application are needed. Those can be generated quickly with OpenSSL in the CLI.
---

Oftentimes random values for secrets, keys or similar strings for web application are needed. Those can be generated quickly with [OpenSSL](https://www.openssl.org/) in the CLI. MacOS and most Linux distributions come with pre-installed OpenSSL, otherwise you might have to install it first.

```bash
openssl rand -base64 32

# returns something like
# Cde6PM8p8gBXDmvv7kVGX962mww41ZE+5bP/E9X3Y00=
```

The encoding can be changed to something like `-hex` instead of `-base64` if that's preferred. Although the resulting string can be shorter (depending on the encoding) the security/randomness does not differ. The number at the end is the number of random bytes which does not equal the length of the string, as stated before.

