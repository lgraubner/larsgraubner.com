---
categories: ['PHP']
title: 'Generate a random YouTube like ID with PHP'
date: 2021-10-14T20:10:00+02:00
description: 'YouTube uses 64 bit numbers to generate random IDs. This article explains how to generate YouTube like IDs with PHP.'
url: '/blog/php/youtube-id'
---

YouTube uses a specific type of ID for each uploaded video. This ID typically consists of eleven characters and looks something like this: `dQw4w9WgXcQ`. This is used in the URL like the following, for sure you have seen this in the past.

```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

To be precise YouTube uses 64 bit numbers to generate the video ID which equals to 73,786,976,294,838,206,464 possible IDs. For more information about the math and number theory behind this I can recommend the excellent YouTube video ["Will YouTube Ever Run Out Of Video IDs?" from Tom Scott](https://www.youtube.com/watch?v=gocwRvLhDf8).

Now what's interesting is how to generate an ID like this with e.g. PHP? Actually it's quite simple, but we have to aknowledge the fact, that YouTube IDs do no use the standard Base64 standard alphabet. Thats because the two special chars `+` and `/`, as well as `=` for padding, have special meaning in URLs and can therefore not be used. The solution is to simply replace them with URL friendly characters. YouTube decided to use `-` and `_`, the padding can be safely omitted.

Now let's get to some code. A function to generate a random ID looks like this:

```PHP
function generateHash()
{
    $bytes = random_bytes(8);
    $base64 = base64_encode($bytes);

    return rtrim(strtr($base64, '+/', '-_'), '=');
}
```

We generate 8 random bytes, which equals to 64 bits, Base64 encode them, replace `+` and `/` and remove the `=` padding. This will result in random IDs such as `dgR_qxgJvhY`.

With IDs like this you won't have to worry to run out of possible IDs any time soon.
