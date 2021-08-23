---
categories: ["Symfony"]
title: "Add a custom HTTP header with Symfony"
date: 2021-08-23T22:20:24+02:00
description: "Sometimes you want to add a custom HTTP header to every response with Symfony. This can be done with an event listener."
url: "/blog/symfony/custom-header"
draft: true
---

Sometimes you want to add a custom HTTP header to your Symfony application. The following example adds a custom header to [disable Google FLoC](https://usefathom.com/blog/google-floc). This is done with an event listener and attached to every response.

```PHP
<?php

namespace App\EventListener;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

class DisableFlocSubscriber implements EventSubscriberInterface
{
    public function onKernelResponse(ResponseEvent $event)
    {
        $response = $event->getResponse();

        $response->headers->set('Permissions-Policy', 'interest-cohort=()');
    }

    public static function getSubscribedEvents()
    {
        return [
            ResponseEvent::class => 'onKernelResponse',
        ];
    }
}
```
