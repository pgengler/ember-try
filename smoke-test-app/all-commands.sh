#!/usr/bin/env bash
set -ex

# try:each
ember try:each

# skip-cleanup option
ember try:each --skip-cleanup

# config-path option
ember try:each --config-path='../test/fixtures/dummy-ember-try-config.js'

# both ember-try options
ember try:each --config-path='../test/fixtures/dummy-ember-try-config.js' --skip-cleanup true

# try:ember
ember try:ember '> 2.10.0 < 3.0.0'
ember try:ember '2.10.0' --config-path='../test/fixtures/dummy-ember-try-config.js'
ember try:ember '3.2.0' --skip-cleanup=true

# try:config
ember try:config
ember try:config --config-path='../test/fixtures/dummy-ember-try-config.js'

# try:one <scenario>
ember try:one default

# custom command
ember try:one default --- ember help

# skip-cleanup option
ember try:one default --skip-cleanup

# config-path option
ember try:one test1 --config-path='../test/fixtures/dummy-ember-try-config.js'

# both ember-try options
ember try:one test1 --config-path='../test/fixtures/dummy-ember-try-config.js' --skip-cleanup true

# custom command with options to command
ember try:one default --- ember help --silent

# custom command mixed with ember try's own option
ember try:one default --skip-cleanup --- ember help --silent

# try:reset
ember try:reset

# Environment variables availability
FOO="5" ember try:one default --- ./fail-if-no-foo.sh

ember try:one default --- FOO=5 ./fail-if-no-foo.sh

# Custom, compound commands
ember try:one default --- 'echo 1 && echo 2'

# Environment variables from config
ember try:each --config-path='../test/fixtures/dummy-ember-try-config-different-env-vars.js'
