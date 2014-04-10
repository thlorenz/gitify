# {cmd} [options] [repo] [description]

Creates a git repo and pushes it to a github remote.

Example:

`{cmd} new-project 'new description of project'`

Options:
    --always-hub        If set, will error if `hub` is not found
    --message=[str]     change the git commit message
    --directory=[str]   which directory should become a git project
    --no-create         does not create a github remote
    --git-remote=[str]  which git remote to push to
    --user=[str]        set your github user name
{options}

 - `--always-hub` defaults to `false`
 - `--message` defaults to `'initial repository'`
 - `--directory` defaults to `CWD`
 - `--no-create` defaults to `false`
 - `--git-remote` defaults to `'git@github.com'`

## {cmd} --help

Prints this message
