<template>
  <div class="home">
    <h1>Guide</h1>
    <ul>
      <li>
        1. Refreshing or loading the page pulls the current state of the tarkovdata repository to the app
      </li>
      <li>
        2. Edit the data via the app, which will store all of the changes in the current instance of the app.
      </li>
      <li>
        3. When finished editing, create a new pull request (either copy-pasting locally and pushing to a fork, or opening a PR by editing on GitHub)
      </li>
      <li>
        4. Edits will be reviewed by one of the community devs, and merged
      </li>
      <li>
        5. Changes will propagate to community tools either when they bump their version, or when they next consume the tarkov-tools API
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
