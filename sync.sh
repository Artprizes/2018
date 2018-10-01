#!/bin/bash
rsync -rav --exclude .git --delete ../art-prizes-native/* .
