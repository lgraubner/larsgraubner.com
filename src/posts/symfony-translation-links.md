---
categories: ['Symfony']
date: 2021-09-08
description: There is no standard way to use links in Symfony translations. But there is an easy and clean way to implement it.
title: How to use links in Symfony translations
---

When dealing with translations it's sometimes necessary to put a link inside a paragraph or sentence. As far as I know there is no standard way to do this. [Certain StackOverflow Answers](https://stackoverflow.com/questions/11545459/adding-a-link-inside-translated-content-in-twig-template) suggest putting HTML Markup inside the translation filter options and other weird stuff.

My approach is as follows: One familiar way of dealing with links in text can be found in mardown. It's easy to understand and can be feeded with a single variable, the final link.

The following is a translation example using a Markdown link and is placed under `translations/messages.en.yaml` (my translations are stored as YAML files with translation keys):

```yaml
register:
    terms: By registering, I agree to the [Terms and Conditions](%link_terms%).
```

This can be used in Twig like this:

```twig
<p>
    {% raw %}{{ 'register.terms'|trans({
        '%link_terms%': 'https://example.com/privacy',
    }) }}{% endraw %}
</p>
```

This is easy to understand and use so far, but one crucial piece is missing: The Markdown syntax is not replaced, yet.

Twig has a [`markdown_to_html` filter](https://twig.symfony.com/doc/3.x/filters/markdown_to_html.html), but this has two downsides. First this requires an extra Twig bundle (`twig/extra-bundle`) and a Markdown parsing bundle. Thats quite heavy just for some simple links, if not used elsewhere. Second downside is, that it will also add surrounding `<p>` tags to the whole translation, which might not be wanted.

One easy to implement solution is writing a [custom Twig filter](https://symfony.com/doc/current/templating/twig_extension.html) for transforming Markdown links to proper HTML. My implementation looks like this:

```php
<?php

declare(strict_types=1);

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class StringExtension extends AbstractExtension
{
    public function getFilters()
    {
        return [
            new TwigFilter('app_linkify', [$this, 'linkfy'], [
                'pre_escape' => 'html',
                'is_safe' => ['html'],
            ]),
        ];
    }

    public function linkfy($str)
    {
        return preg_replace('/\[([^\[]+)\]\((.+?)\)/', '<a href="$2">$1</a>', $str);
    }
}
```

Important here is the `pre_escape` option, which escapes the input and prevents security issues. The second option `is_safe` is the equivalent to the `raw` filter and required to output the link as HTML.

If everything is in place it can be used like this for our example above:

```twig
<p>
    {% raw %}{{ 'terms'|trans({
        '%link_terms%': 'https://example.com/privacy',
    })|app_linkify }}{% endraw %}
</p>
```
