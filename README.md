# A Code Editor in the Browser

What most code editors have in common is that at their core they provide developers
with the ability to edit plain text, split text into multiple files, and group files under folders.
The challenge is to build a minimal code editor that runs entirely in the browser, providing
only these three features.

## Organizing files

As a user, I’d like to be able to
• Create new folders and give them names
• Inside of any folder, create new files and folders and give them names
• Delete any files and folders (deleting a folder deletes all files and folders underneath).

## Editing file contents

As as user, I’d like to be able to
• View and edit the text contents of any file (just plain text editing)
• Save the changes I’ve made to the current file, so they don’t get discarded when I open
a different file for editing.

## Local storage persistence

As a user, I’d like to be able to locally persist the folder structure and the file contents, so
that next time I open the editor application in the same browser on the same machine, I
can continue where I left off.


# How to run the editor app

## Build prod app

`yarn install`
`yarn build`

### Run prod app

`npx serve -s build`

## Run dev server

`yarn install`
`yarn start`

## Linting the source

`yarn eslint src `

## Running the tests

`yarn test`