<?php
namespace Simius\Helpers;

function minify($str) {
  return str_replace(array('\r\n', '\r', '\n', ' '), '', $str);
}
