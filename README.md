# Evolve.paren

This is a [Parenscript](https://common-lisp.net/project/parenscript/) port of the `evolve.lisp` example from the awesome [Land of Lisp](http://landoflisp.com/) (I'm watching the [music video](https://www.youtube.com/watch?v=HM1Zb3xmvMc) _again_ right now :) )

You can see it running [here](https://debhal.github.io/evolve.paren/).

Parenscript aims to wrap Javascript, not implement Common Lisp, so I've filled in the gaps with a mess of functions, macros, and JS libraries. It's not very classy; I just wanted to get the code running, so I deliberately resisted the impulse to start building a standards compliant implementation.

Outside the UI, the only change I needed to make to the source code was some minor tweaks to the use of `loop` ([diff](https://github.com/deBhal/evolve.paren/commit/29dbc2314bab876634ef16d6872e6d3b7d19fd20)). Parenscript has good support for `loop`, but `evolve.lisp` hits a couple of incompatibilities, so I replaced `collecting` with `collect`, and added `from` clauses to make Parenscript happy (I'd quite like to work up the PRs for Parenscript if I can ever find the time).
