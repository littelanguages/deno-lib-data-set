# deno-lib-data-set

A collection of immutable set functions built on top of the native set implementation.

[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/raw.githubusercontent.com/littlelanguages/deno-lib-data-set/main/mod.ts)


## Building Source

The directory `~/.devcontainer` contains a Dockerfile used by [Visual Studio Code](https://code.visualstudio.com) to issolate the editor and build tooling from needing to be installed on the developer's workstation.

The Dockerfile is straightforward with the interesting piece being [entr](https://github.com/eradman/entr/) which is used by the `etl.sh` to run `test.sh` whenever a source file has changed.

## Scripts

Two script can be found inside `~/.bin`

| Name   | Purpose |
|--------|----------------------------------|
| etl.sh | Runs an edit-test-loop - loops indefinately running all of the tests whenever a source file has changed. |
| test.sh | Runs lint on the source code and executes the automated tests. |
