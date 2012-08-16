#!/bin/bash
find src -name "*.js" -print0 | xargs -0 jslint --indent 4 --white --onevar --regexp --goodparts
